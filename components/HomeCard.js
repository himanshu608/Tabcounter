import { useNavigation } from "@react-navigation/native"
import {  StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { homeCardDetails } from "./Home";

const HomeCard = ({id}) => {
    const navigation = useNavigation();
  return (
    <TouchableOpacity onPress={()=> navigation?.navigate(homeCardDetails[id]?.title)}>
        <View style={styles.container}>
            <Text style={styles.text}>{homeCardDetails[id]?.title}</Text>
        </View>
    </TouchableOpacity>
  )
}

export default HomeCard

const styles = StyleSheet.create({
    container : {
        padding:10,
        marginTop:20,
        borderRadius:8,
        backgroundColor:'#24A0ED'
    },
    text : {
        fontSize: 20,
        textAlign: 'center',
        fontWeight:'800',
        color: 'white'
    }
})