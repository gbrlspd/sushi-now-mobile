import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import { AuthContext } from '../../contexts/AuthContext';

export default function SignIn() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signIn, loadingAuth } = useContext(AuthContext);

  async function handleLogin() {

    if(email === '' || password === '') {
      return;
    }

    await signIn({ email, password });

  }

  return(
    <View style={styles.container}>

      <View style={styles.logo}>
        <Image source={require('../../assets/nigiri.png')} style={styles.logoImg} />
        <Text style={styles.firstText}>Sushi<Text style={styles.secondText}>Now</Text></Text>
      </View>

      <View style={styles.inputContainer}>
        <TextInput placeholder='Enter your email...' placeholderTextColor='#ffffff7b' style={styles.input} value={email} onChangeText={setEmail} />
        <TextInput placeholder='Enter your password...' placeholderTextColor='#ffffff7b' style={styles.input} secureTextEntry={true} onChangeText={setPassword} />
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          { loadingAuth
          ? (<ActivityIndicator size={26} color='#FFF' />)
          : (<Text style={styles.buttonText}>Login</Text>) }
        </TouchableOpacity>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#152238'
  },
  logoImg: {
    width: 90,
    height: 90,
    marginRight: 10
  },
  firstText: {
    fontSize: 46,
    color: '#FFF'
  },
  secondText: {
    color: '#FF3C00',
    fontWeight: 'bold'
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    color: '#FFF',
    marginBottom: 12
  },
  inputContainer: {
    width: '90%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  input: {
    width: '90%',
    height: 46,
    backgroundColor: '#1C2E4A', 
    borderRadius: 10,
    marginBottom: 12,
    paddingHorizontal: 10,
    color: '#FFF'
  },
  button: {
    width: '90%',
    height: 46,
    backgroundColor: '#FF3C00',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonText: {
    color: '#FFF'
  }
});