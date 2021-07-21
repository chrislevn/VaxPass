import React, { Component } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useEffect } from 'react/cjs/react.production.min';

function GenerateCodeScreen({route, navigation}) {
    const { generatedCode, dose, provider, currentDate } = route.params;
    // useEffect(() => {ProviderUpload()}); 

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text> Your code is </Text>
            <Text> {generatedCode} </Text>
            <Text> Current Date: {currentDate} </Text>
            <Text> Dose: {dose} </Text>
            <Text> Provider: {provider} </Text>
            <Button
                title="Redo"
                onPress={() => navigation.goBack()}
            />
        </View>
    );
}

export default GenerateCodeScreen;