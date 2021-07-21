import React, { Component, useState, useEffect} from 'react';
import { StyleSheet, Text, View, Button, Alert } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import RNPickerSelect from 'react-native-picker-select';

import firebase from '../../database/firebase';

function DashboardProvider({navigation}) {
    const [currentDate, setCurrentDate] = useState('');
    // const [generatedCode, setCode] = useState(MakeID(6));
    const [dose, setDose] = useState('');
    const [provider, setProvider] = useState('');

    const DropdownDose = () => {
        return (
            <RNPickerSelect
                onValueChange={(value) => setDose(value)}
                items={[
                    { label: '1st', value: '1st' },
                    { label: '2nd', value: '2nd' },
                ]}
            />
        );
    };

    const DropdownProvider = () => {
        return (
            <RNPickerSelect
                onValueChange={(value) => setProvider(value)}
                items={[
                    { label: 'Moderna', value: 'Moderna' },
                    { label: 'Pifzer', value: 'Pifzer' },
                ]}
            />
        );
    };

    const MakeID = (length) => {
        var result           = '';
        var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        var charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) {
          result += characters.charAt(Math.floor(Math.random() * 
                    charactersLength));
       }
       return result;
    }

    const ProviderUpload = async (generatedCode, currentDate, dose, provider) => {
        const user = firebase.auth().currentUser; 

        const storageRef = firebase.database().ref(`providers/` + `${currentDate}/` + `${generatedCode}`);
        storageRef.set({
            dose: dose,
            provider: provider,
          });
    }

    
    const ProcessNextScreen = () => {
        if ((dose == '') || (provider == '')) {
            Alert.alert('Please enter dose and provider')
        } else {
        var generatedCode = MakeID(6); 
        ProviderUpload(generatedCode, currentDate, dose, provider);
        navigation.navigate('GenerateCodeScreen', {
            generatedCode: generatedCode, 
            currentDate: currentDate, 
            dose: dose, 
            provider: provider
        })}
    } 


    useEffect(() => {
        // setCode(MakeID(6));
        var date = new Date().getDate(); //Current Date
        var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        var monthName = months[new Date().getMonth()]; //Current Month
        var year = new Date().getFullYear(); //Current Year
        var hours = new Date().getHours(); //Current Hours
        var min = new Date().getMinutes(); //Current Minutes
        var sec = new Date().getSeconds(); //Current Seconds
        
        setCurrentDate(
            monthName + ' ' + date + ', ' + year 
        );
      }, []);
    
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text> {currentDate} </Text>
            <Text> Your patient info </Text>
            <Text> Provider </Text>
            <DropdownProvider/>
            <Text> Dose </Text>
            <DropdownDose/>

            <Button
                title="Generate code"
                onPress={() => ProcessNextScreen()}
            />

            <Button
                title="Logout"
                onPress={() => navigation.navigate('LoginUser')}
            />
        </View>
    );
}

export default DashboardProvider;