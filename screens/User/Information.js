import React, { Component, useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, TextInput, Platform } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import DateTimePicker from '@react-native-community/datetimepicker';

import SelectDropdown from 'react-native-select-dropdown';

import firebase from '../../database/firebase';

function Information({navigation}) {
    const [text, setText] = useState('');
    const providers = ["Moderna", "Pifzer"]; 

    //Dose
    const [dose, setDose] = useState(''); 

    //Providers
    const [firstClinic, setFirstClinic] = useState('');
    const [secondClinic, setSecondClinic] = useState('');

    //Date
    const [firstDate, setFirstDate] = useState(new Date());
    const [secondDate, setSecondDate] = useState(new Date());

    //Date picker
    const [mode, setMode] = useState('date');
    const [firstDone, setFirstDone] = useState(false);
    const [secondDone, setSecondDone] = useState(false); 
    const [showFirst, setShowFirst] = useState(false);
    const [showSecond, setShowSecond] = useState(false);
  
    const onChangeFirst = (event, selectedDate) => {
      const currentDate = selectedDate || date;
    //   setShow(Platform.OS === 'ios');
        setFirstDate(currentDate);
    //   console.log(currentDate);
    };

    const onChangeSecond = (event, selectedDate) => {
        const currentDate = selectedDate || date;
      //   setShow(Platform.OS === 'ios');
          setSecondDate(currentDate);
      //   console.log(currentDate);
      };
  
    const showMode = (currentMode) => {
        setShowFirst(true);
        setMode(currentMode);
    };
  
    const showDatepicker = () => {
      showMode('date');
    };

    const doneSelectDateFirst = () => {
        setFirstDone(true);
        setShowFirst(false);
    }

    const doneSelectDateSecond = () => {
        setSecondDone(true); 
        setShowSecond(false);
    }

    const showDateButtonFirst = (status, dose) => {
        if (status == false) {
            return "Select a date (" + dose+ " dose)";
        } else {
            if (dose == "1st") {
                var month = firstDate.getMonth(); 
                var date = firstDate.getDate(); 
                var year = firstDate.getFullYear();

                var time = month + "/" + date + "/" + year
                return time.toString();
            } else if (dose == "2nd") {
                var month = secondDate.getMonth(); 
                var date = secondDate.getDate(); 
                var year = secondDate.getFullYear();

                var time = month + "/" + date + "/" + year
                return time.toString();
            }
        }
    }

    const showDateButtonSecond = (status, dose) => {
        if (status == false) {
            return "Select a date (" + dose+ " dose)";
        } else {

            var month = secondDate.getMonth(); 
            var date = secondDate.getDate(); 
            var year = secondDate.getFullYear();

            var time = month + "/" + date + "/" + year
            return time.toString();
            
        }
    }

    const handleTime = (time) => {
        var month = time.getMonth(); 
        var date = time.getDate(); 
        var year = time.getFullYear();

        var result = month + "/" + date + "/" + year
        return result.toString();
    }


    //User Firebase
    const UserUpload = async (firstDate, secondDate, firstHospital, secondHospital, provider) => {
        const user = firebase.auth().currentUser; 
        const storageRef = firebase.database().ref(`users/` + `${user.uid}`);
        storageRef.set({
            '1st': {
                provider: provider,
                date: firstDate, 
                hospital: firstHospital
            },
            '2nd': {
                provider: provider,
                date: secondDate, 
                hospital: secondHospital
                }
        });
    }

    //Finish Editing
    const DoneUpload = () => {
        
        UserUpload(handleTime(firstDate), handleTime(secondDate), firstClinic, secondClinic, dose); 
        navigation.navigate('VerificationCard'); 
    } 

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text> Vaccination Provider </Text>
            <SelectDropdown
                data={providers}
                onSelect={(selectedItem) => {
                    setDose(selectedItem)
                }}
                defaultButtonText = "Select dose"
            />
            
            <Text> 1st Dose </Text>
            <TextInput
                style={{height: 40}}
                placeholder="Your clinic's name"
                onChangeText={text => setFirstClinic(text)}
                defaultValue={firstClinic}
            />

            <Button onPress={showDatepicker} title={showDateButtonFirst(firstDone, "1st")} />

            {showFirst && 
                <View>
                    <DateTimePicker
                        testID="dateTimePicker"
                        value={firstDate}
                        mode={'date'}
                        // is24Hour={true}
                        display="spinner"
                        onChange={onChangeFirst}
                        style={{width: 320, backgroundColor: "white"}}
                    />
                    <Button onPress={doneSelectDateFirst} title="Done" />
                </View>
            }

            <Text> 2nd Dose (optional) </Text>
            <TextInput
                style={{height: 40}}
                placeholder="Your clinic's name"
                onChangeText={text => setSecondClinic(text)}
                defaultValue={secondClinic}
            />

            <Button onPress={showDatepicker} title={showDateButtonSecond(secondDone, "2nd")} />

            {showSecond && 
                <View>
                    <DateTimePicker
                        testID="dateTimePicker"
                        value={secondDate}
                        mode={'date'}
                        // is24Hour={true}
                        display="spinner"
                        onChange={onChangeSecond}
                        style={{width: 320, backgroundColor: "white"}}
                    />
                    <Button onPress={doneSelectDateSecond} title="Done" />
                </View>
            }

            <Button title="Next" onPress={() => DoneUpload()} />
            <Button title="Logout" onPress={() => navigation.navigate('LoginUser')} />
           
        </View>
        
    );
}

export default Information;