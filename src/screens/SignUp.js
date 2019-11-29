import React from 'react';
import { StyleSheet, Text, TextInput,TouchableHighlight, View, Button } from 'react-native';
import firebase from 'firebase';



export default class SignUp extends React.Component {
  static navigationOptions = {
    title: 'Sign Up',
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
  state = { email: '', password: '', errorMessage: null }

  handleSignUp = () => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(() => this.props.navigation.navigate('Main'))
      .catch(error => this.setState({ errorMessage: error.message }))
  }

render() {
    return (
      <View style={styles.container}>
        {this.state.errorMessage &&
          <Text style={{ color: 'red' }}>
            {this.state.errorMessage}
          </Text>}
        <TextInput
          placeholder="Email"
          autoCapitalize="none"
          style={styles.textInput}
          onChangeText={email => this.setState({ email })}
          value={this.state.email}
        />
        <TextInput
          secureTextEntry
          placeholder="Password"
          autoCapitalize="none"
          style={styles.textInput}
          onChangeText={password => this.setState({ password })}
          value={this.state.password}
        />
        <TouchableHighlight
            style={styles.button}
            underlayColor="white"
            onPress={this.handleSignUp}
          >
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableHighlight>
        <Button
          style={styles.button}
          title="Already have an account? Login"
          onPress={() => this.props.navigation.navigate('Login')}
        />
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#101357'
  },
  buttonText: {
    fontSize: 15,
    color: '#101357',
    alignSelf: 'center'
  },
  button: {
    height: 35,
    width:'20%',
    flexDirection: 'column',
    backgroundColor: 'white',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    marginTop: 10,
    alignSelf: 'center',
    justifyContent: 'center'
  },

  textInput: {
    height: 45,
    width:'80%',
    marginTop:8,
    padding: 12,
    fontSize: 18,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 8,
    color: 'white',
    flexDirection: 'row',
    justifyContent: 'center'
  }
})