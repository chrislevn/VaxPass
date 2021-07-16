import React, { Component } from 'react';
import { StyleSheet, Text, View, Button} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

function DigitalCard({ navigation }) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

            <Button title="Next for verification" onPress={() => navigation.navigate('Card')} />
        </View>
    );
}

export default DigitalCard;