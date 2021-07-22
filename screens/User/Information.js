import React, { Component, useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, TextInput, Platform, Alert, Pressable } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import DateTimePicker from '@react-native-community/datetimepicker';

import SelectDropdown from 'react-native-select-dropdown';

import firebase from '../../database/firebase';

import {
    useFonts,
    RobotoMono_100Thin,
    RobotoMono_200ExtraLight,
    RobotoMono_300Light,
    RobotoMono_400Regular,
    RobotoMono_500Medium,
    RobotoMono_600SemiBold,
    RobotoMono_700Bold,
    RobotoMono_100Thin_Italic,
    RobotoMono_200ExtraLight_Italic,
    RobotoMono_300Light_Italic,
    RobotoMono_400Regular_Italic,
    RobotoMono_500Medium_Italic,
    RobotoMono_600SemiBold_Italic,
    RobotoMono_700Bold_Italic,
  } from '@expo-google-fonts/roboto-mono';



function Information({navigation}) {
    const [text, setText] = useState('');
    const providers = ["Moderna", "Pifzer"]; 
    const [vaccinateResult, setVacResult] = useState('');

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


    let [fontsLoaded] = useFonts({
        RobotoMono_100Thin,
        RobotoMono_200ExtraLight,
        RobotoMono_300Light,
        RobotoMono_400Regular,
        RobotoMono_500Medium,
        RobotoMono_600SemiBold,
        RobotoMono_700Bold,
        RobotoMono_100Thin_Italic,
        RobotoMono_200ExtraLight_Italic,
        RobotoMono_300Light_Italic,
        RobotoMono_400Regular_Italic,
        RobotoMono_500Medium_Italic,
        RobotoMono_600SemiBold_Italic,
        RobotoMono_700Bold_Italic,
    });

    const onChangeSecond = (event, selectedDate) => {
        const currentDate = selectedDate || date;
      //   setShow(Platform.OS === 'ios');
          setSecondDate(currentDate);
      //   console.log(currentDate);
      };
  
    const showMode = (currentMode, option) => {
        if (option == '1st') {
            setShowFirst(true);
        } else {
            setShowSecond(true);
        }
        setMode(currentMode);
    };
  
    const showDatepicker = (option) => {
      showMode('date', option);
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
            var month = firstDate.getMonth(); 
            var date = firstDate.getDate(); 
            var year = firstDate.getFullYear();

            var time = month + "/" + date + "/" + year
            return time.toString();
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
        var testResult = ''; 
        if (secondDate != null && secondHospital !=  null) {
            testResult = 'Fully vaccinated'
        } else {
            testResult = 'Half vaccinated'
        }

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
            }, 
            'status': testResult
        });
    }

    //Finish Editing
    const DoneUpload = () => {       
        if (firstDate != null) {
            if (secondDate != null) {
                setVacResult('Fully vaccinated');
            } else {
                setVacResult('Half vaccinated');
            }
        }
        UserUpload(handleTime(firstDate), handleTime(secondDate), firstClinic, secondClinic, dose); 

        if (dose != null && firstDate != null && firstClinic != null) {
                navigation.navigate('VerificationCard', {testResult: vaccinateResult}); 
            } else {
                Alert.alert('Missing information. Try again');
            }
    } 

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{fontFamily: 'RobotoMono_700Bold', fontSize: 30, position: 'absolute', top: '10%', left: 10}}> Information </Text>
            
            <View style={{position: 'absolute', top: '18%', alignContent: 'center', alignItems: 'center'}}> 
                <Text style={{fontFamily: 'RobotoMono_400Regular', fontSize: 20, }}> Vaccination Provider </Text>
                <SelectDropdown
                    data={providers}
                    onSelect={(selectedItem) => {
                        setDose(selectedItem)
                    }}
                    defaultButtonText = "Select dose"
                    buttonTextStyle={{color: 'blue'}}
                />
            </View>
            <View style={{ alignContent: 'center', alignItems: 'center', marginBottom: 50}}> 
                <Text style={{fontFamily: 'RobotoMono_400Regular', fontSize: 20}}> 1st Dose </Text>
                <TextInput
                    autoCorrect={false}
                    style={styles.input}
                    placeholder="Your clinic's name"
                    onChangeText={text => setFirstClinic(text)}
                    defaultValue={firstClinic}
                />
                <View>
                    <DateTimePicker
                        testID="dateTimePicker1"
                        value={firstDate}
                        mode={'date'}
                        // is24Hour={true}
                        display="default"
                        onChange={onChangeFirst}
                        minimumDate={new Date(2019, 0, 1)}
                        style={{width: 320, position: 'absolute'}}
                    />
                </View>
            </View>
            

            <Text style={{fontFamily: 'RobotoMono_400Regular', fontSize: 20}}>2nd Dose (optional) </Text>
            <TextInput
                autoCorrect={false}
                style={styles.input}
                placeholder="Your clinic's name"
                onChangeText={text => setSecondClinic(text)}
                defaultValue={secondClinic}
            />

            <View>
                <DateTimePicker
                    testID="dateTimePicker2"
                    value={secondDate}
                    mode={'date'}
                    // is24Hour={true}
                    display="default"

                    onChange={onChangeSecond}
                    maximumDate={new Date()}
                    style={{width: 320, position: 'absolute'}}
                />
            </View>
            <Pressable style={styles.button} onPress={() => DoneUpload()}>
                <Text style={styles.buttonText}>Next</Text>
            </Pressable>

            <Pressable style={styles.buttonOther} onPress={() => navigation.navigate('LoginUser', {testResult: vaccinateResult})}>
                <Text style={styles.buttonText}>Logout</Text>
            </Pressable>           
        </View>
        
    );
}

export default Information;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: "flex",
        justifyContent: 'center',
        alignItems: 'center',
        padding: 35,
        backgroundColor: '#fff'
    },
    containerDose: {
        position: 'absolute', 
        top: '38%', 
        alignContent: 'center', 
        alignItems: 'center'
    }, 
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: 'black',
        borderRadius: 30, 
        margin: 5, 
        width: 300,
        position: 'absolute', 
        bottom: '20%'
    }, 
    
    buttonText: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
    },
    input: {
        height: 40,
        width: 300,
        margin: 12,
        borderWidth: 1,
        alignItems: 'center', 
        justifyContent: 'center',
        display: 'flex', 
        alignContent: 'center', 
    },
    buttonOther: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: '#38502D',
        borderRadius: 30, 
        margin: 5, 
        width: 300, 
        position: 'absolute', 
        bottom: '12%'
    }, 
    logoutButton: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: '#5B3030',
        borderRadius: 30, 
        margin: 5, 
        width: 300
    }, 
    
    textStyle: {
        fontFamily: 'RobotoMono_700Bold',
        fontSize: 30,
        marginBottom: 20
    },
    input: {
        height: 40,
        width: 300,
        margin: 12,
        borderWidth: 1,
        alignItems: 'center', 
        justifyContent: 'center',
        display: 'flex', 
        alignContent: 'center', 
        }
    });
    