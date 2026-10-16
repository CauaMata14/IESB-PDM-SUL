// Cores do app nos modos claro e escuro
export const Colors = {
  light: {
    background: '#f4f1fb',
    card: '#ffffff',
    text: '#1c1c1e',
    textMuted: '#6b6b76',
    primary: '#3e04c3',
    primarySoft: '#e4d9fd',
    onPrimary: '#ffffff',
    border: '#d6cdee',
    tagBackground: '#e5e5e5',
    tagText: '#333333',
    error: '#d32f2f',
    overlay: 'rgba(0, 0, 0, 0.4)',
  },
  dark: {
    background: '#121018',
    card: '#1e1b29',
    text: '#f2f0f7',
    textMuted: '#a9a4b8',
    primary: '#a68bff',
    primarySoft: '#2a2440',
    onPrimary: '#121018',
    border: '#3a3450',
    tagBackground: '#3a3a3c',
    tagText: '#e5e5e5',
    error: '#ff6b6b',
    overlay: 'rgba(0, 0, 0, 0.6)',
  },
};

// Recebe o valor de useColorScheme() e devolve as cores do modo correspondente
export function getThemeColors(scheme) {
  return scheme === 'dark' ? Colors.dark : Colors.light;
}
