import React from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';

const Feed = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Text>Feed Screen</Text>
      <Button title="Click Here" onPress={() => alert('Button Clicked')} />
    </View>
  );
};

export default Feed;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#8fccbbc',
  },
});
