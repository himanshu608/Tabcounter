import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from "react-native"



export default TotalStudents = ({students,setStudentIndex,setIsAttendanceCardOpen}) => {

  return (
    <View style={styles.container}>
        <View style={styles.studentDetails}>
            <Text 
                style={[ styles.tableHead, styles.tableHeadSNo]}
            >
            </Text>
            <Text 
                style={[ styles.tableHead, styles.tableHeadRollno]}
            >
                Roll No.
            </Text>
            <Text 
                style={[ styles.tableHead, styles.tableHeadName]}
            >
                Name
            </Text>
            <Text 
            style={[ styles.tableHead, styles.tableHeadClass]}
            >
                Class
            </Text>
        </View>
        <View style={styles.students}>
            <ScrollView >
            {students?.map((item,index)=> (
                    <TouchableOpacity 
                        key={index} 
                        onPress={()=>{
                            setStudentIndex(index); 
                            setIsAttendanceCardOpen((prev)=>!prev)
                        }}
                    >
                        <View 
                            style={[styles.studentDetails, styles.shadowProp]} 
                        >
                            <Text style={[styles.student, styles.studentSNo]}>{index+1 }</Text>
                            <Text style={[styles.student, styles.studentRollno]}>{item?.rollNo}</Text>
                            <Text style={[styles.student, styles.studentName]}>{item?.name}</Text>
                            <Text style={[styles.student, styles.studentClass]}>{item?.class}</Text>
                        </View>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        marginTop:20,
        height : 500
    },
    students : {
        marginBottom: 10,
    },
    student : {
        flex:1,
        fontSize: 17,
    },
    studentSNo: {
        flex: 0.5,
        textAlign: 'left',
    },
    studentName : {
        flex: 2,
        textAlign: 'left',
    },
    studentRollno : {
        textAlign: 'left',
        flex: 0.5
    },
    studentClass : {
        textAlign: 'center',
        flex: 0.5
    },
    studentDetails : {
        flexDirection: "row",
        justifyContent: 'space-around',
        marginBottom:10,
        alignItems: 'center',
        padding: 5,
        borderRadius: 7,
        paddingHorizontal: 10,
        backgroundColor: 'white',
    },
    tableHead : {
        fontWeight: 'bold',
        fontSize: 18,
        flex:1
    },
    tableHeadSNo : {
        textAlign: 'left',
        flex: 0.2
    },
    tableHeadName: {
        textAlign: 'left',
        flex: 2
    },
    tableHeadRollno : {
        textAlign: 'left',
        
    },
    tableHeadClass: {
        textAlign: 'center'
    },
    shadowProp: {
        elevation: 5,
        shadowColor: '#52006A',
    },
})