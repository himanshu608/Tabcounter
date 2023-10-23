import { StyleSheet, Text, View } from "react-native"
import SelectDropdown from 'react-native-select-dropdown';
import Icon from 'react-native-vector-icons/FontAwesome'

export default DropDown = ({
    setSortFunction,
    data,
    defaultButtonText,
    titleText
}) => {
  return (
        <View style={styles.DropDown}>
            <Text style={{fontSize:20}}>{titleText} </Text>
            <SelectDropdown
                data={data}
                onSelect={(selectedItem, index)=> setSortFunction(index)}
                buttonStyle={styles.buttonSTyle}
                defaultButtonText={defaultButtonText}
                renderDropdownIcon={(value)=>
                    <Icon name="angle-down" size={20}/>
                }
           />
        </View>
  )
}

const styles = StyleSheet.create({
    DropDown : {
        marginTop: 10,
        marginBottom: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around'
    },    
    buttonSTyle: {
        borderRadius: 5,
        width: 100,
        height: 30,
        borderWidth: 1
    },
})