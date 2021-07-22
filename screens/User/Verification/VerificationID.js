import React, { Component, useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, Platform, Image, Pressable} from 'react-native';
import * as ImagePicker from 'expo-image-picker';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import firebase from '../../../database/firebase';

import { Ionicons, Entypo } from '@expo/vector-icons';

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

function VerificationID({ route, navigation }) {
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
          // aspect: [4, 3],
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
