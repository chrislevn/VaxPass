import React, { Component, useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, Share, Pressable, ActivityIndicator} from 'react-native';
import { Avatar, Card, Title, Paragraph } from 'react-native-paper';

import firebase from '../../database/firebase';
import { FontAwesome } from '@expo/vector-icons';
import QRCode from 'react-native-qrcode-svg';

import {
    useFonts,
    RobotoMono_100Thin,
    RobotoMono_200ExtraLight,
    RobotoMono_300Light,
    RobotoMono_400Regular,
    RobotoMono_500Medium,
    RobotoMono_600SemiBold,
    RobotoMono_700Bold,
    RobotoMono_100Thin_Italic,
    RobotoMono_200ExtraLight_Italic,
    RobotoMono_300Light_Italic,
    RobotoMono_400Regular_Italic,
    RobotoMono_500Medium_Italic,
    RobotoMono_600SemiBold_Italic,
    RobotoMono_700Bold_Italic,
  } from '@expo-google-fonts/roboto-mono';

function DigitalCard({route, navigation}) {
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

    let [fontsLoaded] = useFonts({
        RobotoMono_100Thin,
        RobotoMono_200ExtraLight,
        RobotoMono_300Light,
        RobotoMono_400Regular,
        RobotoMono_500Medium,
        RobotoMono_600SemiBold,
        RobotoMono_700Bold,
        RobotoMono_100Thin_Italic,
        RobotoMono_200ExtraLight_Italic,
        RobotoMono_300Light_Italic,
        RobotoMono_400Regular_Italic,
        RobotoMono_500Medium_Italic,
        RobotoMono_600SemiBold_Italic,
        RobotoMono_700Bold_Italic,
    });

    const signOut = () => {
        firebase.auth().signOut().then(() => {

        // navigation.navigate('LoginUser');
          navigation.reset({
            index: 0,
            routes: [{ name: 'LoginUser' }],
          });
        })
        .catch(error => console.log(error.message))
      }

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
                setFirstClinic(data['1st'].hosptal);

                setSecondDate(data['2nd'].date); 
                setSecondProvider(data['2nd'].provider);
                setSecondClinic(data['2nd'].hosptal);

                if (secondProvider != null) {
                    setSecond(true);
                }
              });
            }
        }); 
    })

    var userProfile = `Name: ${name} + Status: ${testResult}`    
    if (!fontsLoaded) {
        return  ( <View style={styles.container}>
            <ActivityIndicator size="large" color="#9E9E9E"/>
          </View>);
    } else {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={styles.textTitle}>{name}</Text>
                <Pressable style={styles.editButton} onPress={() => navigation.navigate('DashboardUser')}>
                    <FontAwesome name="edit" size={30} color="black" />
                </Pressable>

                <Text style={styles.textStatus}>{testResult}</Text>
                <View style={styles.miniContainerFirst}>
                    <Title style={styles.textDose}>1st Dose</Title>
                        <Paragraph style={styles.textDetail}>Provider: {firstProvider}</Paragraph>
                        <Paragraph style={styles.textDetail}>Date: {firstDate}</Paragraph>
                        <Paragraph style={styles.textDetail}>Clinic: {firstClinic}</Paragraph>
                </View>
                {secondDoseCheck && 
                    <View style={styles.miniContainerSecond}>
                        <Title style={styles.textDose}>2st Dose</Title>
                            <Paragraph style={styles.textDetail}>Provider: {secondProvider}</Paragraph>
                            <Paragraph style={styles.textDetail}>Date: {secondDate}</Paragraph>
                            <Paragraph style={styles.textDetail}>Clinic: {secondClinic}</Paragraph>
                    </View>
                }
            <Pressable style={styles.button} onPress={() => navigation.navigate('Card')}>
                <Text style={styles.buttonText}>Next for verification</Text>
            </Pressable>
                
            <Pressable style={styles.logoutButton} onPress={() => signOut()}>
                <Text style={styles.buttonText}>Sign out</Text>
            </Pressable>
            </View>
        )};
}

export default DigitalCard;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: "flex",
        justifyContent: 'center',
        alignItems: 'center',
        padding: 35,
        backgroundColor: '#fff'
    },
    textTitle: {
        fontFamily: 'RobotoMono_700Bold',
        fontSize: 40,
        position: 'absolute',
        left: 20,
        top: 80,
    }, 
    textStatus: {
        fontFamily: 'RobotoMono_400Regular',
        fontSize: 30,
        position: 'absolute',
        left: 20,
        top: 130,
    }, 
    textDose: {
        fontFamily: 'RobotoMono_500Medium',
        fontSize: 20,
    }, 
    textDetail: {
        fontFamily: 'RobotoMono_400Regular',
        fontSize: 18,
    },
    miniContainerFirst: {
        position: 'absolute', 
        left: 10, 
        top: '25%', 
        left: 20,
    },
    miniContainerSecond: {
        position: 'absolute', 
        left: 10, 
        top: '40%', 
        left: 20,
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: 'black',
        borderRadius: 30, 
        margin: 5, 
        width: 300, 
        bottom: '30%', 
        position: 'absolute'
    }, 
    
    buttonText: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
    },
    buttonOther: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: '#38502D',
        borderRadius: 30, 
        margin: 5, 
        width: 300
    }, 
    logoutButton: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: '#5B3030',
        borderRadius: 30, 
        margin: 5, 
        width: 300, 
        bottom: '20%', 
        position: 'absolute'
    }, 
    editButton: {
        position: 'absolute', 
        right: 20, 
        top: 90,
    },
    textStyle: {
        fontFamily: 'RobotoMono_700Bold',
        fontSize: 30,
        marginBottom: 20
    },
    input: {
        height: 40,
        width: 300,
        margin: 12,
        borderWidth: 1,
        alignItems: 'center', 
        justifyContent: 'center',
        display: 'flex', 
        alignContent: 'center', 
        }
    });
