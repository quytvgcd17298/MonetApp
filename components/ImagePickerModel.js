import React from "react";
import { Image, TouchableOpacity, View, Text, Modal } from "react-native";


const ImagePickerModal = ({props}) => {
  return (
    <Modal
      isVisible={props.isVisible}
      setIsVisible={props.setIsVisible}
      onBackdropPress={props.onBackdropPress}
    >
      <View
        style={{
          padding: 25,
          backgroundColor: "white",
        }}
      >
        <TouchableOpacity onPress={props.openPicker}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 10,
            }}
          >
            <Image
/*               source={icons.openPicker}
 */              resizeMode="contain"
/*               style={{ ...styles.icon, tintColor: theme.colors.blue }}
 */            />
            <Text>Choose Image</Text>
          </View>
        </TouchableOpacity>
        <View
          style={{
            height: 1,
            marginVertical: 5,
            backgroundColor: "#E6E6E6",
          }}
        />
        <TouchableOpacity onPress={props.openCamera}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginVertical: 10,
            }}
          >
            <Image
/*               source={icons.openCamera}
 */              resizeMode="contain"
/*               style={{ ...styles.icon, tintColor: theme.colors.blue }}
 */            />
            <Text>New Photo</Text>
          </View>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default ImagePickerModal;