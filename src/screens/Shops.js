import React, { Component } from 'react';
import { View, Text , TouchableHighlight, StyleSheet  } from 'react-native';


export default class Shops extends Component {
  static navigationOptions = {
    title: 'Shops',
    headerStyle: {
      backgroundColor: '#101357',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
      color: '#fff',
      textAlign: 'center'

    },
  };
  render() {
    return (
      <View style={styles.main}>
        <Text style={styles.title}>Sales</Text>
        <TouchableHighlight
          style={styles.button}
          underlayColor="white"
          onPress={() => this.props.navigation.navigate('ShopItem')}
        >
          <Text style={styles.buttonText}>SHOPS</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    padding: 30,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: '#101357'
  },
  title: {
    marginBottom: 20,
    fontSize: 25,
    textAlign: 'center'
  },
  buttonText: {
    fontSize: 25,
    color: '#111',
    alignSelf: 'center'
  },
  button: {
    height: 45,
    flexDirection: 'row',
    backgroundColor: 'white',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    marginTop: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  }
});