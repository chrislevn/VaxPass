import React, { Component, useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, Platform, Image} from 'react-native';
import * as ImagePicker from 'expo-image-picker';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import firebase from '../../../database/firebase';

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


function VerificationCard({ route, navigation }) {
    const [image, setImage] = useState(null);
    const {testResult} = route.params;

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
          if (Platform.OS !== 'web') {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
              alert('Sorry, we need camera roll permissions to make this work!');
            }
          }
        })();
      }, []);
    
      const pickImage = async (uri) => {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
    
        // console.log(result);

        if (!result.cancelled) {
          setImage(result.uri);
          uploadImage(result.uri, firebase.auth().currentUser.uid)
            .then(() => {
                console.log('it work')
            })
            .catch(error => {
                console.log('it does not work');
                console.error(error);
            })
        }
      };

    const uploadImage = async (uri, fileName) => {
        const response = await fetch(uri);
        const blob = await response.blob();
        const storageRef = firebase.storage().ref();
        const ref = storageRef.child(`users/user-${fileName}/card-${fileName}`);
        // const update = {
        //   photoURL: url,
        // };
        // console.log("Okay", user.uid, imageName);
        // console.log("test photoURL", photoURL);

        // await firebase.auth().currentUser.updateProfile(update);

        return ref.put(blob);
    }
 
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{fontFamily: 'RobotoMono_700Bold', fontSize: 30}}> Verification - Card </Text>
            <Text style={{fontFamily: 'RobotoMono_400Regular', fontSize: 20}}> Take a picture of your vaccination record </Text>
            {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
            <Button title="Pick an card image from camera roll" onPress={pickImage} />
            <Button title="Next for verification ID" onPress={() => navigation.navigate('VerificationID', {testResult: testResult})} />
        </View>
    );
}

export default VerificationCard;