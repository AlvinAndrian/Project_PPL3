import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Tabs from './app/navigation/Tabs';

const App = () => {
  return (
    <NavigationContainer>
      <Tabs />
    </NavigationContainer>
  );
};

export default App;
