import React, { Component, useState, useEffect } from 'react';
import {  StyleSheet, Text, View, TextInput, Button, Alert, ActivityIndicator } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import firebase from '../../database/firebase';
import ID from '../User/ID';
import { useFonts, Inter_900Black } from '@expo-google-fonts/inter';

// Screens 
function SignUpProvider({navigation}) {
  const [email, setEmail] = useState(''); 
  const [password, setPassword] = useState(''); 
  const [displayName, setDisplayName] = useState('');
  const [referralCode, setReferralCode] = useState('');
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
        if (referralCode == '3F56AC'){
            navigation.navigate('LoginProvider')
        } else { Alert.alert('Invalid referral code')}   
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
        <TextInput
            style={styles.inputStyle}
            placeholder="Referral Code"
            value={referralCode}
            autoCapitalize = "none"
            onChangeText={(val) => setReferralCode(val)}
        />  
      <TextInput
        autoCorrect={false}
        style={styles.inputStyle}
        placeholder="Name"
        value={displayName}
        autoCapitalize = "none"
        onChangeText={(val) => setDisplayName(val)}
      />      
      <TextInput
        autoCapitalize="none"
        autoCorrect={false}
        style={styles.inputStyle}
        placeholder="Email"
        value={email}
        autoCapitalize = "none"
        onChangeText={(val) => setEmail(val)}
      />
      <TextInput
        style={styles.inputStyle}
        placeholder="Password"
        value={password}
        onChangeText={(val) => setPassword(val)}
        maxLength={15}
        secureTextEntry={true}
      />   
      <Button
        color="#3740FE"
        title="Done"
        onPress={() => registerUser()}
      />

      <Text 
        style={styles.loginText}
        onPress={() => navigation.navigate('LoginUser')}>
        Login as user
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