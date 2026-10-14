import { TODAS_CATEGORIAS } from '../constants/categorias';

// Retorna apenas as despesas da categoria selecionada (ou todas, se for "Todas")
export function filtrarPorCategoria(despesas, categoria) {
  if (categoria === TODAS_CATEGORIAS) {
    return despesas;
  }
  return despesas.filter((despesa) => despesa.categoria === categoria);
}
