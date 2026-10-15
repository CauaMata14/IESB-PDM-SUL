# 💸 ControleDespesas

Disciplina: Programação para Dispositivos Móveis (React Native / Expo)
Professor: Marcelo Alves Farias — IESB

App de controle de despesas desenvolvido em três atividades:

1. **Atividade Screen**: navegação com React Navigation (Bottom Tabs +
   Native Stack) e o componente `IconButton`. PR #5.
2. **Expansão do Gerenciador de Despesas**: categorização e filtro
   dinâmico por categoria. PR #6.
3. **Gerenciador de Despesas 2.0 (Aula 09)**: estado global com Context
   API + `useReducer`, persistência com AsyncStorage, formulário
   validado, busca, estado vazio e tema claro/escuro. PR #7.

## Comandos usados

```bash
npx create-expo-app@latest ControleDespesas --template blank
npm install @react-navigation/native @react-navigation/bottom-tabs @react-navigation/native-stack
npx expo install react-native-screens react-native-safe-area-context @expo/vector-icons
npx expo install @react-native-community/datetimepicker
npx expo install @react-native-async-storage/async-storage
npx expo install expo-system-ui
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
├── App.js                          # SafeAreaProvider + ExpensesContextProvider + navegação
└── src/
    ├── components/
    │   ├── IconButton.js           # Pressable + Ionicons, feedback opacity 0.5
    │   └── despesa/
    │       ├── DespesaItem.js      # Card com descrição, data, tag da categoria e valor
    │       ├── DespesaLista.js     # FlatList: estado vazio, cabeçalho, 1 ou 2 colunas
    │       ├── DespesaSaida.js     # Junta a lista com o DespesaSumario no cabeçalho
    │       ├── DespesaSumario.js   # Quantidade e total (.reduce), vermelho acima de R$ 200
    │       └── CategoriaSeletor.js # Chips de categoria (filtro)
    ├── constants/
    │   ├── categories.js           # CATEGORIES
    │   └── theme.js                # Cores dos modos claro e escuro + getThemeColors
    ├── hooks/
    │   └── useDebounce.js          # useEffect + clearTimeout
    ├── store/
    │   └── expenses-context.js     # Context + expensesReducer + AsyncStorage
    ├── screens/
    │   ├── TodasDespesas.js        # Busca + chips + "Limpar tudo"
    │   ├── DespesasRecentes.js     # Últimos 7 dias + chips
    │   └── GerenciarDespesa.js     # Criar/editar/excluir com formulário validado
    └── util/
        ├── data.js                 # getDataFormatada, getDataMenosDias, isDataFutura
        └── filtro.js               # filtrarPorCategoria, filtrarPorDescricao
```

## Atividade 3: Gerenciador de Despesas 2.0 (Aula 09)

Modelo de cada despesa: `{ id, description, amount, date, category }`.
Não há dados de exemplo: o app começa vazio e guarda o que for
cadastrado. Nenhuma biblioteca de estado ou de formulário foi usada.

### Tarefa 1: Estado global e persistência

- [`expenses-context.js`](./src/store/expenses-context.js) tem
  `createContext`, o `expensesReducer` com `ADD`, `UPDATE`, `DELETE` e
  `SET` (sempre devolvendo um novo array, com spread, `map` e `filter`) e
  o `ExpensesContextProvider`.
- O contexto expõe `expenses`, `addExpense`, `updateExpense`,
  `deleteExpense` e `clearExpenses` (usado no bônus).
- `useExpenses()` lança um erro claro se for usado fora do Provider.
- O `ExpensesContextProvider` envolve o `NavigationContainer` no
  [`App.js`](./App.js). As duas abas leem a lista com `useExpenses()`; a
  aba Recentes calcula os últimos 7 dias a partir de `expenses`.
- Ao abrir, o app lê a chave `@expenses` e dispara `SET`. As datas
  voltam do JSON como texto e são convertidas para `Date`.
- A cada mudança, a lista é salva com `JSON.stringify`. O estado
  `isLoaded` impede que a lista vazia inicial sobrescreva os dados salvos.
  Leitura e gravação ficam em `try/catch`.

### Tarefa 2: Uma tela para criar e editar

- Tocar num `DespesaItem` navega para `GerenciarDespesa` com
  `{ expenseId: id }`.
- [`GerenciarDespesa.js`](./src/screens/GerenciarDespesa.js) lê
  `route.params?.expenseId`, define `isEditing` e, na edição, abre o
  formulário preenchido.
- `navigation.setOptions` troca o título entre "Nova despesa" e "Editar
  despesa".
- Só no modo edição aparece o ícone de lixeira. Ele abre um
  `Alert.alert` com **Cancelar** (`style: 'cancel'`) e **Excluir**
  (`style: 'destructive'`). Depois de salvar ou excluir, a tela volta com
  `navigation.goBack()`.

### Tarefa 3: Formulário validado

- Um único objeto `form` e a função `handleChange(field, value)` com
  spread (`{ ...form, [field]: value }`).
- O valor mantém a regex `/^\d*\.?\d{0,2}$/` e
  `keyboardType="decimal-pad"`; a data usa o `DateTimePicker`.
- `validate(values)` devolve um objeto `errors` com 4 regras:
  descrição com no mínimo 3 caracteres, valor maior que zero, data que
  não seja futura e categoria obrigatória.
- Cada erro aparece abaixo do campo, que ganha borda vermelha. Depois
  da primeira tentativa de salvar, o formulário revalida a cada
  alteração, então a mensagem some assim que o campo é corrigido.
- `addExpense`/`updateExpense` só são chamados sem erros, com o valor
  convertido por `parseFloat`.
- A categoria é escolhida num `Modal` (`transparent`,
  `animationType="slide"`) com a lista `CATEGORIES`, sem digitação livre.
- O formulário fica dentro de `KeyboardAvoidingView` (`padding` no iOS,
  `height` no Android) e `ScrollView`, então o botão Salvar sempre fica
  acessível.

### Tarefa 4: Listas, busca e tema

- A `FlatList` do [`DespesaLista.js`](./src/components/despesa/DespesaLista.js)
  tem `ListEmptyComponent` com ícone e a orientação "Nenhuma despesa.
  Toque em + para adicionar." O `DespesaSumario`, usado como
  `ListHeaderComponent`, mostra a quantidade e o total da lista exibida.
- [`useDebounce.js`](./src/hooks/useDebounce.js) usa `useEffect` com
  limpeza via `clearTimeout`.
- Em [`TodasDespesas.js`](./src/screens/TodasDespesas.js), a busca por
  descrição ignora maiúsculas/minúsculas e a lista filtrada é calculada em
  `useMemo`. Quantidade e total refletem a busca.
- [`theme.js`](./src/constants/theme.js) define as cores dos modos claro
  e escuro (`Colors.light` e `Colors.dark`) e a função
  `getThemeColors(scheme)`. As três telas e os componentes da lista
  chamam `useColorScheme()` e passam o resultado para
  `getThemeColors`. O `App.js` faz o mesmo para o tema da navegação
  (cabeçalhos e barra de abas).
- O `app.json` usa `"userInterfaceStyle": "automatic"` (com o
  `expo-system-ui` instalado, que o Android exige) para o app acompanhar
  o tema do sistema.
- O botão ☀️/🌙 no canto esquerdo do cabeçalho alterna o tema dentro do
  app com `Appearance.setColorScheme`, o que facilita os prints. Depois
  de usá-lo, o app deixa de seguir o tema do sistema até ser reaberto.
- Os cards têm sombra com `Platform.select` (`shadow*` no iOS,
  `elevation` no Android).

### Desafios extras (bônus)

- **Filtro por categoria (+0,5)**: chips acima da lista, combináveis com
  a busca; quantidade e total refletem os dois filtros.
- **Limpar tudo (+0,25)**: botão em "Todas" que, após um `Alert` de
  confirmação, dispara `SET` com lista vazia.
- **Layout responsivo (+0,25)**: com `useWindowDimensions`, a lista
  passa para 2 colunas quando a largura é maior que 600.

## Atividades anteriores

- **Atividade Screen**: telas em `src/screens/`, `IconButton` com props
  desestruturadas, `BottomTabScreen` (abas "Recentes" e "Todas") dentro
  da Native Stack, e o "+" do cabeçalho navegando para `GerenciarDespesa`.
- **Expansão do Gerenciador**: campo de categoria, `DespesaItem` com a
  tag da categoria, `DespesaSumario` com `.reduce()` e `.toFixed(2)`,
  filtro por categoria com `.filter()` e o total em vermelho acima de
  R$ 200,00.

## Entrega (fluxo Git)

```bash
git checkout -b feature/atividade-aula09
git add .
git commit -m "Feat: Gerenciador de Despesas 2.0 - estado global, formulario e UX"
git push origin feature/atividade-aula09
```

- **PR da Atividade Screen**: https://github.com/CauaMata14/IESB-PDM-SUL/pull/5
- **PR da Expansão do Gerenciador**: https://github.com/CauaMata14/IESB-PDM-SUL/pull/6
- **PR do Gerenciador 2.0 (Aula 09)**: https://github.com/CauaMata14/IESB-PDM-SUL/pull/7
