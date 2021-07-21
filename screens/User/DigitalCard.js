import React, { Component, useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, Share} from 'react-native';
import { Avatar, Card, Title, Paragraph } from 'react-native-paper';

import firebase from '../../database/firebase';

import QRCode from 'react-native-qrcode-svg';


function DigitalCard({ route, navigation }) {
    const {testResult} = route.params;
    const [name, setName] = useState(''); 
    const [uid, setUID] = useState('');

    const [firstProvider, setfirstProvider] = useState(''); 
    const [firstDate, setfirstDate] = useState(''); 
    const [firstClinic, setFirstClinic] = useState('');

    const [secondDoseCheck, setSecond] = useState(false); 
    const [secondProvider, setSecondProvider] = useState(''); 
    const [secondDate, setSecondDate] = useState(''); 
    const [secondClinic, setSecondClinic] = useState('');

    useEffect(() => {
        firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            setName(user.displayName);
            setUID(user.uid); 

            const storageRef = firebase.database().ref(`users/` + `${user.uid}`);
            storageRef.on('value', (snapshot) => {
                const data = snapshot.val();
   
                setfirstDate(data['1st'].date); 
                setfirstProvider(data['1st'].provider);
                setFirstClinic(data['2nd'].date);

                setSecondDate(data['2nd'].date); 
                setSecondProvider(data['2nd'].provider);
                setSecondClinic(data['2nd'].date);

                if (secondProvider != null) {
                    setSecond(true);
                }
              });
            }
        });
    })

    var userProfile = `Name: ${name} + Status: ${testResult}`    

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Card>
                <Card.Title title={name} subtitle={testResult} />
                <Card.Content>
                    <Card.Content>
                        <Title>1st Dose</Title>
                        <Paragraph>Provider: {firstProvider}</Paragraph>
                        <Paragraph>Date: {firstDate}</Paragraph>
                        <Paragraph>Clinic: {firstClinic}</Paragraph>
                    </Card.Content>
                    {secondDoseCheck && 
                        <Card.Content>
                            <Title>2st Dose</Title>
                            <Paragraph>Provider: {secondProvider}</Paragraph>
                            <Paragraph>Date: {secondDate}</Paragraph>
                            <Paragraph>Clinic: {secondClinic}</Paragraph>
                        </Card.Content>
                    }
                </Card.Content>
                <Card.Actions>
                <Button title="Next for verification" onPress={() => navigation.navigate('Card')} />
                </Card.Actions>
            </Card>

           
        </View>
    );
}

export default DigitalCard;