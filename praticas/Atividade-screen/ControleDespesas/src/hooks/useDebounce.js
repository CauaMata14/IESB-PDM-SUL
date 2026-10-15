import { useEffect, useState } from 'react';

// Só atualiza o valor depois que ele para de mudar por "delay" milissegundos
export function useDebounce(value, delay = 300) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    // Limpeza: cancela o timer anterior a cada nova digitação
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}
