# ControleDespesas — Atividade Screen

Estrutura de navegação de um app de controle de despesas com **React Navigation**,
combinando **Native Stack** + **Bottom Tabs** e um componente reutilizável `IconButton`.

## Estrutura

```
ControleDespesas/
├── App.js                  # NavigationContainer, Stack e BottomTabScreen
├── components/
│   └── IconButton.js       # Pressable + Ionicons ({ icon, size, color, onPress })
└── screens/
    ├── DespesasRecentes.js
    ├── TodasDespesas.js
    └── GerenciarDespesa.js
```

## Navegação

- **Stack** (`createNativeStackNavigator`)
  - `Despesas` → `BottomTabScreen` (`headerShown: false`)
  - `GerenciarDespesa` → `GerenciarDespesa`
- **Tabs** (`createBottomTabNavigator`, `tabBarLabelStyle: { fontSize: 12 }`)
  - `DespesasRecentes` — título "Despesas Recentes", rótulo "Recentes", ícone `hourglass`
  - `TodasDespesas` — título "Todas as Despesas", rótulo "Todas", ícone `wallet-outline`
- `headerRight` das abas exibe um `IconButton` (`add`) que chama
  `navigation.navigate('GerenciarDespesa')`.

## Como executar

```bash
npm install
npx expo start
```
