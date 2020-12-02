import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const Controls = ({
  paused,
  shuffleOn,
  repeatOn,
  onPressPlay,
  onPressPause,
  onBack,
  onForward,
  onPressShuffle,
  onPressRepeat,
  forwardDisabled,
}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity activeOpacity={0.0} onPress={onPressShuffle}>
        <Ionicons name="ios-shuffle" size={24} color="black" />
      </TouchableOpacity>
      <View style={{ width: 40 }} />
      <TouchableOpacity onPress={onBack}>
        <Ionicons name="ios-skip-backward" size={24} color="black" />
      </TouchableOpacity>
      <View style={{ width: 20 }} />
      {!paused ? (
        <TouchableOpacity onPress={onPressPause}>
          <View style={styles.playButton}>
            <Ionicons name="ios-pause" size={24} color="black" />
          </View>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={onPressPlay}>
          <View style={styles.playButton}>
            <Ionicons name="ios-play" size={24} color="black" />
          </View>
        </TouchableOpacity>
      )}

      <View style={{ width: 20 }} />
      <TouchableOpacity onPress={onForward} disabled={forwardDisabled}>
        <Ionicons name="ios-arrow-forward" size={24} color="black" />
      </TouchableOpacity>
      <View style={{ width: 40 }} />

      <TouchableOpacity activeOpacity={0.0} onPress={onPressRepeat}>
        <Ionicons name="ios-repeat" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
};

export default Controls;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 8,
  },
  playButton: {
    height: 72,
    width: 72,
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 72 / 2,
    alignItems: "center",
    justifyContent: "center",
  },
  secondaryControl: {
    height: 18,
    width: 18,
  },
  off: {
    opacity: 0.3,
  },
});
