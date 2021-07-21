import React, { Component, useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, Image } from 'react-native';

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
            // console.log('test', url);
        })();
      }, []);

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{fontFamily: 'RobotoMono_700Bold', fontSize: 30}}> Verification </Text>
            <Image
                source={{uri: image}}
                style={{ width: 200, height: 200 }}
            />
            <Button title="Next for ID" onPress={() => navigation.navigate('ID')} />
        </View>
    );
}

export default Card;