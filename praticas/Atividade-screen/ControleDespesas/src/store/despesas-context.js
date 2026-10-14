import { createContext, useContext, useState } from 'react';

import { getDataMenosDias } from '../util/data';

const hoje = new Date();

// Despesas de exemplo, já com o atributo categoria
const DESPESAS_INICIAIS = [
  { id: 'd1', descricao: 'Almoço no restaurante', valor: 45.9, data: getDataMenosDias(hoje, 1), categoria: 'Alimentação' },
  { id: 'd2', descricao: 'Uber para o IESB', valor: 23.5, data: getDataMenosDias(hoje, 2), categoria: 'Transporte' },
  { id: 'd3', descricao: 'Cinema', valor: 38.0, data: getDataMenosDias(hoje, 4), categoria: 'Lazer' },
  { id: 'd4', descricao: 'Conta de luz', valor: 152.37, data: getDataMenosDias(hoje, 6), categoria: 'Contas' },
  { id: 'd5', descricao: 'Supermercado', valor: 189.99, data: getDataMenosDias(hoje, 12), categoria: 'Alimentação' },
  { id: 'd6', descricao: 'Recarga do cartão de ônibus', valor: 50.0, data: getDataMenosDias(hoje, 15), categoria: 'Transporte' },
  { id: 'd7', descricao: 'Internet', valor: 99.9, data: getDataMenosDias(hoje, 20), categoria: 'Contas' },
  { id: 'd8', descricao: 'Show', valor: 120.0, data: getDataMenosDias(hoje, 30), categoria: 'Lazer' },
];

const DespesasContext = createContext({
  despesas: [],
  adicionarDespesa: (despesa) => {},
  atualizarDespesa: (id, despesa) => {},
  removerDespesa: (id) => {},
});

export function DespesasProvider({ children }) {
  const [despesas, setDespesas] = useState(DESPESAS_INICIAIS);

  function adicionarDespesa(despesa) {
    const id = Date.now().toString();
    setDespesas((atuais) => [{ ...despesa, id }, ...atuais]);
  }

  function atualizarDespesa(id, despesa) {
    setDespesas((atuais) =>
      atuais.map((item) => (item.id === id ? { ...despesa, id } : item))
    );
  }

  function removerDespesa(id) {
    setDespesas((atuais) => atuais.filter((item) => item.id !== id));
  }

  return (
    <DespesasContext.Provider
      value={{ despesas, adicionarDespesa, atualizarDespesa, removerDespesa }}
    >
      {children}
    </DespesasContext.Provider>
  );
}

export function useDespesas() {
  return useContext(DespesasContext);
}
