import { useColorScheme } from 'react-native';

import { Colors } from '../constants/theme';

// Devolve as cores do tema atual do sistema (claro ou escuro)
export function useThemeColors() {
  const scheme = useColorScheme();
  return scheme === 'dark' ? Colors.dark : Colors.light;
}
