#!/usr/bin/env python3
"""Prepara fotos e vídeos para o site da CVB.

Uso:  python3 tools/preparar_midia.py <pasta_origem> <mapa.csv>

mapa.csv tem duas colunas:  arquivo_original,nome_no_site
  ex.:  IMG_2034.HEIC,case-jebs-2025.jpg
        VID_0012.mp4,hero.mp4

O que faz:
  * fotos: corrige rotação, redimensiona (máx. 2400 px; galeria 1800 px),
    salva JPEG progressivo qualidade 82 e APAGA todos os metadados
    (EXIF, GPS, modelo do aparelho, data, autor, perfil XMP).
  * vídeos: remove metadados e áudio, limita a 1920 px de largura e a 20 s
    (loops), H.264 com início rápido na web, e gera o quadro-cartaz .jpg.
"""
import csv, subprocess, sys
from pathlib import Path
from PIL import Image, ImageOps

try:
    import pillow_heif  # opcional, para fotos .HEIC de iPhone
    pillow_heif.register_heif_opener()
except Exception:
    pass

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "assets" / "media"
LOOPS = {"hero.mp4", "sol-ativacoes.mp4", "arena-loop.mp4"}


def foto(src: Path, dst: Path):
    im = ImageOps.exif_transpose(Image.open(src)).convert("RGB")
    lim = 1800 if dst.name.startswith("galeria") else 2400
    if dst.name == "og-capa.jpg":
        im = ImageOps.fit(im, (1200, 630))
    else:
        im.thumbnail((lim, lim), Image.LANCZOS)
    clean = Image.new("RGB", im.size)  # cópia sem nenhum metadado
    clean.paste(im)
    clean.save(dst, "JPEG", quality=82, optimize=True, progressive=True)


def video(src: Path, dst: Path):
    cmd = ["ffmpeg", "-y", "-loglevel", "error", "-i", str(src),
           "-map_metadata", "-1", "-map_chapters", "-1", "-an",
           "-vf", "scale='min(1920,iw)':-2", "-c:v", "libx264",
           "-preset", "veryfast", "-crf", "26", "-pix_fmt", "yuv420p",
           "-movflags", "+faststart"]
    if dst.name in LOOPS:
        cmd += ["-t", "20"]
    subprocess.run(cmd + [str(dst)], check=True)
    poster = dst.with_suffix(".jpg")
    if dst.name == "hero.mp4":
        poster = dst.with_name("hero-poster.jpg")
    subprocess.run(["ffmpeg", "-y", "-loglevel", "error", "-ss", "1", "-i", str(dst),
                    "-frames:v", "1", "-map_metadata", "-1", "-q:v", "3", str(poster)], check=True)


def main():
    pasta, mapa = Path(sys.argv[1]), Path(sys.argv[2])
    OUT.mkdir(parents=True, exist_ok=True)
    for row in csv.reader(mapa.open(encoding="utf-8")):
        if len(row) < 2 or row[0].startswith("#"):
            continue
        src, dst = pasta / row[0].strip(), OUT / row[1].strip()
        (video if dst.suffix.lower() == ".mp4" else foto)(src, dst)
        print(f"ok  {row[0]}  ->  {dst.name}  ({dst.stat().st_size // 1024} KB)")


if __name__ == "__main__":
    main()
