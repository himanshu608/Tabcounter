import { View, Button } from "react-native"
import DatePicker  from 'react-native-date-picker'


export default CreateDatePicker = ({date,setDate,open,setOpen}) => {
  return (
    <View>
        <Button title="Select Date" onPress={() => setOpen(true)} />
        <DatePicker
            modal
            open={open}
            date={date}
            onConfirm={(date) => {
            setOpen(false)
            setDate(date)
            }}
            onCancel={() => {
            setOpen(false)
            }}
            mode="date"
            minimumDate={new Date("2023-10-01")}
            maximumDate={new Date()}
        />
    </View>
  )
}
