import React from "react";
import { Text, View, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

const Header = ({ message, onDownPress, onQueuePress, onMessagePress }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onDownPress}>
        <Ionicons name="ios-arrow-down" size={48} color="black" />
      </TouchableOpacity>
      <Text style={styles.message} onPress={onMessagePress}>
        {message}
      </Text>
      <TouchableOpacity onPress={onQueuePress}>
        <MaterialIcons name="queue-music" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    height: 72,
    paddingTop: 20,
    paddingLeft: 12,
    paddingRight: 12,
  },

  button: {
    opacity: 0.72,
  },

  message: {
    flex: 1,
    textAlign: "center",
    color: "rgba(255, 255, 255, 0.72)",
    fontWeight: "bold",
    fontSize: 10,
  },
});
