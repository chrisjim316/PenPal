import React from 'react';
import { GiftedChat } from 'react-native-gifted-chat'; // To make creating the chat

import Fire from '../Fire';
import {TouchableOpacity, View, Button} from 'react-native';

var convoStarters = ["What is your favourite sport?",
                     "What is your favourite thing to do in your City",
                     "Would you rather go on a hike or a swim?",
                     "How is the weather in your city?",
                     "What are your hobbies?",
                     "What music do you like?",
                     "What was your childhood dream?"];

type Props = {
  name?: string,
};

class Chat extends React.Component<Props> {
  // Set the title of the screen to either the state.params.language or a default welcome message
  static navigationOptions = ({ navigation }) => ({
    title: (navigation.state.params.language + ' Chat') || 'Welcome to PenPal!',
  });

  state = {
    messages: [],
  };

  // Chat bubbles!
  get user() {
    // Return our name and our UID for GiftedChat to parse in order to create correct chatBubbles
    return {
      name: this.props.navigation.state.params.name,
      _id: Fire.shared.uid,
      language: this.props.navigation.state.params.language,
    };
  }

  render() {
    return (
      <GiftedChat
        messages={this.state.messages}
        // Reference to Firebase server and user
        onSend={Fire.shared.send}
        user={this.user}
        renderActions={this.renderActions.bind(this)}
      />
    );
  }

  renderActions() {
    return (
      <TouchableOpacity>
        <Button
         onPress={this.convoStart}
         title="Start convo"
         borderRadius='20' backgroundColor="#97C1FF"
        />
      </TouchableOpacity>
    );
  }

  convoStart()  {
    let u = {
      _id: Fire.shared.uid,
      language: 'en'
    }
    let msg = {
      user: u,
      text: convoStarters[Math.floor(Math.random() * 7)],
    };
    Fire.shared.send([msg]);
  }

  // message is the response from on method in Fire.js
  // Connects to Firebase server and script
  // Subscribe
  componentDidMount() {
    Fire.shared.on(message =>
      this.setState(previousState => ({
        messages: GiftedChat.append(previousState.messages, message),
      })),
    );
  }

  // Unsubscribe
  componentWillUnmount() {
    Fire.shared.off();
  }

}


export default Chat;
