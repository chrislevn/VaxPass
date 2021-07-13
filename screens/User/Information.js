import React, { Component, useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, TextInput, Platform } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import DateTimePicker from '@react-native-community/datetimepicker';
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

function Information({navigation}) {
    const [text, setText] = useState('');
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text> Vaccination Provider </Text>
            <DropdownProvider />
            <Text> 1st Dose </Text>
            <TextInput
                style={{height: 40}}
                placeholder="Your clinic's name"
                onChangeText={text => console.log(text)}
                defaultValue={text}
            />

            <TextInput
                style={{height: 40}}
                placeholder="Date"
                onChangeText={text => console.log(text)}
                defaultValue={text}
            />      
            <Text> 2nd Dose (optional) </Text>
            <TextInput
                style={{height: 40}}
                placeholder="Your clinic's name"
                onChangeText={text => console.log(text)}
                defaultValue={text}
            />

            <TextInput
                style={{height: 40}}
                placeholder="Date"
                onChangeText={text => console.log(text)}
                defaultValue={text}
            />   

            <Button title="Next" onPress={() => navigation.navigate('VerificationCard')} />
            <Button title="Logout" onPress={() => navigation.navigate('LoginUser')} />
           
        </View>
        
    );
}

export default Information;