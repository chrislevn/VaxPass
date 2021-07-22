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
import { StyleSheet, Text, View, TextInput, Button, Pressable, Alert, ActivityIndicator } from 'react-native';

// Firebase database.
import firebase from '../../database/firebase';

// Fonts.
import {
  useFonts,
  RobotoMono_400Regular,
  RobotoMono_500Medium,
  RobotoMono_600SemiBold,
  RobotoMono_700Bold,
} from '@expo-google-fonts/roboto-mono';

/**
 * Login screen for provider.
 * @param {*} navigation props params for navigation.
 * @return {*} screen view.
 */
function LoginProvider({navigation}) {
  const [email, setEmail] = useState(''); 
  const [password, setPassword] = useState(''); 
  const [referralCode, setReferralCode] = useState('');
  const [isLoading, setLoading] = useState(false); 

  let [fontsLoaded] = useFonts({
    RobotoMono_400Regular,
    RobotoMono_500Medium,
    RobotoMono_600SemiBold,
    RobotoMono_700Bold,
  });


  /** Authenticate provider. */
  const LoginProvider = () => {
    if(email === '' && password === '') {
      Alert.alert('Enter details to signin!')
    } else {
      setLoading(true);
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then((res) => {
          console.log('User logged-in successfully!')

          setLoading(false);
          setEmail(''); 
          setPassword('');
          if (referralCode == '3F56AC') {  // CODE IS 3F56AC  
            navigation.navigate('DashboardProvider')
        } else { Alert.alert('Invalid referral code') }
      })
      .catch(error => Alert.alert(error.message))
    }
  }


  return (
    <View style={styles.container}> 
      <Text style={{ fontFamily: 'RobotoMono_700Bold', fontSize: 30 }}>Login (provider)</Text>
      <Text style={{ fontFamily: 'RobotoMono_400Regular', fontSize: 20 }}>Referral code</Text>
     <TextInput
        autoCapitalize="none"
        autoCorrect={false}
        style={styles.inputStyle}
        placeholder="Your referral code"
        value={referralCode}
        onChangeText={(val) => setReferralCode(val)}/>
      <Text style={{ fontFamily: 'RobotoMono_400Regular', fontSize: 20 }}>Email</Text>
      <TextInput
        autoCapitalize="none"
        autoCorrect={false}
        style={styles.inputStyle}
        placeholder="Your email"
        value={email}
        onChangeText={(val) => setEmail(val)}/>
      <Text style={{ fontFamily: 'RobotoMono_400Regular', fontSize: 20 }}>Password</Text>
      <TextInput
        style={styles.inputStyle}
        placeholder="Your password"
        value={password}
        onChangeText={(val) => setPassword(val)}
        maxLength={15}
        secureTextEntry={true}/>   
      <Pressable style={styles.loginProviderButton} onPress={() => LoginProvider()}>
        <Text style={styles.buttonText}> Next </Text>
      </Pressable>   
      <Text style={styles.loginText} onPress={() => navigation.navigate('SignUpProvider')}>
        Don't have account? Create an account as a provider
      </Text>
    </View>
  )
};


export default LoginProvider; 


const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: 35,
    backgroundColor: '#fff',
  },
  buttonText: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  }, 
  loginProviderButton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'black',
    borderRadius: 30, 
    margin: 5,

  },
  inputStyle: {
    width: '100%',
    marginBottom: 15,
    paddingBottom: 15,
    alignSelf: "center",
    borderColor: "#ccc",
    borderBottomWidth: 1,
  },
  loginText: {
    color: '#3740FE',
    marginTop: 25,
    textAlign: 'center',
  },
  preloader: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    }
  }
);