import React from "react";
import {
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";

const AlbumArt = ({ url, onPress }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPress}>
        <Image style={styles.image} source={{ uri: url }} />
      </TouchableOpacity>
    </View>
  );
};

export default AlbumArt;

const { width, height } = Dimensions.get("window");
const imageSize = width - 40;

const styles = StyleSheet.create({
  container: {
    paddingLeft: 24,
    paddingRight: 24,
  },

  image: {
    width: imageSize,
    height: imageSize,
  },
});
