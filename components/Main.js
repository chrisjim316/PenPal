import React from 'react';
import { Button } from 'react-native-elements';
import {
  Image,
  View,
  StyleSheet,
  Text,
  Picker,
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
    // Set default language to first choice to prevent null pointer exception
    language: 'af',
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

        <Text style={styles.title}>Select your preferred language: </Text>

        <Picker
          selectedValue={this.state.language}
          style={styles.dropdown}
          onValueChange={(itemValue, itemIndex) => this.onChangeLanguage(itemValue)}>
          <Picker.Item label="Afrikaans" value="af" />
          <Picker.Item label="Albanian" value="sq" />
          <Picker.Item label="Amharic" value="am" />
          <Picker.Item label="Arabic" value="ar" />
          <Picker.Item label="Armenian" value="hy" />
          <Picker.Item label="Azeerbaijani" value="az" />
          <Picker.Item label="Basque" value="eu" />
          <Picker.Item label="Belarusian" value="be" />
          <Picker.Item label="Bengali" value="bn" />
          <Picker.Item label="Bosnian" value="bs" />
          <Picker.Item label="Bulgarian" value="bg" />
          <Picker.Item label="Catalan" value="ca" />
          <Picker.Item label="Cebuano" value="ceb" />
          <Picker.Item label="Chinese (Simplified)" value="zh-CN" />
          <Picker.Item label="Chinese (Traditional)" value="zh-TW" />
          <Picker.Item label="Corsican" value="co" />
          <Picker.Item label="Croatian" value="hr" />
          <Picker.Item label="Czech" value="cs" />
          <Picker.Item label="Danish" value="da" />
          <Picker.Item label="Dutch" value="nl" />
          <Picker.Item label="English" value="en" />
          <Picker.Item label="Esperanto" value="eo" />
          <Picker.Item label="Estonian" value="et" />
          <Picker.Item label="Finnish" value="fi" />
          <Picker.Item label="French" value="fr" />
          <Picker.Item label="Frisian" value="fy" />
          <Picker.Item label="English" value="en" />
          <Picker.Item label="Galician" value="gl" />
          <Picker.Item label="Georgian" value="ka" />
          <Picker.Item label="German" value="de" />
          <Picker.Item label="Greek" value="el" />
          <Picker.Item label="Gujarati" value="gu" />
          <Picker.Item label="Haitian Creole" value="ht" />
          <Picker.Item label="Hausa" value="ha" />
          <Picker.Item label="Hawaiian" value="haw" />
          <Picker.Item label="Hindi" value="hi" />
          <Picker.Item label="Hungarian" value="hu" />
          <Picker.Item label="Icelandic" value="is" />
          <Picker.Item label="Igbo" value="ig" />
          <Picker.Item label="Indonesian" value="id" />
          <Picker.Item label="Irish" value="ga" />
          <Picker.Item label="Italian" value="it" />
          <Picker.Item label="Japanese" value="ja" />
          <Picker.Item label="Javanese" value="jw" />
          <Picker.Item label="Kannada" value="kn" />
          <Picker.Item label="Kazakh" value="kk" />
          <Picker.Item label="Khmer" value="km" />
          <Picker.Item label="Korean" value="ko" />
          <Picker.Item label="Kurdish" value="ku" />
          <Picker.Item label="Kyrgyz" value="ky" />
          <Picker.Item label="Lao" value="lo" />
          <Picker.Item label="Latin" value="la" />
          <Picker.Item label="Latvian" value="lv" />
          <Picker.Item label="Lithuanian" value="lt" />
          <Picker.Item label="Luxembourgish" value="lb" />
          <Picker.Item label="Macedonian" value="mk" />
          <Picker.Item label="Malagasy" value="mg" />
          <Picker.Item label="Malay" value="ms" />
          <Picker.Item label="Malayalam" value="ml" />
          <Picker.Item label="Maltese" value="mt" />
          <Picker.Item label="Maori" value="mi" />
          <Picker.Item label="Marathi" value="mr" />
          <Picker.Item label="Mongolian" value="mn" />
          <Picker.Item label="Myanmar (Burmese)" value="my" />
          <Picker.Item label="Nepali" value="ne" />
          <Picker.Item label="Norwegian" value="no" />
          <Picker.Item label="Nyanja (Chichewa)" value="ny" />
          <Picker.Item label="Pashto" value="ps" />
          <Picker.Item label="Persian" value="fa" />
          <Picker.Item label="Polish" value="po" />
          <Picker.Item label="Portuguese" value="pt" />
          <Picker.Item label="Punjabi" value="pa" />
          <Picker.Item label="Romanian" value="ro" />
          <Picker.Item label="Russian" value="ru" />
          <Picker.Item label="Samoan" value="sm" />
          <Picker.Item label="Scots Gaelic" value="gd" />
          <Picker.Item label="Serbian" value="sr" />
          <Picker.Item label="Sesotho" value="st" />
          <Picker.Item label="Shona" value="sn" />
          <Picker.Item label="Sindhi" value="sd" />
          <Picker.Item label="Sinhala" value="si" />
          <Picker.Item label="Slovak" value="sk" />
          <Picker.Item label="Slovenian" value="sl" />
          <Picker.Item label="Somali" value="so" />
          <Picker.Item label="Spanish" value="es" />
          <Picker.Item label="Sundanese" value="su" />
          <Picker.Item label="Swahili" value="sw" />
          <Picker.Item label="Swedish" value="sw" />
          <Picker.Item label="Tagalog" value="tl" />
          <Picker.Item label="Tajik" value="tg" />
          <Picker.Item label="Tamil" value="ta" />
          <Picker.Item label="Telugu" value="te" />
          <Picker.Item label="Thai" value="th" />
          <Picker.Item label="Turkish" value="tr" />
          <Picker.Item label="Ukrainian" value="uk" />
          <Picker.Item label="Urdu" value="ur" />
          <Picker.Item label="Uzbek" value="uz" />
          <Picker.Item label="Vietnamese" value="vi" />
          <Picker.Item label="Welsh" value="cy" />
          <Picker.Item label="Xhosa" value="xh" />
          <Picker.Item label="Yiddish" value="yi" />
          <Picker.Item label="Yoruba" value="yo" />
          <Picker.Item label="Zulu" value="zu" />
        </Picker>


        // Button to continue to next screen (chat)
        <TouchableOpacity onPress={this.onPress}>
          <Button onPress={this.onPress} style={styles.ButtonStyling} borderRadius='20' backgroundColor="#97C1FF" color="#000000" fontWeight='bold' title='MEET YOUR PENPALS'/>
        </TouchableOpacity>
      </View>
    );
  }
}

// Make everything neat and pretty
const offset = 24;
const styles = StyleSheet.create({
  dropdown: {
    marginLeft: 100,
    marginBottom: 30,
    marginTop: -50,
    height: 200,
    width: 200
  },
  ButtonStyling: {
    width: 200,
    height: 200,
    marginLeft:90,
  },
  ImageStyling: {
    marginTop: 40,
    marginLeft: 150,
    width: 100,
    height: 100,
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
