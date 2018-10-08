import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity, // For clicking buttons
} from 'react-native';

class Main extends React.Component {
  static navigationOptions = {
    title: 'PenPal',
  };

  // The component's state, this will be the user's name
  state = {
    name: ''
  }

  onChangeText = name => this.setState({ name }); // Create listener and updates when user takes an action

  // This links to the button, which takes the user to the next page, carrying the state (name)
  onPress = () => {
    this.props.navigation.navigate('Chat', { name: this.state.name });
  }

  render() {
    return (
      <View>
        // Prompts user to enter their name
        <Text style={styles.title}>Enter your name:</Text>

        // This is where user enters their name and register as an anonymous user
        <TextInput
          style={styles.nameInput}
          placeHolder="Alex Facebook"
          onChangeText={this.onChangeText} // listener
          value={this.state.name}
        />

        // Button to continue to next screen (chat)
        <TouchableOpacity onPress={this.onPress}>
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

// Make everything neat and pretty
const offset = 24;
const styles = StyleSheet.create({
  nameInput: {
    height: offset * 2,
    margin: offset,
    paddingHorizontal: offset,
    borderColor: '#111111',
    borderWidth: 1,
  },
  title: {
    marginTop: offset,
    marginLeft: offset,
    fontSize: offset,
  },
  buttonText: {
    marginLeft: offset,
    fontSize: offset,
  },
});

export default Main;
