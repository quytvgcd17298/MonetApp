import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import React from "react";

const ButtonCustom = ({ title, backgroundColor, width, onPress, disabled, isLoading }) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress}
      style={{
        flexDirection: "row",
        justifyContent: "center",
        height: 50,
        alignItems: "center",
        width,
        backgroundColor,
        borderRadius: 4,
        marginVertical: 20,
      }}
    >
      {isLoading ? <ActivityIndicator size={24} color="#fff" /> : null}
      <Text
        style={{
          fontSize: 17,
          color: "white",
          fontWeight: "bold",
        }}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default ButtonCustom;