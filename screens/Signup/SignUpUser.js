import React, { Component, useState, useEffect } from 'react';
import {  StyleSheet, Text, View, TextInput, Button, Alert, ActivityIndicator } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import firebase from '../../database/firebase';
import ID from '../User/ID';

import logo from '../../assets/Logo/logo.png'; 
// import { useFonts } from 'expo-font';
import { useFonts, Inter_900Black } from '@expo-google-fonts/inter';


// Screens 
function SignUpUser({navigation}) {
  const [email, setEmail] = useState(''); 
  const [password, setPassword] = useState(''); 
  const [displayName, setDisplayName] = useState('');
  const [cardVerify, setCardVerify] = useState(''); 
  const [IdVerify, setIdVerify] = useState(''); 
  const [isLoading, setLoading] = useState(false); 

  let [fontsLoaded] = useFonts({
    Inter_900Black,
  });


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
        navigation.navigate('LoginUser')
      })
      .catch(error => Alert.alert(error.message))      
    }
  }

    // useEffect(() => {
    // // console.log(isLoading);
    // if(isLoading){
    //   return(
    //     <View style={styles.preloader}>
    //       <ActivityIndicator size="large" color="#9E9E9E"/>
    //     </View>
    //   )}
    // });
  return (
    <View style={styles.container}>  
      <Text style={{ fontFamily: 'Inter_900Black', fontSize: 30 }}>Sign-up</Text>
      <Text style={{ fontFamily: 'Inter_900Black', fontSize: 20 }}>Referral code</Text>
      <TextInput
        style={styles.inputStyle}
        placeholder="Your full name"
        value={displayName}
        autoCapitalize = "none"
        onChangeText={(val) => setDisplayName(val)}
      /> 
      <Text style={{ fontFamily: 'Inter_900Black', fontSize: 20 }}>Email</Text>     
      <TextInput
        autoCapitalize="none"
        autoCorrect={false}
        style={styles.inputStyle}
        placeholder="Your email"
        value={email}
        autoCapitalize = "none"
        onChangeText={(val) => setEmail(val)}
      />
      <Text style={{ fontFamily: 'Inter_900Black', fontSize: 20 }}>Password</Text>     
      <TextInput
        style={styles.inputStyle}
        placeholder="Your password"
        value={password}
        onChangeText={(val) => setPassword(val)}
        maxLength={15}
        secureTextEntry={true}
      />   
      <Button
        color="#3740FE"
        title="Signup"
        onPress={() => registerUser()}
      />

      <Text 
        style={styles.loginText}
        onPress={() => navigation.navigate('LoginUser')}>
        Already Registered? Click here to login
      </Text>                          
    </View>
  )};

export default SignUpUser; 
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      padding: 35,
      backgroundColor: '#fff'
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