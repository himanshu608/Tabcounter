import { View, Text, StyleSheet, TouchableOpacity} from "react-native"
import Icon from 'react-native-vector-icons/FontAwesome'
import StudentRealmContext from '../models/StudentContext'
import { Attendance } from "../models/Attendance";
const {useQuery, useRealm } = StudentRealmContext;
import {useEffect, useState} from 'react'

export default AttendanceCard = (
    {   
        studentData,
        date,
        setStudentIndex,
        isPrevDisabled,
        isNextDisabled
    }
    ) => {
    const realm = useRealm();
    const realmStudent = useQuery(Attendance);

    const [markedStatus, setMarkedStatus] = useState('Not Marked');
    const handlePrevNext = (value)=>{
        setStudentIndex((prev)=>prev+value)
    }

    useEffect(()=>{
        const markedStudent = alreadyMarked();
        if(markedStudent.length > 0) {
            setMarkedStatus(markedStudent[0].isPresent ? 'Present' : 'Absent');
        }else setMarkedStatus("Not Marked")
    },[studentData?.rollNo,studentData?.class,date,realmStudent])

    const alreadyMarked = ()=>{
        return realm.objects('Attendance')
        .filtered('rollNo == $0 && class == $1 && date == $2', 
            parseInt(studentData?.rollNo), 
            parseInt(studentData?.class),
            date
            )
        .filter((item)=>item.isValid())
        .slice(0, 1); // Get the first matching student (if any)
    }
    const handleSubmit = (value)=>{
        const markedAttendence = alreadyMarked();
        realm.write(() => {
            if (markedAttendence.length > 0) {
                // Update existing student if found
                const studentToUpdate = markedAttendence[0];
                studentToUpdate.isPresent = value;
            } else {
                // Create a new student if no existing student is found
                realm.create('Attendance', {
                    _id: new Realm.BSON.ObjectId(),
                    name: studentData?.name,
                    rollNo: studentData?.rollNo,
                    class: studentData?.class,
                    gender: studentData?.gender,
                    date : date,
                    isPresent: value
                });
            }
        });
        if(!isNextDisabled) setStudentIndex((prev)=>prev+1)
    }

  return (
    <View style={styles.container}>
        <View style={styles.smallCOntainers}>
            <Text style={[styles.text, styles.name]}>{studentData?.name}</Text>
        </View>
        <View style={[styles.rollClass, styles.smallCOntainers]}>
            <Text style={styles.text}>Class : {studentData?.class}</Text>
            <Text style={styles.text}>Roll. No. : {studentData?.rollNo}</Text>
            <Text style={styles.text}>{studentData?.gender}</Text>
        </View>
        <View style={styles.smallCOntainers}>
            <Text style={[styles.text,{fontWeight:'900'}]}>
                {markedStatus}
            </Text>
        </View>
        <View style={styles.smallCOntainers}>
            <CreateButton 
                data={<Icon name="close" size={30}/>} 
                handleFunction={()=>handleSubmit(false)} 
                buttonstyles={[styles.button, styles.buttonAbsent]} 
            />
            <CreateButton 
                data={<Icon name="check" size={30}/>} 
                handleFunction={()=>handleSubmit(true)} 
                buttonstyles={[styles.button, styles.buttonPresent]} 
            />
        </View>
        <View style={[styles.smallCOntainers, styles.prevNext]}>
            <CreateButton 
                data={<Icon name="chevron-left" size={30}/>} 
                handleFunction={()=>handlePrevNext(-1)} 
                buttonstyles={[styles.button, styles.buttonPrevious]} 
                isDisabled={isPrevDisabled}
            />
            <CreateButton 
                data={<Icon name="chevron-right" size={30}/>} 
                handleFunction={()=>handlePrevNext(1)} 
                buttonstyles={[styles.button, styles.buttonNext]} 
                isDisabled={isNextDisabled}
            />
        </View>
    </View>
  )
}

const CreateButton = ({data,handleFunction,buttonstyles,isDisabled})=>{
    return (
        <TouchableOpacity onPress={()=>handleFunction()} disabled={isDisabled || false}>
                    <View >
                        <Text style={[...buttonstyles]}>
                            {data}
                        </Text>
                    </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container : {
        padding: 20,
        alignItems: 'center'
    },
    smallCOntainers: {
        marginTop: 10,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        height: 50
    },
    text : {
        fontSize: 20,
        fontWeight: 'bold'
    },
    rollClass : {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    button: {
        padding:10,    
        fontSize:20,
        textAlign: 'center',
        borderRadius:10,
        margin:10,
        fontWeight: '800',
        height: 50,
        color: 'white',
        backgroundColor:'#24A0ED'

    },
    buttonPresent: {
        backgroundColor:'#24A0ED'
    },
    buttonAbsent: {
        backgroundColor:'crimson'
    },
    prevNext : {
        marginTop: 60
    },
    name : {
        fontSize: 25,
        fontWeight: '900'
    }
})