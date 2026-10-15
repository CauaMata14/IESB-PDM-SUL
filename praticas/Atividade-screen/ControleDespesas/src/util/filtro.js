import { ALL_CATEGORIES } from '../constants/categories';

// Retorna apenas as despesas da categoria selecionada (ou todas, se for "Todas")
export function filtrarPorCategoria(expenses, category) {
  if (category === ALL_CATEGORIES) {
    return expenses;
  }
  return expenses.filter((expense) => expense.category === category);
}

// Busca pela descrição sem diferenciar maiúsculas de minúsculas
export function filtrarPorDescricao(expenses, termo) {
  const termoNormalizado = termo.trim().toLowerCase();
  if (termoNormalizado === '') {
    return expenses;
  }
  return expenses.filter((expense) =>
    expense.description.toLowerCase().includes(termoNormalizado)
  );
}
