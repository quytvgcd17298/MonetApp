import React, { useState } from 'react';
import { View, StyleSheet} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker'
import { Ionicons } from '@expo/vector-icons'; 
import { MaterialIcons } from '@expo/vector-icons'; 
import { FontAwesome } from '@expo/vector-icons'; 
import { FontAwesome5 } from '@expo/vector-icons'; 
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { AntDesign } from '@expo/vector-icons'; 
import { Fontisto } from '@expo/vector-icons'; 
import { Entypo } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons'; 

const ListItem = (props) => {
    const [open, setOpen] = useState("");
    const [items, setItems] = useState([
        {
            label: 'FOOD',
            value: 'FOOD',
            icon: () => <Ionicons name="fast-food" size={30} color="orange" />
        },
        {
            label: 'Breakfast',
            value: 'Breakfast',
            icon: () => <MaterialIcons name="breakfast-dining" size={24} color="black" />
        },
        {
            label: 'Lunch',
            value: 'Lunch',
            icon: () => <MaterialIcons name="lunch-dining" size={24} color="black" />
        },
        {
            label: 'Dinner',
            value: 'Dinner',
            icon: () => <MaterialIcons name="dinner-dining" size={24} color="black" />
        },
        {
            label: 'Coffee',
            value: 'Coffee',
            icon: () => <FontAwesome name="coffee" size={24} color="black" />
        },
        {
            label: 'Restaurant',
            value: 'Restaurant',
            icon: () => <Ionicons name="restaurant" size={24} color="black" />
        },
        {
            label: 'LIVING SERVICE',
            value: 'LIVING SERVICE',
            icon: () => <FontAwesome5 name="house-user" size={30} color="orange" />
        },
        {
            label: 'Electric',
            value: 'Electric',
            icon: () => <MaterialCommunityIcons name="lightning-bolt" size={24} color="black" />
        },
        {
            label: 'Telephone charges',
            value: 'Telephone charges',
            icon: () => <AntDesign name="mobile1" size={24} color="black" />
        },
        {
            label: 'Gas',
            value: 'Gas',
            icon: () => <FontAwesome name="fire" size={24} color="black" />
        },
        {
            label: 'Water',
            value: 'Water',
            icon: () => <Ionicons name="water" size={24} color="black" />
        },
        {
            label: 'Internet',
            value: 'Internet',
            icon: () => <Fontisto name="world" size={24} color="black" />
        },
        {
            label: 'PERSONAL SERVICE',
            value: 'PERSONAL SERVICE',
            icon: () => <Ionicons name="person" size={30} color="orange" />
        },
        {
            label: 'Clothes',
            value: 'Clothes',
            icon: () => <MaterialCommunityIcons name="shoe-formal" size={24} color="black" />
        },
        {
            label: 'Accessory',
            value: 'Accessory',
            icon: () => <Feather name="watch" size={24} color="black" />
        },
        {
            label: 'Girl friend',
            value: 'Girl friend',
            icon: () => <Ionicons name="woman" size={24} color="black" />
        },
        {
            label: 'Party. Wedding, Birthday...',
            value: 'Party. Wedding, Birthday...',
            icon: () => <FontAwesome5 name="gifts" size={24} color="black" />
        },
        {
            label: 'ENJOYMENT',
            value: 'ENJOYMENT',
            icon: () => <FontAwesome5 name="plane-arrival" size={30} color="orange" />
        },
        {
            label: 'Shopping',
            value: 'Shoppuning',
            icon: () => <FontAwesome name="shopping-cart" size={24} color="black" />
        },
        {
            label: "Entertainment",
            value: "Entertainment",
            icon: () => <FontAwesome5 name="headphones" size={24} color="black" />
        },
        {
            label: "Travel",
            value: "Travel",
            icon: () => <FontAwesome name="plane" size={24} color="black" />
        },
        {
            label: "Movie",
            value: "Movie",
            icon: () => <MaterialIcons name="movie" size={24} color="black" />
        },
        {
            label: "Beautify",
            value: "Beautify",
            icon: () => <MaterialCommunityIcons name="hair-dryer" size={24} color="black" />
        },
        {
            label: "MOVEMENT",
            value: "MOVEMENT",
            icon: () => <Entypo name="location" size={30} color="orange" />
        },
        {
            label: "Gasoline",
            value: "Gasoline",
            icon: () => <FontAwesome5 name="gas-pump" size={24} color="black" />
        },
        {
            label: "Taxi",
            value: "Taxi",
            icon: () => <FontAwesome name="taxi" size={24} color="black" />
        },
        {
            label: "Car repair and maintain",
            value: "Car repair and maintain",
            icon: () => <MaterialIcons name="car-repair" size={24} color="black" />
        },
        {
            label: "Other",
            value: "Other",
            icon: () => <FontAwesome5 name="car-side" size={24} color="black" />
        },
        {
            label: "HEALTHY",
            value: "HEALTHY",
            icon: () => <FontAwesome5 name="notes-medical" size={30} color="orange" />
        },
        {
            label: "Healthcare",
            value: "Healthcare",
            icon: () => <FontAwesome5 name="hand-holding-medical" size={24} color="black" />
        },
        {
            label: "Medicine",
            value: "Medicine",
            icon: () => <FontAwesome5 name="briefcase-medical" size={24} color="black" />
        },
        {
            label: "Sport",
            value: "Sport",
            icon: () => <MaterialIcons name="sports-soccer" size={24} color="black" />
        },
        
]);
        
  return (
    <View>
        <DropDownPicker
        listMode="SCROLLVIEW"
        autoScroll={true}
        open={open}
        value={props.value}
        items={items}
        setOpen={setOpen}
        setValue={props.setValue}
        setItems={setItems}
        onSelectItem={(item) => {
            console.log(item);
          }}        
        style={styles.dropdown}
        onChangeValue={props.onChangeValue}
        placeholder={"Select an item"}
        >
        </DropDownPicker>
    </View>
  )
}

const styles = StyleSheet.create({
    dropdown: {
      width:350,
      backgroundColor:"gray",
      borderRadius: 5,
      marginVertical: 7,
      margin:12,
      borderBottomWidth:5
    },
});  

export default ListItem;