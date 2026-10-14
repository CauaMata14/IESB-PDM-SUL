import { FlatList } from 'react-native';

import DespesaItem from './DespesaItem';

function renderDespesaItem({ item }) {
  return <DespesaItem {...item} />;
}

// A FlatList re-renderiza sozinha sempre que o array "despesas" muda
export default function DespesaLista({ despesas }) {
  return (
    <FlatList
      data={despesas}
      renderItem={renderDespesaItem}
      keyExtractor={(item) => item.id}
    />
  );
}
