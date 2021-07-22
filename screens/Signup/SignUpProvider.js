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
import {  StyleSheet, Text, View, TextInput, Button, Pressable, Alert, ActivityIndicator } from 'react-native';

// Firebase database
import firebase from '../../database/firebase';

// Logo
import logo from '../../assets/Logo/logo.png'; 

// Fonts
import {
  useFonts,
  RobotoMono_400Regular,
  RobotoMono_500Medium,
  RobotoMono_600SemiBold,
  RobotoMono_700Bold,
} from '@expo-google-fonts/roboto-mono';


/**
 * Signup screen for provider.
 * @param {*} navigation props params for navigation.
 * @return {*} screen view.
 */
function SignUpProvider({navigation}) {
  const [email, setEmail] = useState(''); 
  const [password, setPassword] = useState(''); 
  const [displayName, setDisplayName] = useState('');
  const [referralCode, setReferralCode] = useState('');
  const [isLoading, setLoading] = useState(false); 

  let [fontsLoaded] = useFonts({
    RobotoMono_400Regular,
    RobotoMono_500Medium,
    RobotoMono_600SemiBold,
    RobotoMono_700Bold,
  });

  /** Authenticate new user */
  const registerUser = () => {
    if(email === '' && password === '') {
      Alert.alert('Enter details to signup!')
    } else {
      setLoading(true);
      firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((res) => {
        res.user.updateProfile({
          displayName: displayName,
          // photoURL: null,
          // providerData: [cardVerify, IdVerify],
          // cardVerify: cardVerify, 
          // IdVerify: IdVerify
        })
        console.log('User registered successfully!')
        setLoading(isLoading); 
        setDisplayName(''); 
        setEmail(''); 
        setPassword(''); 
        if (referralCode == '3F56AC'){
            navigation.navigate('LoginProvider');
        } else { Alert.alert('Invalid referral code')}   
      })
      .catch(error => Alert.alert(error.message))      
    }
  }


  return (
    <View style={styles.container}>  
      <Text style={{ fontFamily: 'RobotoMono_700Bold', fontSize: 30 }}>Sign-up (provider)</Text>
      <Text style={{ fontFamily: 'RobotoMono_400Regular', fontSize: 20 }}>Referral Code</Text>
      <TextInput
        style={styles.inputStyle}
        placeholder="Your code"
        value={referralCode}
        autoCapitalize = "none"
        onChangeText={(val) => setReferralCode(val)}
      /> 
      <Text style={{ fontFamily: 'RobotoMono_400Regular', fontSize: 20 }}>Name</Text>
      <TextInput
        style={styles.inputStyle}
        placeholder="Your full name"
        value={displayName}
        autoCapitalize = "none"
        onChangeText={(val) => setDisplayName(val)}
      /> 
      <Text style={{ fontFamily: 'RobotoMono_400Regular', fontSize: 20 }}>Email</Text>     
      <TextInput
        autoCapitalize="none"
        autoCorrect={false}
        style={styles.inputStyle}
        placeholder="Your email"
        value={email}
        autoCapitalize = "none"
        onChangeText={(val) => setEmail(val)}
      />
      <Text style={{ fontFamily: 'RobotoMono_400Regular', fontSize: 20 }}>Password</Text>     
      <TextInput
        style={styles.inputStyle}
        placeholder="Your password"
        value={password}
        onChangeText={(val) => setPassword(val)}
        maxLength={15}
        secureTextEntry={true}
      />   
      <Pressable style={styles.signupButton} onPress={registerUser}>
          <Text style={styles.buttonText}> Sign Up </Text>
      </Pressable>

      <Text 
        style={styles.loginText}
        onPress={() => navigation.navigate('LoginUser')}>
        Already Registered? Click here to login
      </Text>                          
    </View>
  )};


export default SignUpProvider; 
  

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: 35,
    backgroundColor: '#fff'
  },
  buttonText: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  }, 
  signupButton: {
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
  inputStyle: {
    width: '100%',
    marginBottom: 15,
    paddingBottom: 15,
    alignSelf: "center",
    borderColor: "#ccc",
    borderBottomWidth: 1
  },
  loginText: {
    color: '#3740FE',
    marginTop: 25,
    textAlign: 'center'
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