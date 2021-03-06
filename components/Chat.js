import React from 'react';
import Fire from '../Fire';
import { GiftedChat } from 'react-native-gifted-chat'; // To make creating the chat
import {TouchableOpacity, View, Button, Text, Clipboard} from 'react-native';
let convoStarters = ["What is your favourite sport?",
                     "What is your favourite thing to do in your City",
                     "Would you rather go on a hike or a swim?",
                     "How is the weather in your city?",
                     "What are your hobbies?",
                     "What music do you like?",
                     "What was your childhood dream?"];
var flashcards = [];

type Props = {
  name?: string,
};

class Chat extends React.Component<Props> {
  // Set the title of the screen to either the state.params.language or a default welcome message
  static navigationOptions = ({ navigation }) => ({
    title: (navigation.state.params.language + ' Chat') || 'Welcome to PenPal!',
    headerRight: <TouchableOpacity onPress={() => navigation.navigate("Flashcards", {fc: flashcards})}>
    <Text>Flashcards</Text></TouchableOpacity>
  });

  state = {
    messages: [],
  };

  onLongPress(ctx, currentMessage) {
    if (currentMessage.text) {
        const options = [
          'Add to Flashcards',
          'Copy Text',
          'Cancel',
        ];
        const cancelButtonIndex = options.length - 1;
        ctx.actionSheet().showActionSheetWithOptions({
          options,
          cancelButtonIndex,
        },
        (buttonIndex) => {
          switch (buttonIndex) {
            case 0:
              //Add to flashcards
              console.log("Adding to flashcards...");
              flashcards.push(currentMessage.text);
              break;
            case 1:
              Clipboard.setString(currentMessage.text);
              break;
          }
        });
      }
    }


  // Chat bubbles!
  get user() {
    // Return our name and our UID for GiftedChat to parse in order to create correct chatBubbles
    return {
      name: this.props.navigation.state.params.name,
      _id: Fire.shared.uid,
      language: this.props.navigation.state.params.language,
    };
  }

  componentWillMount() {
    console.log("translating message");
    Fire.shared.on((message) => {
      this.setState({
        messages: [message, ...this.state.messages].sort((a, b) => {
          if (a.timestamp > b.timestamp) {
            return -1;
          }
          if (a.timestamp < b.timestamp) {
            return 1;
          }
          // a must be equal to b
          return 0;
        })
      })
    }, this.props.navigation.state.params.language);
  }

  render() {
    // this.translateMessages();
    return (
      <GiftedChat
        messages={this.state.messages}
        onLongPress={(ctx, currentMessage) => this.onLongPress(ctx, currentMessage)}
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
         onPress={this.convoStart.bind(this)}
         title="Start convo"
         borderRadius='20'
         backgroundColor="#97C1FF"
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
    console.log("setting state to", msg);
    Fire.shared.send([msg]);
  }

  // Unsubscribe
  componentWillUnmount() {
    Fire.shared.off();
  }
}

export default Chat;
