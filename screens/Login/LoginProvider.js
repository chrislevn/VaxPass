import React, { Component, useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Pressable, Alert, ActivityIndicator } from 'react-native';
import firebase from '../../database/firebase';

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


function LoginProvider({navigation}) {
  const [email, setEmail] = useState(''); 
  const [password, setPassword] = useState(''); 
  const [referralCode, setReferralCode] = useState('');
  // const [displayName, setDisplayName] = useState('');
  const [isLoading, setLoading] = useState(false); 

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
      <Text style={{ fontFamily: 'RobotoMono_700Bold', fontSize: 30 }}>Login (provider)</Text>
      <Text style={{ fontFamily: 'RobotoMono_400Regular', fontSize: 20 }}>Referral code</Text>
     <TextInput
        autoCapitalize="none"
        autoCorrect={false}
        style={styles.inputStyle}
        placeholder="Your referral code"
        value={referralCode}
        onChangeText={(val) => setReferralCode(val)}
      />
       
       <Text style={{ fontFamily: 'RobotoMono_400Regular', fontSize: 20 }}>Email</Text>
      <TextInput
        autoCapitalize="none"
        autoCorrect={false}
        style={styles.inputStyle}
        placeholder="Your email"
        value={email}
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
      <Pressable style={styles.loginProviderButton} onPress={() => LoginProvider()}>
        <Text style={styles.buttonText}> Next </Text>
      </Pressable>   

      <Text style={styles.loginText} onPress={() => navigation.navigate('SignUpProvider')}>
        Don't have account? Create an account as a provider
      </Text>
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