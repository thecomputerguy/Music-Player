import React from "react";
import { View, Image, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const TrackDetails = ({
  title,
  artist,
  onAddPress,
  onMorePress,
  onTitlePress,
  onArtistPress,
}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onAddPress}>
        <Ionicons name="ios-add-circle-outline" size={24} color="black" />
      </TouchableOpacity>
      <View style={styles.detailsWrapper}>
        <Text style={styles.title} onPress={onTitlePress}>
          {title}
        </Text>
        <Text style={styles.artist} onPress={onArtistPress}>
          {artist}
        </Text>
      </View>
      <TouchableOpacity onPress={onMorePress}>
        <View style={styles.moreButton}>
          <Ionicons name="ios-more" size={24} color="black" />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default TrackDetails;

const styles = StyleSheet.create({
  container: {
    paddingTop: 24,
    flexDirection: "row",
    paddingLeft: 20,
    paddingRight: 20,
    alignItems: "center",
  },
  detailsWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },
  artist: {
    fontSize: 12,
    marginTop: 4,
    color: "rgba(255,255,255,0.72)",
  },
  button: {
    opacity: 0.72,
  },
  moreButton: {
    borderColor: "rgb(255,255,255)",
    borderWidth: 2,
    opacity: 0.72,
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  moreButtonIcon: {
    height: 17,
    width: 17,
  },
});
