import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, TextInput, Button, Alert, Image } from 'react-native';
import { BlurView } from 'expo-blur';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';

const uri = 'https://ak.picdn.net/shutterstock/videos/1060308725/thumb/1.jpg';
const profilePicture = 'https://randomuser.me/api/portraits/men/34.jpg';

const auth = getAuth();  // Ensure that Firebase is already initialized in another file

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const handleCreateAccount = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log('Account created!');
        navigation.navigate('Home');
      })
      .catch(error => {
        Alert.alert("Error", error.message);
      });
  };

  const handleSignIn = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log('Signed In!');
        navigation.navigate('Home');
      })
      .catch(error => {
        Alert.alert("Error", error.message);
      });
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri }} style={[styles.image, StyleSheet.absoluteFill]} />
      <ScrollView contentContainerStyle={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <BlurView intensity={100}>
          <View style={styles.login}>
            <Image source={{ uri: profilePicture }} style={styles.profilePicture} />
            <TextInput onChangeText={setEmail} style={styles.input} placeholder='Email' />
            <TextInput onChangeText={setPassword} style={styles.input} placeholder='Password' secureTextEntry={true} />
            <Button title="Login" onPress={handleSignIn} />
            <Button title="Create Account" onPress={handleCreateAccount} />
          </View>
        </BlurView>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: '100',
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
  input: {
    width: 250,
    height: 40,
    borderColor: '#fff',
    borderWidth: 2,
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
    backgroundColor: '#ffffff90',
    marginBottom: 20
  }
});
