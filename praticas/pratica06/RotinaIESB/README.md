# 📅 RotinaIESB

**Atividade Integradora — Aulas 02 a 06**
Disciplina: Programação para Dispositivos Móveis (React Native / Expo)
Professor: Marcelo Alves Farias — IESB

## Objetivo

Organizador simples da rotina acadêmica: o aluno cadastra compromissos do
dia (aula, estudo, trabalho, lazer), visualiza a lista, remove itens, e os
dados sobrevivem ao fechar o app — tudo em uma única tela, consolidando os
assuntos das Aulas 02 a 06 (estrutura de projeto, import/export, Core
Components, StyleSheet, Flexbox, `useState`, props, componentização,
`Pressable`, `useEffect` e `AsyncStorage`).

## 1) Comando usado para criar o projeto

```bash
npx create-expo-app@latest RotinaIESB --template blank
```

Dependências nativas adicionadas com `expo install` (não `npm install`
puro, conforme recomendado):

```bash
npx expo install @react-native-async-storage/async-storage react-native-safe-area-context
```

## Como rodar

```bash
cd RotinaIESB
npm install
npx expo start
```

Escaneie o QR Code com o **Expo Go** (Android) ou rode em um emulador
Android (`a` no terminal do Metro).

## Estrutura

```text
RotinaIESB/
├── App.js                       # Estado, persistência (useEffect) e layout geral
├── labels.js                    # Rótulos de texto (export nomeado)
├── components/
│   ├── CompromissoInput.js      # TextInput + Pressable de adicionar (controlado por props)
│   └── CompromissoList.js       # FlatList + remoção + marcar concluído
├── app.json                     # Configuração do projeto Expo
└── assets/                      # logo.png e ícones do app
```

## Requisitos atendidos

- **Aula 02 — Estrutura**: projeto Expo (`--template blank`), com
  `App.js`, `app.json`, `package.json` e `assets/` usados corretamente.
- **Aula 03 — Import/export e componentes**: [`labels.js`](./labels.js)
  com `export` nomeado (`tituloApp`, `placeholderCompromisso`,
  `botaoAdicionar`, `tituloLista`, `listaVazia`), importado em
  [`App.js`](./App.js); `View`, `Text`, `TextInput`, `Image` e
  `StyleSheet.create` (sem estilos só inline).
- **Aula 04 — Flexbox**: `flexDirection: 'row'` no cabeçalho (logo +
  título) e no formulário (input + botão); `flex: 1` na área da lista;
  `width: '68%'` no `TextInput` ([`CompromissoInput.js`](./components/CompromissoInput.js));
  `justifyContent`/`alignItems` com intenção clara (comentados no
  código). Separação nítida entre cabeçalho / formulário / lista.
- **Aula 05 — Estado e componentização**: `useState` para o texto
  digitado e para o array de `compromissos`; cada item é
  `{ id, texto, criadoEm, concluido }` com `id: Date.now().toString()`;
  pasta `components/` com os 2 componentes pedidos —
  [`CompromissoInput.js`](./components/CompromissoInput.js) (props
  `value`, `onChangeText`, `onAdd`, `labels`) e
  [`CompromissoList.js`](./components/CompromissoList.js) (props
  `itens`, `onDelete`, `onToggleConcluido`, `tituloLista`, `listaVazia`).
- **Aula 06 — Eventos e persistência**: remoção com `Pressable` +
  `.filter()` por `id` (nunca o index); `android_ripple` nos itens e no
  botão de adicionar; `SafeAreaProvider` + `SafeAreaView`; dois
  `useEffect` com `AsyncStorage` (chave `@rotina_iesb_compromissos`) e
  `JSON.stringify`/`JSON.parse`, ambos com `try/catch` e `Alert`
  amigável em caso de erro.
- **Validação**: `Alert.alert` bloqueia adicionar compromisso com texto
  vazio.

## 2) Onde está o useEffect de carga e o de salvamento

Ambos estão em [`App.js`](./App.js), logo depois dos `useState`:

- **Carga** (`carregarCompromissos`): `useEffect(..., [])` — roda uma
  única vez quando o app abre, lê `@rotina_iesb_compromissos` do
  `AsyncStorage` e usa `JSON.parse` pra transformar a string salva de
  volta em array.
- **Salvamento** (`salvarCompromissos`): `useEffect(..., [compromissos, carregando])`
  — roda toda vez que a lista de compromissos muda, usa
  `JSON.stringify` e grava na mesma chave. Só executa depois que
  `carregando` vira `false`, pra não sobrescrever o storage com `[]`
  antes da carga terminar (erro comum listado no enunciado).

## 3) Arquivos criados em components/ e labels.js

- [`labels.js`](./labels.js) (raiz do projeto)
- [`components/CompromissoInput.js`](./components/CompromissoInput.js)
- [`components/CompromissoList.js`](./components/CompromissoList.js)

## Desafios opcionais implementados

- **O2** — campo `concluido` (boolean): tocar no texto de um
  compromisso alterna concluído/pendente, com `textDecorationLine: 'line-through'`.
- **O3** — contador no cabeçalho: "X pendentes".
- **O4** — lista renderizada com `FlatList` + `ListEmptyComponent`
  (em vez de `ScrollView`/`.map`).

> O enunciado pede até 2 desafios para a nota extra; os 3 acima foram
> implementados porque nenhum tinha custo extra relevante depois de já
> usar `FlatList` — fica a critério do professor considerar quantos
> pontuam.

## Prints da tela

| Lista vazia | Com itens | Após reabrir o app |
| --- | --- | --- |
| `docs/print-lista-vazia.png` | `docs/print-com-itens.png` | `docs/print-apos-reabrir.png` |

> Substitua os placeholders acima pelas capturas reais: abra o app no
> Expo Go/emulador, cadastre alguns compromissos, feche o app
> completamente (não só minimize) e reabra pra confirmar que os dados
> persistiram. Salve os 3 prints em `docs/` com os nomes acima.

## Entrega (fluxo Git)

```bash
git checkout -b feature/atividade03
git add .
git commit -m "Feat: Atividade Integradora - RotinaIESB com AsyncStorage"
git push origin feature/atividade03
```

Em seguida, abra o Pull Request e cole o link aqui:

- **Link do PR**: https://github.com/CauaMata14/IESB-PDM-SUL/pull/4
