import React from 'react';
import { Button } from 'react-native-elements';
import {
  Image,
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity, // For clicking buttons
} from 'react-native';

class Main extends React.Component {
  static navigationOptions = {
    title: 'PenPal - Your Translation Buddy',
    headerStyle: {
      backgroundColor: '#BDD8FF',
    },
  };

  // The component's state, this will be the user's name
  state = {
    name: '',
    language: ''
  }

  onChangeLanguage = language => this.setState({ language }); // Create listener for language preference selections
  onChangeText = name => this.setState({ name }); // Create listener and updates when user takes an action

  // This links to the button, which takes the user to the next page, carrying the state (name)
  onPress = () => {
    this.props.navigation.navigate('Chat', { name: this.state.name, language: this.state.language });
  }

  render() {
    return (
      <View style = {styles.MainContainer}>
        <Image
          style = {styles.ImageStyling}
          source={{uri: 'https://cdn2.iconfinder.com/data/icons/lineicon-essential/512/Significon-Translation-512.png'}}
        />

        // Prompts user to enter their name
        <Text style={styles.title}>Enter your name:</Text>

        // This is where user enters their name and register as an anonymous user
        <TextInput
          style={styles.inputBox}
          placeHolder="Alex Facebook"
          onChangeText={this.onChangeText} // listener
          value={this.state.name}
        />

        <Picker
          selectedValue={this.state.language}
          style={{ height: 50, width: 100 }}
          onValueChange={(itemValue, itemIndex) => this.onChangeLanguage(itemValue)}>
          <Picker.Item label="Spanish" value="es" />
          <Picker.Item label="French" value="fr" />
          <Picker.Item label="English" value="en" />
          <Picker.Item label="Hindi" value="hi" />
          <Picker.Item label="Japanese" value="ja" />
          <Picker.Item label="Chinese" value="zh-CN" />
        </Picker>


        // Button to continue to next screen (chat)
        <TouchableOpacity onPress={this.onPress}>
          <Button onPress={this.onPress} style={styles.ButtonStyling} borderRadius='20' backgroundColor="#97C1FF" color="#000000" fontWeight='bold' title='START CHATTING FOR FREE NOW'/>
        </TouchableOpacity>
      </View>
    );
  }
}

// Make everything neat and pretty
const offset = 24;
const styles = StyleSheet.create({
  ButtonStyling: {
    width: 200,
    height: 200,
    marginLeft:10,
  },
  ImageStyling: {
    marginLeft: 120,
    width: 150,
    height: 150,
  },
  MainContainer: {
    flex: 1,
    // Set content's vertical alignment.
    justifyContent: 'center',
    // Set hex color code here.
    backgroundColor: '#afceff',
  },
  inputBox: {
    borderRadius: '20',
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
});

export default Main;
