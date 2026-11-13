# Site CVB · Competições Virtuais Brasileiras

Site estático feito do zero: HTML, CSS e JavaScript, sem template nem dependência.

- `index.html`: estrutura e textos
- `assets/css/style.css`: visual, com a paleta do logo CVB
- `assets/js/main.js`: comportamento. **Contato, vídeos do YouTube, galeria e logos ficam no `CONFIG`, no topo do arquivo.**
- `assets/media/`: fotos e vídeos (os nomes esperados estão em `LEIA-ME.txt`)
- `assets/logos/`: logos de parceiros e clientes, em PNG ou SVG com fundo transparente
- `tools/preparar_midia.py`: otimiza a mídia e apaga os metadados antes de publicar

Quando um arquivo de mídia ou logo ainda não existe, o site mostra um bloco no lugar (ou o nome da marca), sem quebrar o layout.

## Publicação
GitHub Pages, a partir da branch `main` e da pasta raiz.
