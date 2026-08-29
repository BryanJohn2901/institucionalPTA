# Personal Trainer Academy — Site Institucional (Multi-página)

Site institucional principal da Personal Trainer Academy, com landing pages dedicadas para cada pós-graduação/curso: Biomecânica, Fisiologia, Treinamento Funcional, Treinamento Feminino, além de uma seção MPA.

**Deploy:** https://institucional-pta.vercel.app

## Estrutura

- `index.html` — home institucional
- `biomecanica/`, `fisiologia/`, `treinamentoFuncional/`, `treinamentoFeminino/`, `mpa/` — landing pages independentes, cada uma com seu próprio `index.html` e CSS compilado

## Stack

- HTML5 + CSS3 + Tailwind CSS + JavaScript vanilla
- Cada subpasta é um mini-projeto com seu próprio `package.json`/`tailwind.config.js`; a maioria já tem o CSS compilado e commitado (`style.css`/`output.css`), então **não precisa de build para servir**
- Algumas subpastas (`biomecanica/`, `treinamentoFuncional/`) têm `build.js` para regenerar uma versão minificada/otimizada quando necessário

## Rodar localmente

Sem build: sirva a raiz do repositório com qualquer servidor estático.

```bash
npx serve .
```

Para recompilar o Tailwind de uma subpasta específica, entre nela e rode `npm install && npm run build` (ou equivalente definido no `package.json` local).
