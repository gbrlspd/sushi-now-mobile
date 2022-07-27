import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackParamsList } from '../../routes/app.routes';
import { api } from '../../services/api';

type RouteDetailParams = {
  SendOrder: {
    number: string | number,
    order_id: string
  }
}

type SendOrderRouteProp = RouteProp<RouteDetailParams, 'SendOrder'>

export default function SendOrder() {

  const route = useRoute<SendOrderRouteProp>();
  const navigation = useNavigation<NativeStackNavigationProp<StackParamsList>>();

  async function handleSendOrder() {
    try {
      await api.put('/orders', { order_id: route.params?.order_id });
      navigation.popToTop();
    } catch(err) {
      console.log(err);
    }
  }

  return(
    <View style={styles.container}>
      <Text style={styles.alert}>Do you want to send this order?</Text>
      <Text style={styles.title}>Table: {route.params?.number}</Text>
      <TouchableOpacity style={styles.button} onPress={handleSendOrder}>
        <Text style={styles.buttonText}>Send order!</Text>
        <Feather name='send' size={20} color='#1C2E4A' />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#152238',
    paddingVertical: '5%',
    paddingHorizontal: '4%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  alert: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 12
  },
  title: {
    fontSize: 30,
    color: '#FFF',
    marginBottom: 12
  },
  button: {
    backgroundColor: '#3FFFA3',
    flexDirection: 'row',
    borderRadius: 10,
    width: '65%',
    height: 46,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonText: {
    fontSize: 16,
    marginRight: 4,
    color: '#152238'
  }
});