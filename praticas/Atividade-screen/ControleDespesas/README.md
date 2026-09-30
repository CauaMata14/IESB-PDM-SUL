# 💸 ControleDespesas

**Atividade — Navegação com React Navigation (Bottom Tabs + Native Stack)**
Disciplina: Programação para Dispositivos Móveis (React Native / Expo)
Professor: Marcelo Alves Farias — IESB

## Objetivo

Construir a estrutura de navegação de um app de controle de despesas
combinando navegação em abas (**Bottom Tabs**) aninhada dentro de um
empilhamento de telas (**Native Stack**), além de um componente
reutilizável de botão com ícone (`IconButton`).

## Comandos usados

```bash
npx create-expo-app@latest ControleDespesas --template blank
npm install @react-navigation/native @react-navigation/bottom-tabs @react-navigation/native-stack
npx expo install react-native-screens react-native-safe-area-context @expo/vector-icons
```

## Como rodar

```bash
cd ControleDespesas
npm install
npx expo start
```

Escaneie o QR Code com o **Expo Go** ou rode em um emulador Android
(`a` no terminal do Metro).

## Estrutura

```text
ControleDespesas/
├── App.js                    # NavigationContainer + Stack + BottomTabScreen
├── components/
│   └── IconButton.js         # Pressable + Ionicons, feedback opacity 0.5
├── screens/
│   ├── DespesasRecentes.js   # Aba "Recentes"
│   ├── TodasDespesas.js      # Aba "Todas"
│   └── GerenciarDespesa.js   # Tela da Stack aberta pelo botão do cabeçalho
├── app.json
└── assets/
```

## Requisitos atendidos

- **Etapa 1 — Telas**: `screens/` com `DespesasRecentes`,
  `TodasDespesas` e `GerenciarDespesa`, cada uma com uma `<View>`
  centralizada e um texto com o nome da tela.
- **Etapa 2 — Dependências**: React Navigation (`native`, `bottom-tabs`,
  `native-stack`), `react-native-screens`, `react-native-safe-area-context`
  e `@expo/vector-icons`.
- **Etapa 3 — IconButton**: [`components/IconButton.js`](./components/IconButton.js)
  recebe `{ icon, size, color, onPress }` desestruturados, usa
  `<Pressable>` + `<Ionicons>` e aplica `opacity: 0.5` via `pressed`.
- **Etapa 4 — Bottom Tabs**: `BottomTabScreen()` em [`App.js`](./App.js)
  com as abas `DespesasRecentes` (título "Despesas Recentes", rótulo
  "Recentes", ícone `hourglass`) e `TodasDespesas` (título "Todas as
  Despesas", rótulo "Todas", ícone `wallet-outline`);
  `tabBarLabelStyle: { fontSize: 12 }`.
- **Etapa 5 — Native Stack**: `<NavigationContainer>` envolvendo a
  Stack com `Despesas` → `BottomTabScreen` (`headerShown: false`) e
  `GerenciarDespesa` → `GerenciarDespesa`.
- **Etapa 6 — Botão no cabeçalho**: `screenOptions` do `Tab.Navigator`
  define `headerRight` com o `IconButton` (ícone `add`), cujo `onPress`
  chama `navigation.navigate('GerenciarDespesa')`. Como as abas estão
  aninhadas na Stack, a navegação sobe para a Stack e empilha a tela
  `GerenciarDespesa` (com botão de voltar).

## Entrega (fluxo Git)

```bash
git checkout -b feature/atividade-screen
git add .
git commit -m "Feat: Atividade Screen - navegacao Bottom Tabs + Native Stack"
git push origin feature/atividade-screen
```

- **Link do PR**: _(adicionado após abrir o PR)_
