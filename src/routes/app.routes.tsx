import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Dashboard from '../pages/Dashboard';
import Order from '../pages/Order';
import SendOrder from '../pages/SendOrder';

export type StackParamsList = {
  Dashboard: undefined,
  Order: {
    number: number | string,
    order_id: string
  },
  SendOrder: {
    number: number | string,
    order_id: string
  }
}

const Stack = createNativeStackNavigator<StackParamsList>();

function AppRoutes() {
  return(
    <Stack.Navigator>
      <Stack.Screen name='Dashboard' component={Dashboard} options={{ headerShown: false }} />
      <Stack.Screen name='Order' component={Order} options={{ headerShown: false }} />
      <Stack.Screen name='SendOrder' component={SendOrder} options={{
        title: 'Send order',
        headerStyle: {
          backgroundColor: '#152238'
        },
        headerTintColor: '#FFF'
      }}/>
    </Stack.Navigator>
  );
}

export default AppRoutes;