import React, { Component, useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import firebase from '../../database/firebase';

function DashboardUser({navigation}) {
    const [uid, setUID] = useState(null); 
    const [input_text, setInput] = useState(''); 
    const [displayName, setDisplayName] = useState(''); 
    const [isVerify, setVerify] = useState(true);

    useEffect(() => {
        setDisplayName(firebase.auth().currentUser.displayName);
        setUID(firebase.auth().currentUser.uid); 
    });

    const signOut = () => {
        firebase.auth().signOut().then(() => {
          navigation.navigate('LoginUser')
        })
        .catch(error => console.log(error.message))
      }
      
    const verify = (code) => { 
        if (code == '123DFG') { 
            setVerify(true);
            navigation.navigate('DigitalCard');
        } else { 
            setVerify(false);
        }
    } 
   
    return (
    <View style={styles.container}>
        <Text style = {styles.textStyle}>
        Welcome, {displayName}
        </Text>
        <TextInput
            style={styles.input}
            onChangeText = {setInput}
            placeholder="Enter the code"
        />
        {!isVerify && <Text> Type again! </Text>}
        <Button title="Submit" onPress={() => verify(input_text)} />
        <Button title="Enter the code manually" onPress={() => navigation.navigate('Information')} />

        <Button
        color="#3740FE"
        title="Logout"
        onPress={() => signOut()}
        />
    </View>
    )
  };

export default DashboardUser; 
  
const styles = StyleSheet.create({
container: {
    flex: 1,
    display: "flex",
    justifyContent: 'center',
    alignItems: 'center',
    padding: 35,
    backgroundColor: '#fff'
},
textStyle: {
    fontSize: 15,
    marginBottom: 20
},
input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
}
});
