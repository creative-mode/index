# Creative Mode · site institucional

Site da Creative Mode, startup de IA e Dados em Luanda. Página estática em HTML, CSS e JS, sem dependências nem passo de build.

Segue a identidade nova: wordmark "creαtive mode" em Unbounded, preto e branco, lilás `#DF7BEF` como único destaque e o anel preenchido a meio como símbolo.

## Estrutura

```
index.html              Página principal (abertura, serviços, porquê, produtos, método, sobre, contacto)
assets/styles.css       Estilos base e camada mobile
assets/main.js          Menu móvel
assets/favicon.svg      Símbolo
```

## Mobile

Abaixo de 760 px o menu passa a botão, o cabeçalho fica fixo, os produtos deslizam para o lado e aparece uma barra fixa em baixo com o contacto. Todos os alvos de toque têm pelo menos 44 px.

## Correr localmente

```sh
python3 -m http.server 8000
# abrir http://localhost:8000
```

## Publicação

O workflow `.github/workflows/pages.yml` publica o site no GitHub Pages a cada push para `main`. Em Settings, Pages, escolher GitHub Actions como origem.

## Contacto

Os botões de contacto abrem um email para `ola@creativemode.ao`.
