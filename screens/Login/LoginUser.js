import React, { Component } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

function LoginUser({ navigation }) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text> Login User </Text>
            <Button
                title="Next (go to Dashboard)"
                onPress={() => navigation.navigate('DashboardUser')}
            />

            <Button
                title="Create an account"
                onPress={() => navigation.navigate('SignUpUser')}
            />

            <Button
                title="Login as a provider"
                onPress={() => navigation.navigate('LoginProvider')}
            />
        </View>
    );
}

export default LoginUser;