import { registerRootComponent } from 'expo';
import App from './App';

// registerRootComponent chama AppRegistry.registerComponent('main', () => App)
// e cuida de carregar o app tanto no Expo Go quanto em builds nativas.
registerRootComponent(App);
