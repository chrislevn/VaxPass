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

import React, { Component, useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, Platform, Image, Pressable} from 'react-native';
import * as ImagePicker from 'expo-image-picker';

// Firebase database
import firebase from '../../../database/firebase';

// Icons
import { Entypo } from '@expo/vector-icons';

// Fonts
import {
  useFonts,
  RobotoMono_400Regular,
  RobotoMono_500Medium,
  RobotoMono_600SemiBold,
  RobotoMono_700Bold,
} from '@expo-google-fonts/roboto-mono';


/**
 * Verification ID screen for user.
 * @param {*} {navigation} props params for navigation.
 * @return {*} screen view.
 */
function VerificationID({ route, navigation }) {
    const [image, setImage] = useState(null);
    const {testResult} = route.params;

    let [fontsLoaded] = useFonts({
      RobotoMono_400Regular,
      RobotoMono_500Medium,
      RobotoMono_600SemiBold,
      RobotoMono_700Bold,
  });

    /** Prepare for requesting image */
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
      

      /**
       * Choose image
       * @param {string} uri image url
       */
      const pickImage = async (uri) => {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          // aspect: [4, 3],
          quality: 1,
        });
    
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

    /**
     * Upload image to firebase storage
     * @param {string} uri image's uri
     * @param {string} fileName image placeholder filename
     * @return {blob} image file blob
     */
    const uploadImage = async (uri, fileName) => {
        const response = await fetch(uri);
        const blob = await response.blob();
        const storageRef = firebase.storage().ref();
        const ref = storageRef.child(`users/user-${fileName}/id-${fileName}`);

        return ref.put(blob);
    }
 

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={styles.header}> Verification - ID </Text>
            <Text style={styles.headerSubtitle}> Upload a picture of your ID </Text>
            {image && <Image source={{ uri: image }} style={{ width: 300, height: 300 }} />}
            {!image && 
            <Pressable onPress={() => pickImage()}> 
              <Entypo name="upload-to-cloud" size={100} color="black" />
            </Pressable>}

            {image && <Pressable style={styles.buttonOther} onPress={() => navigation.navigate('DigitalCard', {testResult: testResult})}> 
              <Text style={styles.buttonText}> Done </Text>
            </Pressable>}
        </View>
    );
}


export default VerificationID;


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
      margin: 5
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
