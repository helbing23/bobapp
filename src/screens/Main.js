import React from 'react';
import { StyleSheet, TouchableHighlight, Text, View } from 'react-native';
import firebase from 'firebase';



export default class Main extends React.Component {
  static navigationOptions = {
    title: 'Home',
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
  state = { currentUser: null }

  componentDidMount() {
    const { currentUser } = firebase.auth()
    this.setState({ currentUser })
  }

  signOutUser = async () => {
    try {
        await firebase.auth().signOut();
        navigate('Login');
    } catch (e) {
        console.log(e);
    }
}

render() {
    const { currentUser } = this.state
return (
      <View style={styles.main}>
      <Text style={styles.title}>BOB APP</Text>
      <Text style={styles.user}>
          Welcome {currentUser && currentUser.email}!
      </Text>
      <Text style={styles.buttonText} onPress={() => this.signOutUser()}>logout</Text>
      <TouchableHighlight
        style={styles.button}
        underlayColor="white"
        onPress={() => this.props.navigation.navigate('Shops')}
      >
        <Text style={styles.buttonText}>SHOPS</Text>
      </TouchableHighlight>
    </View>
    )
  }
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    padding: 30,
    flexDirection: 'column',
    backgroundColor: '#101357',
    justifyContent: 'center'
  },
  title: {
    marginBottom: 20,
    fontSize: 40,
    textAlign: 'center',
    color: '#fff',

  },
  user: {
    marginBottom: 20,
    fontSize: 20,
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