import React, { Component, useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, Image } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import firebase from '../../database/firebase';

function Card({ navigation }) {
    const [image, setImage] = useState(null);

    useEffect(() => {
        (async () => {
            const ref = firebase.storage().ref('card/test-image');
            const url = await ref.getDownloadURL();
            setImage(url);
            console.log('test', image);
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