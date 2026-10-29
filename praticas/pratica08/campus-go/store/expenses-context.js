import { createContext, useContext, useEffect, useReducer, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@expenses';

const ExpensesContext = createContext(null);

// Toda ação devolve um novo array: nada de push, splice ou mutação direta
function expensesReducer(state, action) {
  switch (action.type) {
    case 'ADD':
      return [action.payload, ...state];
    case 'UPDATE':
      return state.map((expense) =>
        expense.id === action.payload.id
          ? { ...expense, ...action.payload.data }
          : expense
      );
    case 'DELETE':
      return state.filter((expense) => expense.id !== action.payload);
    case 'SET':
      return [...action.payload];
    default:
      return state;
  }
}

export function ExpensesContextProvider({ children }) {
  const [expenses, dispatch] = useReducer(expensesReducer, []);
  const [isLoaded, setIsLoaded] = useState(false);

  // Carrega as despesas salvas uma única vez, ao abrir o app
  useEffect(() => {
    async function loadExpenses() {
      try {
        const json = await AsyncStorage.getItem(STORAGE_KEY);
        if (json) {
          // JSON guarda a data como texto: converte de volta para Date
          const saved = JSON.parse(json).map((expense) => ({
            ...expense,
            date: new Date(expense.date),
          }));
          dispatch({ type: 'SET', payload: saved });
        }
      } catch (error) {
        console.error('Erro ao carregar as despesas:', error);
      } finally {
        setIsLoaded(true);
      }
    }
    loadExpenses();
  }, []);

  // Salva a lista a cada alteração, mas só depois da carga inicial
  useEffect(() => {
    if (!isLoaded) {
      return;
    }
    async function saveExpenses() {
      try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(expenses));
      } catch (error) {
        console.error('Erro ao salvar as despesas:', error);
      }
    }
    saveExpenses();
  }, [expenses, isLoaded]);

  function addExpense(expenseData) {
    const id = `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
    dispatch({ type: 'ADD', payload: { ...expenseData, id } });
  }

  function updateExpense(id, expenseData) {
    dispatch({ type: 'UPDATE', payload: { id, data: expenseData } });
  }

  function deleteExpense(id) {
    dispatch({ type: 'DELETE', payload: id });
  }

  function clearExpenses() {
    dispatch({ type: 'SET', payload: [] });
  }

  return (
    <ExpensesContext.Provider
      value={{ expenses, addExpense, updateExpense, deleteExpense, clearExpenses }}
    >
      {children}
    </ExpensesContext.Provider>
  );
}

export function useExpenses() {
  const context = useContext(ExpensesContext);
  if (!context) {
    throw new Error('useExpenses deve ser usado dentro de um ExpensesContextProvider.');
  }
  return context;
}
