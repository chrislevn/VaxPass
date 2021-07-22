// Copyright 2021 Christopher Le

// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at

//     http://www.apache.org/licenses/LICENSE-2.0

// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Alert, Pressable, ActivityIndicator } from 'react-native';

// Firebase databse.
import firebase from '../../database/firebase';

// Custom Fonts.
import {
    useFonts,
    RobotoMono_400Regular,
    RobotoMono_500Medium,
    RobotoMono_600SemiBold,
    RobotoMono_700Bold,
  } from '@expo-google-fonts/roboto-mono';

  
/**
 * Dashboard screen for user.
 * @param {*} {navigation} props params for navigation.
 * @return {*} screen view.
 */
function DashboardUser({navigation}) {
    const [inputText, setInput] = useState(''); 
    const [currentDate, setCurrentDate] = useState('');
    const [displayName, setDisplayName] = useState(''); 
    const [dose, setDose] = useState(''); 
    const [vaccinateResult, setVacResult] = useState('');
    const [isVerify, setVerify] = useState(true);

    let [fontsLoaded] = useFonts({
        RobotoMono_400Regular,
        RobotoMono_500Medium,
        RobotoMono_600SemiBold,
        RobotoMono_700Bold,
    });


    /** Update user's display name when loaded. */
    const updateUser = () => {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
              setDisplayName(user.displayName);
            }
        });
    }


    /** Signout and go to login screen. */
    const signOut = () => {
        firebase.auth().signOut().then(() => {

            // Reset route
            navigation.reset({
                index: 0,
                routes: [{ name: 'LoginUser' }],
            });
        })
        .catch(error => console.log(error.message))
      }


    /**
     * Upload user details info to firebase database.
     * @param {string} currentDate current date of getting the vaccination.
     * @param {string} hospital the clinic where users got their vaccine.
     * @param {string} dose  the dose's option (1st or 2nd).
     * @param {string} provider  the vaccine's provider.
     */
    const UserUpload = async (currentDate, hospital, dose, provider) => {
        const user = firebase.auth().currentUser; 
        const storageRef = firebase.database().ref().child(`users/` + `${user.uid}`);
        
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


    /** Process to Information screen. */
    const goToInfo = () => {
        navigation.navigate('Information')
    }

    /**
     * Get user vaccine info from the Firebase
     * @param {*} code code from provider
     */
    const getUserInfo = (code) => {
        /** Storage reference from Firebase. */
        const storageRef = firebase.database().ref().child(`providers/` + `${currentDate}/` + `${code}`);

        storageRef.on('value', (snapshot) => {
            const data = snapshot.val(); 

            try {
                var provider = data.provider;
                setDose(data.dose);
                UserUpload(currentDate, 'TechPoint', data.dose, data.provider);

                if (data.dose == '1st') { 
                    if (provider == 'Johnson & Johnson') {
                        setVacResult("Fully vaccinated")
                    } else { setVacResult("Half vaccinated"); }
                } else { setVacResult("Fully vaccinated"); }

                setVerify(true);
                navigation.navigate('DigitalCard', {provider: provider, 
                                                    dose: dose, 
                                                    testResult: vaccinateResult});
            } catch(error) { Alert.alert('Invalid code', error.message) }
        });
    }

    
    /**
     * Verify vaccine code and process to next screen.
     * @param {*} code the code provided by vaccine's hospital.
     */
    const verify = (code) => { 
        (async () => {
            try {
                getUserInfo(code);
            } catch(error) { 
                Alert.alert(error.message); 
                setVerify(false);
            }
        })();
    } 

   
    /** Update current time and user info. */
    useEffect(() => {
        var date = new Date().getDate(); //Current Date
        var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]; // Month in letters
        var monthName = months[new Date().getMonth()]; //Current Month
        var year = new Date().getFullYear(); //Current Year
        
        setCurrentDate( monthName + ' ' + date + ', ' + year );
        updateUser();
    });


    if (!fontsLoaded) {
        // Return a loading screen if font is not loaded
        return  ( 
            <View style={styles.container}>
                <ActivityIndicator size="large" color="#9E9E9E"/>
            </View>);
    } else {
        return (
        <View style={styles.container}>
            <Text style = {styles.textStyle}> Welcome, {displayName} </Text>
            <TextInput
                style={styles.input}
                onChangeText = {setInput}
                placeholder="Enter the code"/>
            {!isVerify && <Text> Type again! </Text>}
            <Pressable 
                style={styles.button} 
                onPress={() => verify(inputText)}>
                <Text style={styles.buttonText}> Submit </Text>
            </Pressable>
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
        backgroundColor: '#fff',
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
        width: 300,
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
        width: 300,
    }, 

    textStyle: {
        fontFamily: 'RobotoMono_700Bold',
        fontSize: 30,
        marginBottom: 20,
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
    }
);
