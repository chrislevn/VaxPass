import React, { Component, useState, useEffect, useCallback} from 'react';
import { StyleSheet, Text, View, Button, Alert, Pressable } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import RNPickerSelect from 'react-native-picker-select';
import * as SplashScreen from 'expo-splash-screen';

import SelectDropdown from 'react-native-select-dropdown'

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

function DashboardProvider({navigation}) {
    const [currentDate, setCurrentDate] = useState('');
    // const [generatedCode, setCode] = useState(MakeID(6));
    const [dose, setDose] = useState('');
    const [provider, setProvider] = useState('');
    const [providerName, setProviderName] = useState('');
    const [clinic, setClinic] = useState('Techpoint');

    const providers = ["Moderna", "Pifzer"]; 
    const doses = ["1st", "2nd"]; 
    const [appIsReady, setAppIsReady] = useState(false);


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

    const MakeID = (length) => {
        var result           = '';
        var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        var charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) {
          result += characters.charAt(Math.floor(Math.random() * 
                    charactersLength));
       }
       return result;
    }

    const ProviderUpload = async (generatedCode, currentDate, dose, provider) => {
        const user = firebase.auth().currentUser; 

        const storageRef = firebase.database().ref(`providers/` + `${currentDate}/` + `${generatedCode}`);
        storageRef.set({
            dose: dose,
            provider: provider,
          });
    }
    
    const ProcessNextScreen = () => {
        if ((dose == '') || (provider == '')) {
            Alert.alert('Please enter dose and provider')
        } else {
        var generatedCode = MakeID(6); 
        ProviderUpload(generatedCode, currentDate, dose, provider);
        navigation.navigate('GenerateCodeScreen', {
            generatedCode: generatedCode, 
            currentDate: currentDate, 
            dose: dose, 
            provider: provider
        })}
    } 

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
                        onSelect={(selectedItem) => {
                            setProvider(selectedItem)
                        }}
                        defaultButtonText = "Select provider"
                    />
                </View>
                
                <View style={styles.miniContainer}> 
                    <Text style={{fontFamily: 'RobotoMono_600SemiBold', fontSize: 20, alignContent: 'center', textAlign: 'center'}}> Dose </Text>
                    
                    <SelectDropdown
                        data={doses}
                        onSelect={(selectedItem) => {
                            setDose(selectedItem)
                        }}
                        defaultButtonText = "Select dose"
                    />
                </View>

                <Pressable style={styles.button} onPress={() => ProcessNextScreen()}>
                    <Text style={styles.buttonText}>Generate code</Text>
                </Pressable>

                <Pressable
                    onPress={() => 
                    navigation.reset({
                        index: 0,
                        routes: [{ name: 'LoginUser' }],
                    })
                    // navigation.navigate('LoginUser')
                }
                    style={styles.logoutButton}>
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