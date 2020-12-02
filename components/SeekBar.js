import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Slider from "@react-native-community/slider";

const pad = (n, width, z = 0) => {
  n = n + "";
  return n.length > width ? n : new Array(width - n.length + 1).join(z) + n;
};
const minutesAndSeconds = (position) => {
  console.log("position : ", position);

  return [
    pad(Math.floor(Math.floor(Math.floor(position) / 60) / 60), 2),
    pad(Math.floor(Math.floor(Math.floor(position) % 60) % 60), 2),
  ];
};

const SeekBar = ({ currentPosition, trackLength, onSeek, onSlidingStart }) => {
  const elapsed = minutesAndSeconds(currentPosition);
  const remaining = minutesAndSeconds(trackLength - currentPosition);
  console.log("Track length : ", trackLength);

  return (
    <View style={styles.container}>
      <View style={styles.durationInfo}>
        <Text style={styles.elapsedTime}>
          {elapsed[0] + " : " + elapsed[1]}
        </Text>
        <View style={styles.divider} />
        <Text style={styles.remainingTime}>
          {trackLength > 1 && "-" + remaining[0] + " : " + remaining[1]}
        </Text>
      </View>

      <Slider
        maximumValue={Math.max(trackLength, 1, currentPosition + 1)}
        onSlidingStart={onSlidingStart}
        onSlidingComplete={onSeek}
        value={currentPosition}
        minimumTrackTintColor="#9c1de7"
        maximumTrackTintColor="#581b98"
        thumbStyle={styles.thumb}
        trackStyle={styles.track}
      />
    </View>
  );
};

export default SeekBar;

const styles = StyleSheet.create({
  container: {
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 16,
  },
  durationInfo: {
    flexDirection: "row",
    marginBottom: 5,
  },
  elapsedTime: {
    color: "rgba(0,0,0,0.72)",
    fontSize: 16,
    textAlign: "center",
    paddingRight: 20,
  },
  divider: {
    flex: 1,
  },
  remainingTime: {
    color: "rgba(0,0,0,0.72)",
    fontSize: 16,
    textAlign: "center",
  },
  thumbStyle: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: "#0e153a",
  },
  track: {
    height: 4,
    borderRadius: 1,
  },
});
