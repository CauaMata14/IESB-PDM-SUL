# 💸 ControleDespesas

Disciplina: Programação para Dispositivos Móveis (React Native / Expo)
Professor: Marcelo Alves Farias — IESB

App de controle de despesas desenvolvido em duas atividades:

1. **Atividade Screen**: navegação com React Navigation (Bottom Tabs +
   Native Stack) e o componente `IconButton`. PR #5.
2. **Expansão do Gerenciador de Despesas**: categorização das despesas,
   formulário com validação e filtro dinâmico por categoria. PR #6.

## Comandos usados

```bash
npx create-expo-app@latest ControleDespesas --template blank
npm install @react-navigation/native @react-navigation/bottom-tabs @react-navigation/native-stack
npx expo install react-native-screens react-native-safe-area-context @expo/vector-icons
npx expo install @react-native-community/datetimepicker
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
├── App.js                         # DespesasProvider + NavigationContainer + Stack + Tabs
└── src/
    ├── components/
    │   ├── IconButton.js          # Pressable + Ionicons, feedback opacity 0.5
    │   └── despesa/
    │       ├── DespesaItem.js     # Descrição, data, tag da categoria e valor
    │       ├── DespesaLista.js    # FlatList com keyExtractor
    │       ├── DespesaSaida.js    # Junta Sumário + Lista (recebe a lista filtrada)
    │       ├── DespesaSumario.js  # Total com .reduce() (vermelho acima de R$ 200)
    │       └── CategoriaSeletor.js# Pressables lado a lado (formulário e filtro)
    ├── screens/
    │   ├── DespesasRecentes.js    # Últimos 7 dias + filtro por categoria
    │   ├── TodasDespesas.js       # Todas + filtro por categoria
    │   └── GerenciarDespesa.js    # Formulário de cadastro/edição/exclusão
    ├── store/
    │   └── despesas-context.js    # Context com o array de despesas
    ├── constants/
    │   └── categorias.js          # Alimentação, Transporte, Lazer, Contas
    └── util/
        ├── data.js                # getDataFormatada, getDataMenosDias
        └── filtro.js              # filtrarPorCategoria com .filter()
```

## Atividade 1: Navegação (Atividade Screen)

- **Telas** em `src/screens/`: `DespesasRecentes`, `TodasDespesas` e
  `GerenciarDespesa`.
- **IconButton**: [`src/components/IconButton.js`](./src/components/IconButton.js)
  recebe `{ icon, size, color, onPress }` desestruturados, usa
  `<Pressable>` + `<Ionicons>` e aplica `opacity: 0.5` via `pressed`.
- **Bottom Tabs**: `BottomTabScreen()` em [`App.js`](./App.js) com as
  abas "Recentes" (ícone `hourglass`) e "Todas" (ícone `wallet-outline`),
  `tabBarLabelStyle: { fontSize: 12 }`.
- **Native Stack**: `Despesas` → `BottomTabScreen` (`headerShown: false`)
  e `GerenciarDespesa` → `GerenciarDespesa`.
- **Botão no cabeçalho**: `headerRight` com o `IconButton` (ícone `add`)
  chamando `navigation.navigate('GerenciarDespesa')`.

## Atividade 2: Expansão do Gerenciador de Despesas

### Tarefa 1: Modelo de dados e formulário

- Cada despesa é `{ id, descricao, valor, data, categoria }`. Os dados
  de exemplo ficam em [`despesas-context.js`](./src/store/despesas-context.js).
- [`GerenciarDespesa.js`](./src/screens/GerenciarDespesa.js) tem
  `const [categoria, setCategoria] = useState('')` e o
  `CategoriaSeletor` (Pressables lado a lado) para escolher a categoria.
- O valor usa `keyboardType="decimal-pad"` e só aceita texto que passa
  na regex `/^\d*\.?\d{0,2}$/` (no máximo duas casas decimais; vírgula
  vira ponto).
- A data é escolhida com o `DateTimePicker` de
  `@react-native-community/datetimepicker`.
- Antes de salvar, o formulário valida descrição, valor (> 0) e
  categoria, e mostra um `Alert` se faltar algum.
- Tocar em uma despesa da lista abre o mesmo formulário em modo de
  edição, com botão de excluir.

### Tarefa 2: Componentes visuais

- [`DespesaItem.js`](./src/components/despesa/DespesaItem.js) mostra a
  descrição, a data (`getDataFormatada`), a categoria e o valor. A
  categoria aparece como uma tag com fundo cinza claro e bordas
  arredondadas (`styles.categoria`).
- [`DespesaSumario.js`](./src/components/despesa/DespesaSumario.js)
  calcula `somaDespesas` com
  `despesas.reduce((acumulador, item) => acumulador + item.valor, 0)` e
  exibe `R$ ${somaDespesas.toFixed(2)}`.

### Tarefa 3: Filtro dinâmico por categoria

- [`filtrarPorCategoria`](./src/util/filtro.js) usa `.filter()` para
  devolver só as despesas da categoria escolhida ("Todas" devolve a
  lista inteira).
- As duas abas têm um filtro no topo. A lista filtrada vai como prop
  para o `DespesaSaida`, então a `FlatList` do `DespesaLista` e o total
  do `DespesaSumario` mudam juntos com o filtro.

### Desafio extra (bônus)

- No `DespesaSumario`, o valor fica **vermelho** quando o total exibido
  passa de **R$ 200,00** (`acimaDoLimite && styles.somaAlerta`).

> As despesas ficam só na memória (Context + `useState`): ao fechar o
> app, voltam os dados de exemplo. A atividade não pedia persistência.

## Entrega (fluxo Git)

```bash
git checkout -b feature/atividade-despesas
git add .
git commit -m "Feat: categorias e filtro dinamico no gerenciador de despesas"
git push origin feature/atividade-despesas
```

- **PR da Atividade Screen**: https://github.com/CauaMata14/IESB-PDM-SUL/pull/5
- **PR da Expansão do Gerenciador**: _(adicionado após abrir o PR)_
