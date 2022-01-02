import React from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';

const Profil = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Text>Profil Screen</Text>
      <Button title="Click Here" onPress={() => alert('Button Clicked')} />
    </View>
  );
};

export default Profil;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#8fccbbc',
  },
});
