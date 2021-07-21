import React, { Component, useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, Platform, Image} from 'react-native';
import * as ImagePicker from 'expo-image-picker';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import firebase from '../../../database/firebase';

function VerificationID({ navigation }) {
    const [image, setImage] = useState(null);

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
        const ref = storageRef.child(`users/user-${fileName}/id-${fileName}`);
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
            {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
            <Button title="Pick an ID image from camera roll" onPress={pickImage} />
            <Button title="Done" onPress={() => navigation.navigate('DigitalCard')} />
        </View>
    );
}

export default VerificationID;