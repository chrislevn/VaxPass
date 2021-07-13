import React, { Component, useState, useEffect} from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import RNPickerSelect from 'react-native-picker-select';

const DropdownProvider = () => {
    return (
        <RNPickerSelect
            onValueChange={(value) => console.log(value)}
            items={[
                { label: 'Moderna', value: 'Moderna' },
                { label: 'Pifzer', value: 'Pifzer' },
            ]}
        />
    );
};

const DropdownDose = () => {
    return (
        <RNPickerSelect
            onValueChange={(value) => console.log(value)}
            items={[
                { label: '1st', value: '1st' },
                { label: '2nd', value: '2nd' },
            ]}
        />
    );
};

function DashboardProvider({navigation}) {
    const [currentDate, setCurrentDate] = useState('');

    useEffect(() => {
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
                onPress={() => navigation.navigate('GenerateCodeScreen')}
            />

            <Button
                title="Logout"
                onPress={() => navigation.navigate('LoginUser')}
            />
        </View>
    );
}

export default DashboardProvider;