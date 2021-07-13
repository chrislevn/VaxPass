import React, { Component } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

function LoginProvider({navigation}) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text> Login Provider </Text>
            <Button
                title="Go to Dashboard Provider"
                onPress={() => navigation.navigate('DashboardProvider')}
            />

        </View>
    );
}

export default LoginProvider;