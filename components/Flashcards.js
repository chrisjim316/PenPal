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

class Flashcards extends React.Component {
  static navigationOptions = {
    title: 'Flashcards',
    headerStyle: {
      backgroundColor: '#BDD8FF',
    }
  };

  // This links to the button, which takes the user to the next page, carrying the state (name)
  onPress = () => {
    this.props.navigation.navigate('Chat');
  }

  render() {
    const { navigation } = this.props;
    const flashcards = navigation.getParam('fc', 'N/A');
    const textInputComponents =
    flashcards.map((f)=> <TextInput placeholder={f} />);
    console.log(textInputComponents);



    return (
      <View style = {styles.MainContainer}>
      //TItle of the flashcards screen
        <Text style={styles.titleText}>Your Flashcards</Text>

        //<Text style={styles.flash}>{textInputComponents}</Text>
        { flashcards.map((item, key)=>(
         <Text key={key} style={styles.titleText}> { item } </Text>)
         )}

      </View>
    );
  }
}

// Make everything neat and pretty
const offset = 24;
const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    // Set content's vertical alignment.
    justifyContent: 'center',
    // Set hex color code here.
    backgroundColor: '#afceff',
  },
  titleText: {
    marginTop: 10,
    marginLeft: offset,
    fontSize: offset,
  },
  flash: {
    fontSize: 20,
    marginLeft: offset,
  },
});

export default Flashcards;
