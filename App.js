import { StyleSheet, View, Text } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import  Home  from './components/Home';
import AddNew from './components/AddNew';
import Compute from './components/Compute';
import StudentRealmContext from './models/StudentContext'
import Attendance from './components/Attendance';
const Drawer = createDrawerNavigator();
const {RealmProvider } = StudentRealmContext;
import {AppProvider, UserProvider, useAuth, useRealm, useApp} from '@realm/react';
import Icon from 'react-native-vector-icons/FontAwesome';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import { useEffect, useState } from 'react';
import { Student } from './models/Student';
import { Attendance as studentAttendance } from './models/Attendance';
import LoadingScreen from './components/LoadingScreen';
import NetInfo from "@react-native-community/netinfo";

export default function App() {

  const existingRealmFileBehavior = {
    type: "downloadBeforeOpen",
    timeOut: 2000,
    timeOutBehavior: "openLocalRealm",
  };

  const newRealmFileBehavior = {
    type: "downloadBeforeOpen",
  };

  return (
    <AppProvider id={"tabcounter-yteur"}>
      <UserProvider fallback={<LoginComponent text={"Connecting to Database..."}/>}>
        <RealmProvider fallback={ <LoadingScreen visible={true} text={"Fetching data..."}/>}  
          sync={{
            flexible: true,
            existingRealmFileBehavior: existingRealmFileBehavior,
            newRealmFileBehavior: newRealmFileBehavior,
            initialSubscriptions: {
              update : (mutableSubs, realm)=>{
                mutableSubs.add(realm.objects(Student));
                mutableSubs.add(realm.objects(studentAttendance));
                }
              },
            onError: (_,error)=> console.error("error fetching cloud data : ",error)
          }}
        >

          <NavigationCreator/>
        </RealmProvider>
      </UserProvider>
    </AppProvider>
  );
}

const NavigationCreator = ()=>{
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home" >
        <Drawer.Screen name="Home" component={Home}  options={createDrawerIcon("home",Icon)}/>
        <Drawer.Screen name="New Student" component={AddNew} options={createDrawerIcon("new-message",EntypoIcon)} />
        <Drawer.Screen name="Attendance" component={Attendance}  options={createDrawerIcon("book",Icon)} />
        <Drawer.Screen name="Compute" component={Compute}  options={createDrawerIcon("calculator",Icon)} />
      </Drawer.Navigator>
    </NavigationContainer>
  )
}
const LoginComponent = ({text}) => {
  const atlasApp = useApp();
  const {logInWithAnonymous, result} = useAuth();
  const [isOnline,setIsOnline] = useState(false);

  useEffect(() => {
    // Log in as an anonymous user if there is not a logged in user yet. Also
    // check `!result.pending` to prevent simultaneous authentication operations.
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsOnline(state.isInternetReachable);

      if (state.isInternetReachable && !atlasApp.currentUser && !result.pending) {
        logInWithAnonymous();
      }
    });
    return () => {
      unsubscribe();
    };
  }, [atlasApp.currentUser, logInWithAnonymous, result.pending]);

  return (
    <View >
      {result.pending && <LoadingScreen visible={true} text={text}/>}
      {!isOnline && <Text style={styles.error}>Internet Connection is Required for first time..</Text>}
      {isOnline && result?.error && <Text>{result?.error?.message?.split("reason:")[1]?.trim()}</Text>}
    </View>
  );
};

const createDrawerIcon = (name,Icon)=>{
  return {
    drawerIcon: ({focused,size})=>(
      <Icon
        name= {name} 
        size={size}
      />
     )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding:30
  },
  error : {
    padding:20,
    margin: 'auto',
    textAlign: 'center'
  }
});
