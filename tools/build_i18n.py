#!/usr/bin/env python3
"""Gera en/index.html, es/index.html e fr/index.html a partir do index.html (português).

Uso: python3 tools/build_i18n.py
Para mudar um texto: edite o index.html e a linha correspondente em tools/i18n.py,
depois rode este script de novo. Textos sem tradução são listados no final.
"""
import re, sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent))
from i18n import T

ROOT = Path(__file__).resolve().parent.parent
LANGS = {"en": 0, "es": 1, "fr": 2}
HTML_LANG = {"en": "en", "es": "es", "fr": "fr"}
ATTRS = ("alt", "aria-label", "placeholder", "content", "data-title", "title", "value")
IGNORE = re.compile(r"^[\d\W_]+$|^(CVB|ROUVY|EXR|Zwift|Multi|Probiótica|JEBs Brasília|ROUVY × IRONMAN|L'Étape Brasil × Santander|GP Brasil CVB · Tour Parque da Cidade|Virtual L'Étape Brasil by Tour de France presented by Santander|#0A0F0D|PT|EN|ES|FR|Idioma)$")


def build(lang):
    i = LANGS[lang]
    src = (ROOT / "index.html").read_text(encoding="utf-8")
    missing = set()

    def tr(text):
        key = text.strip()
        if not key or IGNORE.match(key):
            return text
        if key in T:
            return text.replace(key, T[key][i])
        missing.add(key)
        return text

    # textos entre tags (fora de <script>/<style>)
    parts = re.split(r"(<script.*?</script>|<style.*?</style>)", src, flags=re.S)
    out = []
    for p in parts:
        if p.startswith(("<script", "<style")):
            out.append(p)
            continue
        p = re.sub(r">([^<]+)<", lambda m: ">" + tr(m.group(1)) + "<", p)
        p = re.sub(r'\b(%s)="([^"]*)"' % "|".join(ATTRS),
                   lambda m: '%s="%s"' % (m.group(1), tr(m.group(2)) if not m.group(2).startswith(("http", "#", "width")) else m.group(2)), p)
        out.append(p)
    h = "".join(out)

    # idioma, caminhos e seletor
    h = h.replace('<html lang="pt-BR">', '<html lang="%s" data-root="../">' % HTML_LANG[lang])
    h = re.sub(r'(href|src)="assets/', r'\1="../assets/', h)
    h = h.replace('aria-label="Idioma"', 'aria-label="%s"' % {"en": "Language", "es": "Idioma", "fr": "Langue"}[lang])
    h = h.replace('href="./" data-lang="pt"', 'href="../" data-lang="pt"')
    for other in LANGS:
        target = "./" if other == lang else "../%s/" % other
        h = h.replace('href="%s/" data-lang="%s"' % (other, other), 'href="%s" data-lang="%s"' % (target, other))
    h = h.replace('<script src="../assets/js/main.js">', '<script src="../assets/js/main.js">')

    d = ROOT / lang
    d.mkdir(exist_ok=True)
    (d / "index.html").write_text(h, encoding="utf-8")
    return missing


if __name__ == "__main__":
    allmiss = set()
    for lang in LANGS:
        allmiss |= build(lang)
        print("ok", lang)
    if allmiss:
        print("\nSEM TRADUÇÃO:")
        for m in sorted(allmiss):
            print(" -", m)
