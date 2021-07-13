import React, { Component } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

function DashboardUser({navigation}) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text> Dashboard User </Text>
            <Button title="Enter the code" onPress={() => navigation.navigate('VerificationCard')} />
            <Button title="Enter the code manually" onPress={() => navigation.navigate('Information')} />
        </View>
        
    );
}

export default DashboardUser;