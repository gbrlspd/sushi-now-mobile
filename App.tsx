import { View, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from './src/contexts/AuthContext';
import Routes from './src/routes';

export default function App() {
  return (
    <NavigationContainer>
      <AuthProvider>
        <StatusBar backgroundColor='#152238' barStyle='light-content' translucent={false} />
        <Routes />
      </AuthProvider>
    </NavigationContainer>
  );
}
