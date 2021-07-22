// Copyright 2021 Christopher Le

// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at

//     http://www.apache.org/licenses/LICENSE-2.0

// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import { StatusBar } from 'expo-status-bar';
import React from 'react';
import 'react-native-gesture-handler';
import { StyleSheet, Text, View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Screens 
import LoginUser from './screens/Login/LoginUser'; 
import LoginProvider from './screens/Login/LoginProvider';
import DashboardUser from './screens/User/DashboardUser.js'; 
import DashboardProvider from './screens/Provider/DashboardProvider';
import SignUpUser from './screens/Signup/SignUpUser';
import SignUpProvider from './screens/Signup/SignUpProvider';
import GenerateCodeScreen from './screens/Provider/GenerateCodeScreen';

import DigitalCard from './screens/User/DigitalCard';
import VerificationCard from './screens/User/Verification/VerificationCard';
import VerificationID from './screens/User/Verification/VerificationID';
import Card from './screens/User/Card';
import ID from './screens/User/ID';
import Information from './screens/User/Information';

const Stack = createStackNavigator();

const Auth = () => {
  // Stack Navigator for Login and Sign up Screen
  return (
    <Stack.Navigator initialRouteName="LoginUser">
      <Stack.Screen
        name="LoginUser"
        component={LoginUser}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SignUpUser"
        component={SignUpUser}
        options={{
          title: 'Register', //Set Header Title
          headerStyle: {
            backgroundColor: '#307ecc', //Set Header color
          },
          headerTintColor: '#fff', //Set Header text color
          headerTitleStyle: {
            fontWeight: 'bold', //Set Header text style
          },
        }}
      />
    </Stack.Navigator>
  );
};

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="DashboardUser">
        <Stack.Screen name="LoginUser" component={LoginUser} options={{headerShown: false}} />
        <Stack.Screen name="LoginProvider" component={LoginProvider} options={{headerShown: false}}/>
        <Stack.Screen name="DashboardUser" component={DashboardUser} options={{headerShown: false}}/>
        <Stack.Screen name="DashboardProvider" component={DashboardProvider} options={{headerShown: false}}/>
        <Stack.Screen name="GenerateCodeScreen" component={GenerateCodeScreen} options={{headerShown: false}}/>
        <Stack.Screen name="SignUpUser" component={SignUpUser} options={{headerShown: false}}/>
        <Stack.Screen name="SignUpProvider" component={SignUpProvider} options={{headerShown: false}}/>
        <Stack.Screen name="Auth" component={Auth} />

        <Stack.Screen name="VerificationCard" title="Verification Card" component={VerificationCard}/>
        <Stack.Screen name="VerificationID" title="Verification ID" component={VerificationID}/>
        <Stack.Screen name="DigitalCard" title="Digital Card" component={DigitalCard} options={{headerShown: false}}/>
        <Stack.Screen name="Card" component={Card}/>
        <Stack.Screen name="ID" component={ID} />
        <Stack.Screen name="Information" title="Information" component={Information} options={{headerShown: false}}/>
     </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;