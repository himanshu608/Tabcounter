import { Text, View, StyleSheet, Button } from "react-native"
import DropDown from "./DropDown"
import { useEffect, useState } from "react"
import AttendanceCard from "./AttendanceCard";
import StudentRealmContext from '../models/StudentContext'
import { Student } from "../models/Student";
import CreateDatePicker from "./CreateDatePicker";
import TotalStudents from "./TotalStudents";
const {useQuery, useRealm } = StudentRealmContext;


export default Attendance = () => {
    const [sortClass , setSortClass] = useState(0);
    const [date, setDate] = useState(new Date())
    const [open, setOpen] = useState(false)
    const [studentIndex,setStudentIndex] = useState(0);
    const [studentAttendanceData, setStudentAttendanceData] = useState([{}]);
    const [isAttendanceCardOpen, setIsAttendanceCardOpen ] = useState(false);


    const realmStudents = useQuery(Student);
    const realm = useRealm();

    useEffect(()=>{
      const newData  = realmStudents
                        .sorted('rollNo')
                        .sorted('class')
                        .filter((item)=>item.isValid())
                        .filter((item)=> 
                          sortClass?item.class == sortClass:true
                        )
      const loadedData = newData.map((item) => realm.objectForPrimaryKey('Student', item._id)); // Fully load the objects
      setStudentAttendanceData(loadedData);
      setStudentIndex(0)

    },[date,sortClass,realmStudents,realm])

    useEffect(()=>{
      setStudentIndex(0)
    },[date,sortClass])

  return (
    <View style={styles.container}>
        <DropDown 
          setSortFunction={setSortClass} 
          data={['All',1,2,3,4,5,6,7,8,9,10,11,12]}
          defaultButtonText={"All"}
          titleText={"Select Class :"}
        />

        <CreateDatePicker 
          date={date} 
          setDate={setDate} 
          open={open} 
          setOpen={setOpen}
        />

        <Button 
          title={isAttendanceCardOpen?"list":"Card"} 
          color={"crimson"} 
          onPress={()=> setIsAttendanceCardOpen((prev)=>!prev)}
        />
        
        <View>
        {
            studentAttendanceData.length > 0 ? (
              isAttendanceCardOpen ? (
                <AttendanceCard 
                  date={date.toLocaleDateString().toString()} 
                  studentData={studentAttendanceData[studentIndex]}
                  setStudentIndex={setStudentIndex}
                  isNextDisabled={studentIndex === (studentAttendanceData.length - 1)}
                  isPrevDisabled={studentIndex === 0}
                />
              ) : (
                <TotalStudents 
                  students={studentAttendanceData} 
                  setStudentIndex={setStudentIndex} 
                  setIsAttendanceCardOpen={setIsAttendanceCardOpen} 
                />
              )
            ) : (
                <Text style={styles.nodataText}>
                  No data Found for slected class
                </Text>
            )
          }
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        padding:20,
    },
    nodataText:{
      padding: 20,
      textAlign: 'center',
      fontSize: 20
    }
})