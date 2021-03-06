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
import { StyleSheet, Text, View, Button, Image, Pressable } from 'react-native';

// Firebase database.
import firebase from '../../database/firebase';

// Crypto. 
import cryptoProcess from '../../crypto/crypto';
import * as Crypto from 'expo-crypto';


/**
 * Screen to show ID of user
 * @param {*} navigation props params for navigation
 * @return {*} screen view
 */
function ID({ navigation }) {
    const [image, setImage] = useState(null);

    /** Get user info */
    useEffect(() => {
        (async () => {
            const user = firebase.auth().currentUser;   
            const digest = await Crypto.digestStringAsync(
                Crypto.CryptoDigestAlgorithm.SHA256,
                user.uid
            );
            const url = await firebase.storage().ref(`users/user-${digest}/id-${digest}`).getDownloadURL(); 
            
            setImage(url);
            }
        )();
      }, []);
    

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Image
                source={{uri: image}}
                style={{ width: 300, height: 300 }}/>
            <Pressable style={styles.button} onPress={() => navigation.navigate('DigitalCard')}> 
                <Text style={styles.buttonText}> Done</Text>
            </Pressable>
        </View>
    );
}


export default ID;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: "flex",
        justifyContent: 'center',
        alignItems: 'center',
        padding: 35,
        backgroundColor: '#fff',
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
        width: 300,
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
        margin: 5,
    }, 
  
    textStyle: {
        fontFamily: 'RobotoMono_700Bold',
        fontSize: 30,
        marginBottom: 20,
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
  