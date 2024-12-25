import {  useState } from "react"
import { KeyboardAvoidingView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"
import StudentRealmContext from '../models/StudentContext'
const {useRealm } = StudentRealmContext;
import DropDown from "./DropDown";
import { handleSubmit } from "./helperFunctions";


export default AddNew = ({navigation}) => {
    const [student, setStudent] = useState({});
    const realm = useRealm();

    const genders = ["M","F"]

    const handleInput = (type,input)=>{
        setStudent({
            ...student,
            [type] : input
        })
    }

    const createInput = (label,inputData,handleInput,inputkeyboardType)=>{
        return (
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>{label}</Text>
                    <TextInput 
                        placeholder={label}
                        style={styles.input} 
                        onChangeText={(input)=>handleInput(inputData,input)} 
                        keyboardType={inputkeyboardType}
                        />
                </View>
        )
    }

  return (
    <KeyboardAvoidingView>
        <View style={styles.container}>
            <ScrollView>    
                {createInput("Name","name",handleInput,'default')}
                <DropDown data={genders} titleText={"Select Gender"} setSortFunction={(index)=>handleInput("gender",genders[index])}/>
                {createInput("Roll No.","rollNo",handleInput,'numeric')}
                {createInput("Class","class",handleInput,'numeric')}
                <TouchableOpacity onPress={()=>handleSubmit(student,navigation,realm)} >
                    <View >
                        <Text style={styles.button}>Submit</Text>
                    </View>
                </TouchableOpacity>
            </ScrollView>
        </View>
    </KeyboardAvoidingView>
  )
}



const styles = StyleSheet.create({
    container : {
        padding:20
    },
    inputContainer:{
        padding: 10,
    },
    label:{
        padding:8
    },
    input:{
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 8,
        padding: 10,
        fontSize: 20
    },
    button: {
        padding:10,    
        backgroundColor: '#24A0ED',
        fontSize:20,
        textAlign: 'center',
        borderRadius:10,
        margin:10,
        fontWeight: '800',
        color: 'white'
    }
})