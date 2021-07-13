import React, { Component } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

function GenerateCodeScreen({navigation}) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text> Your code is </Text>
            <Text> 123FDGH </Text>
            <Button
                title="Redo"
                onPress={() => navigation.goBack()}
            />
        </View>
    );
}

export default GenerateCodeScreen;