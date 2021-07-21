import React, { Component, useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Pressable,  Alert, ActivityIndicator, Image } from 'react-native';
import firebase from '../../database/firebase';

import logo from '../../assets/Logo/logo.png'; 
// import { useFonts } from 'expo-font';

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

function LoginUser({navigation}) {
  const [email, setEmail] = useState(''); 
  const [password, setPassword] = useState(''); 
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


  const userLogin = () => {
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
        navigation.reset({
          index: 0,
          routes: [{ name: 'DashboardUser' }],
        });
      })
      .catch(error => Alert.alert(error.message))
    }
  }

  return (
    <View style={styles.container}> 
        <View>
          <Image
              source={logo}
              style={{  }}
            />
        </View> 
      
      <Text style={{ fontFamily: 'RobotoMono_700Bold', fontSize: 30 }}>Log-in</Text>
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
        placeholder="Password"
        value={password}
        onChangeText={(val) => setPassword(val)}
        maxLength={15}
        secureTextEntry={true}
      />   
      <Pressable style={styles.next} onPress={() => userLogin()}>  
        <Text style={styles.buttonText}> Next </Text>
      </Pressable> 

      <Text> ------ or ------</Text>

      <Pressable
        style={styles.signUp}
        onPress={() => navigation.navigate('SignUpUser')}>
          <Text style={styles.buttonText}> Create an account </Text>
      </Pressable>

      <Pressable style={styles.loginProvider} onPress={() => navigation.navigate('LoginProvider')}>
        <Text style={styles.buttonText}> Login as provider </Text>
      </Pressable> 

    </View>
  )};

export default LoginUser; 

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
  loginProvider: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: '#245842',
    borderRadius: 30, 
    margin: 5
  }, 
  signUp: {
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
  next: {
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