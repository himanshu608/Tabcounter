import React from 'react';
import {StyleSheet, Text} from 'react-native';
import AnimatedLoader from 'react-native-animated-loader';

export default function LoadingScreen({visible,text}) {
  return (
    <AnimatedLoader
      visible={visible}
      overlayColor="rgba(255,255,255,0.75)"
      animationStyle={styles.lottie}
      speed={1}
      source={require("../assets/loading_animation.json")}
      >
        <Text>{text}</Text>
    </AnimatedLoader>
  );
}
const styles = StyleSheet.create({
  lottie: {
    width: 200,
    height: 200,
  },
});