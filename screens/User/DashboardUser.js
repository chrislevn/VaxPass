import React, { Component, useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, TextInput, Alert, Pressable, ActivityIndicator } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

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


function DashboardUser({navigation}) {
    const [uid, setUID] = useState(null); 
    const [input_text, setInput] = useState(''); 
    const [currentDate, setCurrentDate] = useState('');
    const [displayName, setDisplayName] = useState(''); 
    const [isVerify, setVerify] = useState(true);
    const [dose, setDose] = useState(''); 
    const [provider, setProvider] = useState(''); 
    const [vaccinateResult, setVacResult] = useState('');

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


    useEffect(() => {
        var date = new Date().getDate(); //Current Date
        var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        var monthName = months[new Date().getMonth()]; //Current Month
        var year = new Date().getFullYear(); //Current Year
        
        setCurrentDate(
            monthName + ' ' + date + ', ' + year 
        );

        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
              setDisplayName(user.displayName);
              setUID(user.uid); 
            }
        });
    });

    const signOut = () => {
        firebase.auth().signOut().then(() => {

        // navigation.navigate('LoginUser');
          navigation.reset({
            index: 0,
            routes: [{ name: 'LoginUser' }],
          });
        })
        .catch(error => console.log(error.message))
      }

    const UserUpload = async (currentDate, hospital, dose, provider) => {
        const user = firebase.auth().currentUser; 
        const storageRef = firebase.database().ref(`users/` + `${user.uid}`);
        
        if (dose == '1st') {
            storageRef.update({
                '1st': {
                    provider: provider,
                    date: currentDate, 
                    hospital: hospital
                }, 
                'status': 'Half vaccinated'
            });
        } else {
            storageRef.update({
                '2nd': {
                    provider: provider,
                    date: currentDate, 
                    hospital: hospital
                }, 
                'status': 'Fully vaccinated'
            });
        };
    }

    const goToInfo = () => {
        navigation.navigate('Information')
    }

    const verify = (code) => { 
        try {
            const storageRef = firebase.database().ref(`providers/` + `${currentDate}/` + `${code}`);
            
            storageRef.on('value', (snapshot) => {
                const data = snapshot.val(); 
                var provider = data['provider'];
 
                try {
                    setProvider(provider); 
                    setDose(data.dose);
                    UserUpload(currentDate, 'TechPoint', data.dose, data.provider);

                    if (data.dose == '1st') { 
                        if (data.provider == 'Johnson & Johnson') {
                            setVacResult("Fully vaccinated")
                        } else { 
                            
                            setVacResult("Half vaccinated");
                        }
                    } else { 
                        setVacResult("Fully vaccinated");
                    }

                    setVerify(true);
                    navigation.navigate('DigitalCard', {provider: provider, dose: dose, testResult: vaccinateResult});

                } catch(error){
                    Alert.alert('Invalid code')
                }
              });
            
        } catch(error) { 
            Alert.alert(error.message); 
            setVerify(false);
        }
    } 
    if (!fontsLoaded) {
        return  ( <View style={styles.container}>
            <ActivityIndicator size="large" color="#9E9E9E"/>
          </View>);
    } else {
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
            <Pressable style={styles.button} 
                onPress={() => verify(input_text)}
            >
                <Text style={styles.buttonText}> Submit </Text>
            </Pressable>

            <Text> ---- or ---- </Text>

            <Pressable style={styles.buttonOther} onPress={() => goToInfo()}>
                <Text style={styles.buttonText}> Enter the code manually </Text>
            </Pressable>

            <Pressable style={styles.logoutButton} onPress={() => signOut()}>
                <Text style={styles.buttonText}> Log out </Text>
            </Pressable>
        </View>
    )}
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
        width: 300
    }, 

    buttonText: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
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
        width: 300
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
