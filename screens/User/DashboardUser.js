import React, { Component, useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, TextInput, Alert } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import firebase from '../../database/firebase';
import { set } from 'react-native-reanimated';

function DashboardUser({navigation}) {
    const [uid, setUID] = useState(null); 
    const [input_text, setInput] = useState(''); 
    const [currentDate, setCurrentDate] = useState('');
    const [displayName, setDisplayName] = useState(''); 
    const [isVerify, setVerify] = useState(true);
    const [dose, setDose] = useState(''); 
    const [provider, setProvider] = useState(''); 
    const [vaccinateResult, setVacResult] = useState('');

    useEffect(() => {
        // setCode(MakeID(6));
        var date = new Date().getDate(); //Current Date
        var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        var monthName = months[new Date().getMonth()]; //Current Month
        var year = new Date().getFullYear(); //Current Year
        var hours = new Date().getHours(); //Current Hours
        var min = new Date().getMinutes(); //Current Minutes
        var sec = new Date().getSeconds(); //Current Seconds
        
        setCurrentDate(
            monthName + ' ' + date + ', ' + year 
        );

        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
              setDisplayName(user.displayName);
              setUID(user.uid); 
            }
        });

        // setDisplayName(firebase.auth().currentUser.displayName);
        // setUID(firebase.auth().currentUser.uid); 
    });

    const signOut = () => {
        firebase.auth().signOut().then(() => {
          navigation.navigate('LoginUser')
        })
        .catch(error => console.log(error.message))
      }

    const UserUpload = async (currentDate, dose, provider, hospital) => {
        const user = firebase.auth().currentUser; 
        const storageRef = firebase.database().ref(`users/` + `${user.uid}`);
        storageRef.set({
            dose: dose,
            provider: provider,
            date: currentDate, 
            hospital: hospital
          });
        
        if (dose == '1st') { 
            if (provider == 'Johnson & Johnson') {
                setVacResult("Fully vaccinated")
            } else { 
                setVacResult("Half vaccinated");
            }
        } else { 
            setVacResult("Fully vaccinated");
        }
    }

      
    const verify = (code) => { 
        const user = firebase.auth().currentUser; 
        try {
            const storageRef = firebase.database().ref(`providers/` + `${currentDate}/` + `${code}`);
            
            storageRef.on('value', (snapshot) => {
                const data = snapshot.val();
                setProvider(data.provider); 
                setDose(data.dose);
                UserUpload(currentDate, data.dose, data.provider, '');
              });
            
            
            setVerify(true);
            navigation.navigate('DigitalCard', {provider: provider, dose: dose, testResult: vaccinateResult});
        } catch(error) { 
            Alert.alert(error.message); 
            setVerify(false);
        }
    } 
   
    return (
    <View style={styles.container}>
        <Text style = {styles.textStyle}>
        Welcome, {displayName}
        </Text>
        <TextInput
            style={styles.input}
            onChangeText = {setInput}
            placeholder="Enter the code"
        />
        {!isVerify && <Text> Type again! </Text>}
        <Button title="Submit" onPress={() => verify(input_text)} />
        <Button title="Enter the code manually" onPress={() => navigation.navigate('Information')} />

        <Button
        color="#3740FE"
        title="Logout"
        onPress={() => signOut()}
        />
    </View>
    )
  };

export default DashboardUser; 
  
const styles = StyleSheet.create({
container: {
    flex: 1,
    display: "flex",
    justifyContent: 'center',
    alignItems: 'center',
    padding: 35,
    backgroundColor: '#fff'
},
textStyle: {
    fontSize: 15,
    marginBottom: 20
},
input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
}
});
