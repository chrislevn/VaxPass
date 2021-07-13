import React, { Component } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Screens 

function SignUpUser({ navigation }) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text> SignUp User </Text>
            <Button
                title="Next (go to Dashboard)"
                onPress={() => navigation.navigate('DashboardUser')}
            />

            <Button
                title="Login as user"
                onPress={() => navigation.navigate('LoginUser')}
            />
        </View>
    );
}

export default SignUpUser;