import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


// Screens 
import LoginUser from './screens/Login/LoginUser'; 
import LoginProvider from './screens/Login/LoginProvider';
import DashboardUser from './screens/User/DashboardUser.js'; 
import DashboardProvider from './screens/Provider/DashboardProvider';
import SignUpUser from './screens/Signup/SignUpUser';
import GenerateCodeScreen from './screens/Provider/GenerateCodeScreen';

import DigitalCard from './screens/User/DigitalCard';
import VerificationCard from './screens/User/Verification/VerificationCard';
import VerificationID from './screens/User/Verification/VerificationID';
import Card from './screens/User/Card';
import ID from './screens/User/ID';
import Information from './screens/User/Information';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LoginUser">
        <Stack.Screen name="LoginUser" component={LoginUser} />
        <Stack.Screen name="LoginProvider" component={LoginProvider} />
        <Stack.Screen name="DashboardUser" component={DashboardUser} />
        <Stack.Screen name="DashboardProvider" component={DashboardProvider} />
        <Stack.Screen name="GenerateCodeScreen" component={GenerateCodeScreen} />
        <Stack.Screen name="SignUpUser" component={SignUpUser} />

        <Stack.Screen name="VerificationCard" title="Verification Card" component={VerificationCard} />
        <Stack.Screen name="VerificationID" title="Verification ID" component={VerificationID} />
        <Stack.Screen name="DigitalCard" title="Digital Card" component={DigitalCard} />
        <Stack.Screen name="Card" title="Card" component={Card} />
        <Stack.Screen name="ID" title="ID" component={ID} />
        <Stack.Screen name="Information" title="Information" component={Information} />
     </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;