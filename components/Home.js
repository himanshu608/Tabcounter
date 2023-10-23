import { ScrollView, StyleSheet, View } from "react-native"
import HomeCard from "./HomeCard"
import StudentRealmContext from '../models/StudentContext';
const {useRealm } = StudentRealmContext;
import {useEffect} from 'react'
import { Student } from "../models/Student";
import { Attendance } from "../models/Attendance";
export const homeCardDetails = [
    {
        id : 1,
        title : "New Student"
    },
    {
        id : 2,
        title : 'Attendance'
    },
    {
        id : 3,
        title : "Compute"
    }
]

export default Home = () => {

    const realm = useRealm();

    useEffect(()=>{
        if(realm?.subscriptions?.isEmpty){
          realm.subscriptions.update((mutableSubs, realm)=>{
            mutableSubs.add(realm.objects(Student));
            mutableSubs.add(realm.objects(Attendance));
            });
          }
      },[])

  return (
    <View style={styles.container}>
        <ScrollView >
            <View style={styles.homecards} > 
                {
                    homeCardDetails?.map((item,id)=>
                        (
                            <HomeCard id={id} key={item.id}/>
                        ))
                }
            </View>
        </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
    container : {
        flex :1,
        padding:20,
    },
    homecards : {
        flex:1,
        height:500,
        justifyContent: 'center'
    }
})
