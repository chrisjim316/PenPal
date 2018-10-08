import React, { Component } from 'react';
import { GiftedChat } from 'react-native-gifted-chat'; // To make creating the chat UI easier
import {
  View,
  StyleSheet,
} from 'react-native';

class Chat extends Component {

  // Set the title of the screen to either the state.params.name or a default value
  static navigationOptions = ({ navigation }) => ({
    title: (navigation.state.params || {}).name || 'Welcome to PenPal!',
  });

  state = {
    messages: [],
  };

  render() {
    return (
      <GiftedChat
        messages={this.state.messages}
        // Reference to Firebase server and user
        onSend={Fire.shared.send}
        user={this.user}
      />
    );
  }

  // Connects to Firebase server and script
  // Subsribe
  componentDidMount() {
    Fire.shared.on(message =>
      this.setState(previousState => ({
        messages: GiftedChat.append(previousState.messages, message),
      }))
    );
  }

  // Unsubscribe
  componentWillUnmount() {
    Fire.shared.off();
  }

  // Chat bubbles!
  get user() {
  // Return our name and our UID for GiftedChat to parse in order to create correct chatBubbles
  return {
      name: this.props.navigation.state.params.name,
      _id: Fire.shared.uid,
    };
  }
}

const styles = StyleSheet.create({});

export default Chat;
