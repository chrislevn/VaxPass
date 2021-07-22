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

import React, { Component, useState, useEffect, useCallback} from 'react';
import { StyleSheet, Text, View, Button, Alert, Pressable } from 'react-native';

// Dropdown.
import SelectDropdown from 'react-native-select-dropdown'

// Firebase databse.
import firebase from '../../database/firebase';

// Fonts.
import {
    useFonts,
    RobotoMono_400Regular,
    RobotoMono_500Medium,
    RobotoMono_600SemiBold,
    RobotoMono_700Bold,
  } from '@expo-google-fonts/roboto-mono';


/**
 * Dashboard screen for provider.
 * @param {*} navigation props params for navigation.
 * @return {*} screen view.
 */
function DashboardProvider({navigation}) {
    const [currentDate, setCurrentDate] = useState('');
    const [dose, setDose] = useState('');
    const [provider, setProvider] = useState('');
    const [providerName, setProviderName] = useState('');
    const [clinic, setClinic] = useState('Techpoint');
    const providers = ["Moderna", "Pifzer"]; 
    const doses = ["1st", "2nd"]; 

    let [fontsLoaded] = useFonts({
        RobotoMono_400Regular,
        RobotoMono_500Medium,
        RobotoMono_600SemiBold,
        RobotoMono_700Bold,
    });


    /**
     * Generate random code with specific length.
     * @param {number} length length of the code
     * @return {string} generated code
     */
    const makeID = (length) => {
        var result           = '';
        var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        var charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) {
          result += characters.charAt(Math.floor(Math.random() * 
                    charactersLength));
       }
       return result;
    }


    /**
     * Upload provider info to Firebase. 
     * @param {*} generatedCode generated code.
     * @param {*} currentDate current date of getting the vaccine. 
     * @param {*} dose type of dose (1st or 2nd). 
     * @param {*} provider name of the clinic. 
     */
    const ProviderUpload = async (generatedCode, currentDate, dose, provider) => {
        const storageRef = firebase.database().ref(`providers/` + `${currentDate}/` + `${generatedCode}`);

        storageRef.set({
            dose: dose,
            provider: provider,
        });
    }
    
    /**
     * Upload provider info and process to code screen
     */
    const ProcessNextScreen = () => {
        if ((dose == '') || (provider == '')) {
            Alert.alert('Please enter dose and provider')
        } else {
        var generatedCode = makeID(6); 
        ProviderUpload(generatedCode, currentDate, dose, provider);
        navigation.navigate('GenerateCodeScreen', {
            generatedCode: generatedCode, 
            currentDate: currentDate, 
            dose: dose, 
            provider: provider
        })}
    } 

    /** Get current date */
    useEffect(() => {
        const user = firebase.auth().currentUser; 
        setProviderName(user.displayName);

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
      }, []);
    

      
    if (!fontsLoaded) {
        return  (<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}></View>);
    } else {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={styles.headerText}> {currentDate} </Text>
                <Text style={styles.headerTextName}> Name: {providerName}</Text>
                <Text style={styles.headerTextClinic}> Clinic: {clinic}</Text>
                <Text style={styles.headerInfo}> Your patient info </Text>

                <View style={styles.miniContainer}> 
                    <Text style={{fontFamily: 'RobotoMono_600SemiBold', fontSize: 20, alignContent: 'center', textAlign: 'center'}}> Provider </Text>
                    <SelectDropdown
                        data={providers}
                        onSelect={(selectedItem) => { setProvider(selectedItem) }}
                        defaultButtonText = "Select provider"/>
                </View>
                <View style={styles.miniContainer}> 
                    <Text style={{fontFamily: 'RobotoMono_600SemiBold', fontSize: 20, alignContent: 'center', textAlign: 'center'}}> Dose </Text>
                    <SelectDropdown
                        data={doses}
                        onSelect={(selectedItem) => { setDose(selectedItem) }}
                        defaultButtonText = "Select dose"
                    />
                </View>

                <Pressable style={styles.button} onPress={() => ProcessNextScreen()}>
                    <Text style={styles.buttonText}>Generate code</Text>
                </Pressable>

                <Pressable
                    style={styles.logoutButton}
                    onPress={() => 
                    navigation.reset({
                        index: 0,
                        routes: [{ name: 'LoginUser' }],
                    })}>
                        <Text style={styles.buttonText}>Logout</Text>
                </Pressable>
            </View>
    )};
}


export default DashboardProvider;


const styles = StyleSheet.create({
    container: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      padding: 35,
      backgroundColor: '#fff'
    },
    miniContainer: {
        padding: 35
    },
    buttonText: {
      fontSize: 16,
      lineHeight: 21,
      fontWeight: 'bold',
      letterSpacing: 0.25,
      color: 'white',
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
        bottom: 150

    },
    logoutButton: {
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
        bottom: 70
  
      },
    inputStyle: {
      width: '100%',
      marginBottom: 15,
      paddingBottom: 15,
      alignSelf: "center",
      borderColor: "#ccc",
      borderBottomWidth: 1
    },
    headerText: {
        marginTop: 25,
        textAlign: 'left', 
        fontFamily: 'RobotoMono_700Bold', 
        fontSize: 30, 
        position: 'absolute', 
        top: '10%',
        left: 0, 
    },
    headerTextName: {
        marginTop: 25,
        textAlign: 'left', 
        fontFamily: 'RobotoMono_600SemiBold', 
        fontSize: 20, 
        position: 'absolute', 
        top: '15%',
        left: 10, 
    },
    headerTextClinic: {
        marginTop: 25,
        textAlign: 'left', 
        fontFamily: 'RobotoMono_600SemiBold', 
        fontSize: 20, 
        position: 'absolute', 
        top: '18%',
        left: 10, 
    },
    headerInfo: {
        color: '#3740FE',
        marginTop: 25,
        textAlign: 'left', 
        fontFamily: 'RobotoMono_400Regular', 
        fontSize: 20,
        position: 'absolute', 
        top: '25%',
        left: 10, 
    },
    preloader: {
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      position: 'absolute',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#fff'
    }
  });