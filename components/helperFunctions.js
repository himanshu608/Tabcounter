
import { Student } from "../models/Student";
import { homeCardDetails } from "./Home";
import {Alert} from 'react-native';

export const handleSubmit = (student,navigation,realm)=>{

    if(student && student?.name?.trim() === "") 
        return Alert.alert("Name can't be Empty");

    if(student && (student?.class <1 || student?.class >12 ) ) 
        return Alert.alert("Please assign Correct Class.");
    
    if( student 
        && student?.class 
        && student?.rollNo 
        && student?.class 
        && student?.gender){
            
        const existingStudent = realm.objects(Student)
                                .filtered('rollNo == $0 && class == $1', 
                                    parseInt(student?.rollNo), 
                                    parseInt(student?.class))
                                .filter((item)=>item.isValid())
                                .slice(0, 1); // Get the first matching student (if any)

        realm.write(() => {
            if (existingStudent.length > 0) {
                // Update existing student if found
                const studentToUpdate = existingStudent[0];
                studentToUpdate.name = student?.name;
                studentToUpdate.gender = student?.gender;

            } else {
                // Create a new student if no existing student is found
                realm.create('Student', {
                    _id: new Realm.BSON.ObjectId(),
                    name: student?.name,
                    rollNo: parseInt(student?.rollNo),
                    class: parseInt(student?.class),
                    gender: student?.gender
                });
            }
        });

        navigation.navigate(homeCardDetails[1]?.title)
    }else {
        return Alert.alert("All fields are required");
    }
}