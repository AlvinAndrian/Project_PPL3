import React from 'react';
import { StyleSheet, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ListVideoRiding from '../components/ListVideoRiding'
import ListTipsRiding from '../components/ListTipsRiding'

const RootStack = createNativeStackNavigator();

const Safety = () => {
  return (
    <View style={styles.page}>
      <RootStack.Navigator >
        <RootStack.Screen
          name="ListVideoRiding"
          component={ListVideoRiding}
          options={{ headerShown: false }}
        />
        <RootStack.Screen
          name="ListTipsRiding"
          component={ListTipsRiding}
          options={{ headerShown: false }}
        />
      </RootStack.Navigator>
    </View>
  );
};

export default Safety;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: "#ffffff"
  }
});