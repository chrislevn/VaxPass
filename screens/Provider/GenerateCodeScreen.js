import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, Pressable } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useEffect } from 'react/cjs/react.production.min';

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

function GenerateCodeScreen({route, navigation}) {
    const { generatedCode, dose, provider, currentDate } = route.params;
    // useEffect(() => {ProviderUpload()}); 

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

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={styles.headerText}> Your code is </Text>
            <Text style={styles.code}> {generatedCode} </Text>
            <View style={styles.info}> 
                <Text style={{fontFamily: 'RobotoMono_400Regular', fontSize: 20}}> Current Date: {currentDate} </Text>
                <Text style={{fontFamily: 'RobotoMono_400Regular', fontSize: 20}}> Dose: {dose} </Text>
                <Text style={{fontFamily: 'RobotoMono_400Regular', fontSize: 20}}> Provider: {provider} </Text>
            </View>
            <Pressable style={styles.button} onPress={() => navigation.goBack()}>
                <Text style={styles.buttonText}>Redo</Text>
            </Pressable>
        </View>
    );
}

export default GenerateCodeScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      padding: 35,
      backgroundColor: '#fff'
    },
    headerText: {
        textAlign: 'center', 
        alignContent: 'center',
        alignItems: 'center',
        fontFamily: 'RobotoMono_700Bold', 
        fontSize: 30, 
        position: 'absolute', 
        top: '30%',
    },
    code: {
        position: 'absolute',
        fontFamily: 'RobotoMono_700Bold', 
        fontSize: 70, 
        textAlign: 'center', 
        top: '45%'
    },
    info: {
        position: 'absolute',
        bottom: 280
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
      bottom: 80, 
      position: 'absolute'
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
        margin: 5
  
      },
    inputStyle: {
      width: '100%',
      marginBottom: 15,
      paddingBottom: 15,
      alignSelf: "center",
      borderColor: "#ccc",
      borderBottomWidth: 1
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