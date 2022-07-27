import React, { useContext } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { AuthContext } from '../contexts/AuthContext';
import AppRoutes from './app.routes';
import GuestRoutes from './guest.routes';

function Routes() {

  const { isAuthenticated, loading } = useContext(AuthContext);

  if(loading) {
    return(
      <View style={{ flex: 1, backgroundColor: '#152238', justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size={60} color='#3FFFA3' />
      </View>
    )
  }

  return(
    isAuthenticated ? <AppRoutes /> : <GuestRoutes />
  );

}

export default Routes;