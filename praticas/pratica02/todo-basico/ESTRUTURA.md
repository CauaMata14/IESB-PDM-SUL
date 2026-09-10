# Estrutura do projeto Expo

- [x] `package.json` — manifesto do projeto: nome, versão, dependências (`dependencies`/`devDependencies`) e os scripts (`npm start`, etc.).
- [x] `package-lock.json` — trava as versões exatas instaladas pelo npm, gerado automaticamente; não editar à mão.
- [x] `App.js` — componente raiz da interface; é onde a UI da tela começa a ser montada.
- [x] `app.json` — configuração do app no Expo (nome, ícone, splash, orientação, permissões).
- [x] `assets/` — imagens, ícones e splash usados pelo app.
- [x] `node_modules/` — dependências baixadas pelo npm a partir do `package.json`; não vai para o Git.
- [x] `.gitignore` — lista o que o Git não deve versionar (`node_modules`, `.expo`, etc.).
- [x] `.expo/` — cache/metadados locais gerados pelo Expo ao rodar o projeto; também ignorado pelo Git.
