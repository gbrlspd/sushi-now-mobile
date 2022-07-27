import React, { useContext, useState } from 'react';
import { Text,  SafeAreaView, TouchableOpacity, TextInput, StyleSheet, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackParamsList } from '../../routes/app.routes';
import { AuthContext } from '../../contexts/AuthContext';
import { api } from '../../services/api';

export default function Dashboard() {

  const { signOut } = useContext(AuthContext);
  const navigation = useNavigation<NativeStackNavigationProp<StackParamsList>>();
  const [number, setNumber] = useState('');

  async function openTable() {
    
    if(number === '') {
      return;
    }

    const res = await api.post('/orders', { table: +number, name: 'Default' });
    navigation.navigate('Order', { number: number, order_id: res.data.id });
    setNumber('');

  }


  return(
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>New order</Text>
      <TextInput style={styles.input} keyboardType='numeric' placeholder='Table number...' placeholderTextColor='#ffffff7b' value={number} onChangeText={setNumber} />
      <TouchableOpacity style={styles.button} onPress={openTable}>
        <Text style={styles.buttonText} >Open table</Text>
      </TouchableOpacity>
      <Button title='Logout' onPress={signOut} color='#FF3C00' />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 14,
    backgroundColor: '#152238'
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 18
  },
  input: {
    width: '90%',
    height: 46,
    borderRadius: 10,
    textAlign: 'center',
    backgroundColor: '#1C2E4A',
    paddingHorizontal: 8,
    color: '#FFF',
    fontSize: 16
  },
  button: {
    width: '90%',
    height: 46,
    backgroundColor: '#3FFFA3',
    borderRadius: 10,
    marginVertical: 12,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText: {
    fontSize: 16,
    color: '#152238'
  }
});