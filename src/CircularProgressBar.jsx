import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Easing,
} from "react-native";

const CircularProgressBar = ({ currentProgress }) => {
  const [progress] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(progress, {
      toValue: currentProgress,
      duration: 1000,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start();
  }, [currentProgress, progress]);

  const overlayStyle = {
    transform: [
      {
        rotate: progress.interpolate({
          inputRange: [0, 1],
          outputRange: ["0deg", "360deg"],
        }),
      },
    ],
  };

  return (
    <View style={styles.container}>
      <View style={styles.circlesContainer}>
        <View style={styles.circle100} />
        <Animated.View style={[styles.overlay, overlayStyle]}>
          <Text style={styles.progressText}>
            {Math.round(progress._value * 100)}%
          </Text>
        </Animated.View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  circlesContainer: {
    position: "relative",
  },
  circle100: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: "#00F",
    opacity: 0.3,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    alignItems: "center",
    justifyContent: "center",
  },
  progressText: {
    fontSize: 18,
    color: "#000",
  },
});

export default CircularProgressBar;
