import { useEffect, useRef } from 'react';
import { Animated } from 'react-native';

// Pequeno wrapper de surgimento (fade-in) usando a Animated API do próprio
// React Native — sem instalar biblioteca de animação para isso.
function FadeIn({ children, duration = 400, style }) {
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    opacity.setValue(0);
    Animated.timing(opacity, {
      toValue: 1,
      duration,
      useNativeDriver: true,
    }).start();
  }, [opacity, duration]);

  return <Animated.View style={[{ opacity }, style]}>{children}</Animated.View>;
}

export default FadeIn;
