// components/LoginScreen.js
import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, TextInput, Alert, Image } from 'react-native';
import { BlurView } from 'expo-blur';
import { auth } from '../firebase-config';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { globalStyles } from '../styles'; // Import global styles

const uri = 'https://i0.wp.com/colorbada.com/wp-content/uploads/2019/01/colorbada_palette_191111199813.png?w=1080&ssl=1';
const profilePicture = require('../assets/person.png');

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const handleCreateAccount = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        console.log('Account created!');
        navigation.navigate('Home');
      })
      .catch(error => {
        Alert.alert("Error", error.message);
      });
  };

  const handleSignIn = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        console.log('Signed In!');
        navigation.navigate('Home');
      })
      .catch(error => {
        Alert.alert("Error", error.message);
      });
  };

  return (
    <View style={globalStyles.container}>
      <Image source={{ uri }} style={[styles.image, StyleSheet.absoluteFill]} />
      <ScrollView contentContainerStyle={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <BlurView intensity={100}>
          <View style={styles.login}>
            <Image source={profilePicture} style={styles.profilePicture} />
            <TextInput onChangeText={setEmail} style={globalStyles.input} placeholder='Email' />
            <TextInput onChangeText={setPassword} style={globalStyles.input} placeholder='Password' secureTextEntry={true} />
            <TouchableOpacity onPress={handleSignIn} style={[globalStyles.button, {backgroundColor: '#8CB6AB90'}]}>
              <Text style={{fontSize: 17, fontWeight: '400', color: 'white'}}>
                Login
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleCreateAccount} style={[globalStyles.button, {backgroundColor: '#665A5C90'}]}>
              <Text style={{fontSize: 17, fontWeight: '400', color: 'white'}}>
                Create Account
              </Text>
            </TouchableOpacity>
          </View>
        </BlurView>
      </ScrollView>
    </View>
  );
}
// LoginScreen.js의 스타일
const styles = StyleSheet.create({
  ...globalStyles, // 글로벌 스타일 확장
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover'
  },
  login: {
    width: 300,
    height: 450,
    borderColor:'#fff',
    borderWidth: 2,
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    borderRadius: 10
  },
  profilePicture: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderColor: '#fff',
    borderWidth: 2,
    marginVertical: 10
  },
});
