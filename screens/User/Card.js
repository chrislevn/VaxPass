import React, { Component, useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, Image, Pressable } from 'react-native';

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

function Card({navigation }) {
    const [image, setImage] = useState(null);
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
        (async () => {
            const user = firebase.auth().currentUser;   
            const url = await firebase.storage().ref(`users/user-${user.uid}/card-${user.uid}`).getDownloadURL(); 

            setImage(url);
        })();
      }, []);

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Image
                source={{uri: image}}
                style={{ width: 300, height: 300 }}
            />
            <Pressable style={styles.button} onPress={() => navigation.navigate('ID')}> 
                <Text style={styles.buttonText}> Next for ID </Text>
            </Pressable>
        </View>
    );
}

export default Card;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: "flex",
        justifyContent: 'center',
        alignItems: 'center',
        padding: 35,
        backgroundColor: '#fff'
    },
  
    header: {
      position: 'absolute',
      left: 0,
      top: 80,
      fontFamily: 'RobotoMono_700Bold', 
      fontSize: 30,
    },
  
    headerSubtitle: {
      position: 'absolute',
      left: 10,
      top: 130,
      alignContent: 'flex-start',
      fontFamily: 'RobotoMono_400Regular', 
      fontSize: 20,
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
        position: 'absolute', 
        bottom: 100, 
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
        position: 'absolute',
        bottom: 70,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        elevation: 3,
        backgroundColor: '#38502D',
        borderRadius: 30, 
        margin: 5
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
        margin: 5
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
  