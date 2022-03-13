import React from 'react'
import { View, Text, TouchableOpacity, TextInput, ScrollView, StyleSheet, KeyboardAvoidingView } from 'react-native'
import { Ionicons } from '@expo/vector-icons'; 
import { MaterialIcons } from '@expo/vector-icons'; 
import { FontAwesome } from '@expo/vector-icons'; 
import { FontAwesome5 } from '@expo/vector-icons'; 
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { AntDesign } from '@expo/vector-icons'; 
import { Fontisto } from '@expo/vector-icons'; 
import { Entypo } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons'; 
import { NavigationContainer } from '@react-navigation/native';




const ListItem = ({navigation, route, props}) => {

/*     const { item } = route.params || {};
 */  return (
    <ScrollView style={{ flex: 1, backgroundColor:'lightGray'}}>
    <View
    style = {{
        marginHorizontal:5,
        paddingTop:20
    }}
    >
    <TouchableOpacity
    style = {styles.clickHeader}
/*     onPress = {()=>{navigation.navigate("Create New", props.item("Food"))}}    
 */    >
    <Ionicons name="fast-food" size={30} color="black" />
    <Text>FOOD</Text>
    </TouchableOpacity>

        <TouchableOpacity
        style = {styles.clickItems}>
        <MaterialIcons name="breakfast-dining" size={24} color="black" />        
        <Text>BREAKFAST</Text>
        </TouchableOpacity>

        <TouchableOpacity
        style = {styles.clickItems}>
        <MaterialIcons name="lunch-dining" size={24} color="black" />        
        <Text>LUNCH</Text>
        </TouchableOpacity>

        <TouchableOpacity
        style = {styles.clickItems}>
        <MaterialIcons name="dinner-dining" size={24} color="black" />        
        <Text>DINNER</Text>
        </TouchableOpacity>

        <TouchableOpacity
        style = {styles.clickItems}>
        <FontAwesome name="coffee" size={24} color="black" />
        <Text>COFFEE</Text>
        </TouchableOpacity>

        <TouchableOpacity
        style = {styles.clickItems}>
        <Ionicons name="restaurant" size={24} color="black" />
        <Text>RESTAURANT</Text>
        </TouchableOpacity>

    <TouchableOpacity
    style = {styles.clickHeader}>
    <FontAwesome5 name="house-user" size={30} color="black" />
    <Text>LIVING SERVICE</Text>
    </TouchableOpacity>

        <TouchableOpacity
        style = {styles.clickItems}>
        <MaterialCommunityIcons name="lightning-bolt" size={24} color="black" />
        <Text>ELECTRIC</Text>
        </TouchableOpacity>

        <TouchableOpacity
        style = {styles.clickItems}>
        <AntDesign name="mobile1" size={24} color="black" />
        <Text>TELEPHONE CHARGES</Text>
        </TouchableOpacity>

        <TouchableOpacity
        style = {styles.clickItems}>
        <FontAwesome name="fire" size={24} color="black" />
        <Text>GAS</Text>
        </TouchableOpacity>

        <TouchableOpacity
        style = {styles.clickItems}>
        <Ionicons name="water" size={24} color="black" />
        <Text>WATER</Text>
        </TouchableOpacity>


        <TouchableOpacity
        style = {styles.clickItems}>
        <Fontisto name="world" size={24} color="black" />
        <Text>INTERNET</Text>
        </TouchableOpacity>

    <TouchableOpacity
    style = {styles.clickHeader}>
    <Ionicons name="person" size={30} color="black" />
    <Text>PERSONAL SERVICE</Text>
    </TouchableOpacity>

        <TouchableOpacity  
        style = {styles.clickItems}>
        <MaterialCommunityIcons name="shoe-formal" size={24} color="black" />
        <Text>CLOTHES</Text>
        </TouchableOpacity>

        <TouchableOpacity
        style = {styles.clickItems}>
        <Feather name="watch" size={24} color="black" />
        <Text>ACCESSORY</Text>
        </TouchableOpacity>

        <TouchableOpacity
        style = {styles.clickItems}>
        <Ionicons name="woman" size={24} color="black" />
        <Text>GIRL FRIEND</Text>
        </TouchableOpacity>

        <TouchableOpacity
        style = {styles.clickItems}>
        <FontAwesome5 name="gifts" size={24} color="black" />
        <Text>PARTY, WEDDING, BIRTHDAY...</Text>
        </TouchableOpacity>

    <TouchableOpacity
    style = {styles.clickHeader}>
    <FontAwesome5 name="plane-arrival" size={30} color="black" />
    <Text>ENJOYMENT</Text>
    </TouchableOpacity>

    <TouchableOpacity
        style = {styles.clickItems}>
        <FontAwesome name="shopping-cart" size={24} color="black" />
        <Text>SHOPPING</Text>
        </TouchableOpacity>

        <TouchableOpacity
        style = {styles.clickItems}>
        <FontAwesome5 name="headphones" size={24} color="black" />
        <Text>ENTERTAINMENT</Text>
        </TouchableOpacity>

        <TouchableOpacity
        style = {styles.clickItems}>
        <FontAwesome name="plane" size={24} color="black" />
        <Text>TRAVEL</Text>
        </TouchableOpacity>

        <TouchableOpacity
        style = {styles.clickItems}>
        <MaterialIcons name="movie" size={24} color="black" />
        <Text>MOVIE</Text>
        </TouchableOpacity>

        <TouchableOpacity
        style = {styles.clickItems}>
        <MaterialCommunityIcons name="hair-dryer" size={24} color="black" />
        <Text>BEAUTIFY</Text>
        </TouchableOpacity>

    <TouchableOpacity
    style = {styles.clickHeader}>
    <Entypo name="location" size={30} color="black" />
    <Text>MOVEMENT</Text>
    </TouchableOpacity>

        <TouchableOpacity  
        style = {styles.clickItems}>
        <FontAwesome5 name="gas-pump" size={24} color="black" />
        <Text>GASOLINE</Text>
        </TouchableOpacity>

        <TouchableOpacity
        style = {styles.clickItems}>
        <FontAwesome name="taxi" size={24} color="black" />
        <Text>TAXI</Text>
        </TouchableOpacity>

        <TouchableOpacity
        style = {styles.clickItems}>
        <MaterialIcons name="car-repair" size={24} color="black" />
        <Text>CAR REPAIR AND MAINTAIN</Text>
        </TouchableOpacity>

        <TouchableOpacity
        style = {styles.clickItems}>
        <FontAwesome5 name="car-side" size={24} color="black" />
        <Text>OTHER</Text>
        </TouchableOpacity>

    <TouchableOpacity
    style = {styles.clickHeader}>
    <FontAwesome5 name="notes-medical" size={30} color="black" />
    <Text>HEALTHY</Text>
    </TouchableOpacity>

        <TouchableOpacity  
        style = {styles.clickItems}>
        <FontAwesome5 name="hand-holding-medical" size={24} color="black" />
        <Text>HEALTHCARE</Text>
        </TouchableOpacity>

        <TouchableOpacity
        style = {styles.clickItems}>
        <FontAwesome5 name="briefcase-medical" size={24} color="black" />
        <Text>MEDICINE</Text>
        </TouchableOpacity>

        <TouchableOpacity
        style = {styles.clickItems}>
        <MaterialIcons name="sports-soccer" size={24} color="black" />
        <Text>SPORT</Text>
        </TouchableOpacity>

    </View>
    </ScrollView>
    )
}

const styles = StyleSheet.create({
    clickHeader:{
        flexDirection:'row',
        alignItems:"center",
        justifyContent:"flex-start",
        height:50,
        paddingHorizontal:30,
        backgroundColor:'#D7D7D7',
        borderRadius:5,
        margin:5
    },
    clickItems:{
        flexDirection:'row',
        alignItems:"center",
        justifyContent:"flex-start",
        height:40,
        paddingHorizontal:50,
        backgroundColor:'#F2F2F2',
        borderRadius:5,
    }
})

export default ListItem