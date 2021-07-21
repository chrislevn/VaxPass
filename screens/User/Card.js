import React, { Component, useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, Image } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import firebase from '../../database/firebase';

function Card({ navigation }) {
    const [image, setImage] = useState(null);

    useEffect(() => {
        (async () => {
            const user = firebase.auth().currentUser;   
            const url = await firebase.storage().ref(`users/user-${user.uid}/card-${user.uid}`).getDownloadURL(); 

            setImage(url);
            // console.log('test', url);
        })();
      }, []);

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Image
                source={{uri: image}}
                style={{ width: 200, height: 200 }}
            />
            <Button title="Next for ID" onPress={() => navigation.navigate('ID')} />
        </View>
    );
}

export default Card;