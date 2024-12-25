import { Text, View, StyleSheet } from "react-native"
import DropDown from "./DropDown"
import { useEffect, useState } from "react"
import CreateDatePicker from "./CreateDatePicker";
import StudentRealmContext from '../models/StudentContext';
const {useQuery,useRealm } = StudentRealmContext;
import { Student } from "../models/Student";
import { Attendance } from "../models/Attendance";

export default Compute = () => {
  const [sortClass, setSortClass] = useState(0);
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [computedData,setComputedData] = useState({});
  const attendanceData = useQuery(Attendance);
  const studentData = useQuery(Student);
  const [month,setMonth] = useState((new Date()).getMonth());
  const [monthlyData, setMonthlyData] = useState([{}]);
  const [dataByCount, setDataByCount] = useState([{}]);
  const [gender,setGender] = useState("All");
  const [count,setCount] = useState(1)
  const realm = useRealm();



  const getTotalStudents = ()=>{
    return studentData
    .filter((item)=>item.isValid())
    .filter((item)=> sortClass ? item.class === sortClass : true)
    .filter((item)=>gender === "All"?true: item.gender === gender)
  }

  const computeByCount = (givenCount)=>{

      const presentMap = new Map();
      const absentMap = new Map();

      getTotalByMonth()?.forEach((item) => {
        const key = JSON.stringify({
          class: item.class,
          rollNo: item.rollNo,
        });
    
        if(item.isPresent){
          addDataToMap(presentMap,key)
        }else{
          addDataToMap(absentMap,key)
        }
      });

      const present = countInMap(presentMap,givenCount);
      const absent = countInMap(absentMap,givenCount);

      setDataByCount({
        present,
        absent
      })  
  }

  const countInMap = (myMap,count)=>{
    let answer = 0;
    myMap?.forEach((item)=>{
      if(item>=count) answer++;
    })

    return answer;
  }
  const addDataToMap = (myMap,key)=>{
    if (myMap.has(key)) {
      const prev = myMap.get(key);
      myMap.set(key, prev + 1);
    } else {
      myMap.set(key, 1);
    }
  }
  useEffect(()=>{
    computeByCount(count);
  },[count,monthlyData])

  const getTotalMarked = ()=>{
    return attendanceData
    .filter((item)=> item.isValid() && sortClass?item.class === sortClass:true)
    .filter((item)=>item.date === date.toLocaleDateString().toString())
    .filter((item)=>gender === "All"?true: item.gender === gender)
    }

  const getTotalByMonth = ()=>{
    return attendanceData
    .filter((item)=> item.isValid() && sortClass?item.class === sortClass:true)
    .filter((item)=> parseInt(item.date.split("/")[1]) === month+1)
    .filter((item)=>gender === "All"?true: item.gender === gender)
  }

  const getTotalPresent = (data)=>{
    return data
    .filter((item)=>item.isPresent);
  }
  useEffect(()=>{
      const total = getTotalStudents();
      const totalMarked = getTotalMarked();
      const totalPresent = getTotalPresent(totalMarked).length;
      const totalAbsent = totalMarked.length - totalPresent;
      setComputedData({
        totalStudents : total.length,
        totalMarked : totalMarked.length,
        totalPresent,
        totalAbsent
      })  
  },[date,sortClass,studentData,attendanceData,gender])

  useEffect(()=>{
      const totalMarked = getTotalByMonth();
      const totalPresent = getTotalPresent(totalMarked).length;
      const totalAbsent = totalMarked.length - totalPresent;
      setMonthlyData({
        totalMarked : totalMarked.length,
        totalPresent,
        totalAbsent
      })  
  },[month,sortClass,gender,studentData,attendanceData])
  const monthData = [ 
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec'
  ]
  const genderData = ['All','M','F']
  const countData =  Array.from({ length: 31 }, (v, i) => i+1);

  return (
    <View style={styles.container}>
      <DropDown 
        setSortFunction={setSortClass} 
        data={['All',1,2,3,4,5,6,7,8,9,10,11,12]}
        defaultButtonText={"All"}
        titleText={"Select Class :"}
        />
        <DropDown 
        setSortFunction={(index)=>setGender(genderData[index])} 
        data={genderData}
        defaultButtonText={"All"}
        titleText={"Select Gender :"}
        />
      <CreateDatePicker date={date} setDate={setDate} open={open} setOpen={setOpen}/>
      {
        computedData ? (
          <View>
              <View style={styles.dataContainer}>
                <Text style={styles.text}>Total Students : {computedData?.totalStudents}</Text> 
                <Text style={styles.text}>Total Marked :{computedData?.totalMarked}</Text> 
                <Text style={styles.text}>Total Present :{computedData?.totalPresent}</Text> 
                <Text style={styles.text}>Total Absent :{computedData?.totalAbsent}</Text> 
            </View>
            <View style={styles.dataContainer}>
              <DropDown setSortFunction={setMonth} data={monthData}
              defaultButtonText={monthData[month]}
              titleText={"Select Month :"}
              />
                <Text style={styles.text}>Total Marked :{monthlyData?.totalMarked}</Text> 
                <Text style={styles.text}>Total Present :{monthlyData?.totalPresent}</Text> 
                <Text style={styles.text}>Total Absent :{monthlyData?.totalAbsent}</Text> 

                <DropDown 
                  setSortFunction={(index)=>setCount(index+1)} 
                  data={countData}
                  defaultButtonText={"1"}
                  titleText={"Select Number :"}
                />
                <Text style={styles.text}>Total Present :{dataByCount?.present}</Text> 
                <Text style={styles.text}>Total Absent :{dataByCount?.absent}</Text> 

            </View>
          </View> 
        )
        :
      (
        <Text>No Data</Text>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container : {
    padding: 20
  },
  dataContainer : {
    padding:10,
  },
  text : {
    fontSize : 20,
    fontWeight: 'bold'
  }
})