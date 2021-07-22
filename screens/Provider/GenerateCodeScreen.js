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

import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, Pressable } from 'react-native';

// Fonts.
import {
    useFonts,
    RobotoMono_400Regular,
    RobotoMono_500Medium,
    RobotoMono_600SemiBold,
    RobotoMono_700Bold,
  } from '@expo-google-fonts/roboto-mono';

/**
 * Generate code screen for provider.
 * @param {*} route props params from previous screen.
 * @param {*} navigation props params for navigation.
 * @return {*} screen view.
 */
function GenerateCodeScreen({route, navigation}) {
    const { generatedCode, dose, provider, currentDate } = route.params;

    let [fontsLoaded] = useFonts({
        RobotoMono_400Regular,
        RobotoMono_500Medium,
        RobotoMono_600SemiBold,
        RobotoMono_700Bold,
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