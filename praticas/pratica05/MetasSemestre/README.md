# 🎯 MetasSemestre

**Atividade 02 — useState, Componentização, Eventos e Persistência**
Disciplina: Programação para Dispositivos Móveis (React Native / Expo)
Professor: Marcelo Alves Farias — IESB
Aulas relacionadas: 05 e 06

## Objetivo

Evolução do app de metas: cadastro de metas de estudo do semestre, com
remoção de itens e persistência local via `AsyncStorage` — os dados
sobrevivem ao fechar e reabrir o app.

## Comando usado para criar o projeto

```bash
npx create-expo-app@latest MetasSemestre --template blank
```

Dependências nativas adicionadas com `expo install` (não `npm install`
puro, conforme recomendado):

```bash
npx expo install @react-native-async-storage/async-storage react-native-safe-area-context
```

## Como rodar

```bash
cd MetasSemestre
npm install
npx expo start
```

Escaneie o QR Code com o **Expo Go** (Android) ou rode em um emulador
Android (`a` no terminal do Metro).

## Estrutura

```text
MetasSemestre/
├── App.js                    # Estado, persistência (useEffect) e layout geral
├── components/
│   ├── MetaInput.js          # TextInput + Pressable de adicionar (controlado por props)
│   └── MetaList.js           # Lista (FlatList) + remoção + marcar concluída
├── app.json                  # Configuração do projeto Expo
└── assets/                   # Ícones do app
```

## Requisitos atendidos

- **Estado e lista**: `useState` no `App.js` para o texto do input (`texto`)
  e para o array de metas (`metas`). Cada meta é `{ id, texto, criadaEm,
  concluida }`, com `id: Date.now().toString()` — nunca o índice do array
  (evita o bug clássico de remover o item errado).
- **Componentização**: [`components/MetaInput.js`](./components/MetaInput.js)
  recebe `value`, `onChangeText` e `onAdd` como props (componente
  controlado, sem estado próprio de texto); [`components/MetaList.js`](./components/MetaList.js)
  recebe `metas`, `onDelete` e `onToggleConcluida`.
- **Eventos**: `handleAdd` no `App.js` bloqueia texto vazio com
  `Alert.alert`; remoção usa `Pressable` + `.filter()` por `id` (nunca
  `push`/`splice` — sempre um array novo via spread/`setState` funcional);
  os itens da lista usam `android_ripple` no toque (remover e marcar como
  concluída).
- **Persistência**: dois `useEffect` em [`App.js`](./App.js) — um para
  **carregar** as metas do `AsyncStorage` na montagem (array de
  dependências `[]`), outro para **salvar** sempre que `metas` mudar
  (dependência `[metas, carregando]`). Chave usada: `'@metas_semestre'`.
  Ambos com `try/catch` e `Alert.alert` amigável em caso de erro. Uma
  flag `carregando` evita que o efeito de salvar rode com a lista vazia
  *antes* do carregamento inicial terminar (erro comum listado no
  enunciado, item 8).
- **UI**: `SafeAreaProvider` + `SafeAreaView` envolvendo a tela;
  cabeçalho com `Image` local (`./assets/icon.png`) + título; lista
  rolável com `FlatList` (em vez de `ScrollView`).
- **Desafio opcional**: campo `concluida` (boolean) — tocar no texto da
  meta alterna concluída/pendente com estilo riscado
  (`textDecorationLine: 'line-through'`); contador no cabeçalho
  ("X pendentes / Y concluídas").

## useEffect de carga e de salvamento

Ambos estão em [`App.js`](./App.js), logo após os `useState`:

- **Carga** (linhas com `carregarMetas`): roda uma única vez quando o
  app abre (`useEffect(..., [])`), lê a chave `@metas_semestre` do
  `AsyncStorage` e faz `JSON.parse` pra transformar a string salva de
  volta em array de objetos.
- **Salvamento** (linhas com `salvarMetas`): roda toda vez que `metas`
  muda (`useEffect(..., [metas, carregando])`), faz `JSON.stringify` do
  array e grava na mesma chave. Só executa depois que `carregando` vira
  `false`, pra não sobrescrever o storage com `[]` antes de a carga
  terminar.

## Prints da tela

| Lista vazia | Com itens | Após reabrir o app |
| --- | --- | --- |
| `docs/print-lista-vazia.png` | `docs/print-com-itens.png` | `docs/print-apos-reabrir.png` |

> Substitua os placeholders acima pelas capturas reais: abra o app no
> Expo Go/emulador, adicione algumas metas, feche o app completamente
> (não só minimize) e reabra pra confirmar que os dados persistiram.
> Salve os 3 prints em `docs/` com os nomes acima.

## Entrega (fluxo Git)

```bash
git checkout -b feature/atividade02-pratica05
git add .
git commit -m "Feat: Atividade 02 - MetasSemestre com persistencia AsyncStorage"
git push origin feature/atividade02-pratica05
```

Em seguida, abra o Pull Request e cole o link aqui:

- **Link do PR**: _adicionar após abrir o PR_
