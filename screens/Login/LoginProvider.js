import React, { Component, useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert, ActivityIndicator } from 'react-native';
import firebase from '../../database/firebase';

function LoginProvider({navigation}) {
  const [email, setEmail] = useState(''); 
  const [password, setPassword] = useState(''); 
  const [referralCode, setReferralCode] = useState('');
  // const [displayName, setDisplayName] = useState('');
  const [isLoading, setLoading] = useState(false); 


  const LoginProvider = () => {
    if(email === '' && password === '') {
      Alert.alert('Enter details to signin!')
    } else {
      setLoading(true);
      firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((res) => {
        // console.log(res)
        console.log('User logged-in successfully!')

        setLoading(false);
        setEmail(''); 
        setPassword('');
        if (referralCode == '3F56AC') {
            navigation.navigate('DashboardProvider')
        } else { Alert.alert('Invalid referral code')}
      })
      .catch(error => Alert.alert(error.message))
    }
  }

  // useEffect(() => {
  //   // console.log(isLoading);
  //   if(isLoading){
  //     return(
  //       <View style={styles.preloader}>
  //         <ActivityIndicator size="large" color="#9E9E9E"/>
  //       </View>
  //     )}
  //   });

  return (
    <View style={styles.container}> 
     <TextInput
        style={styles.inputStyle}
        placeholder="Referral Code"
        value={referralCode}
        onChangeText={(val) => setReferralCode(val)}
      />
       
      <TextInput
        style={styles.inputStyle}
        placeholder="Email"
        value={email}
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
        title="Next"
        onPress={() => LoginProvider()}
      />   

      <Button 
        color="#3740FE"
        style={styles.loginText}
        onPress={() => navigation.navigate('SignUpProvider')}
        title="Create an account as a provider"
      />  
    </View>
  )};

export default LoginProvider; 

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