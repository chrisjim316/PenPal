import firebase from 'firebase';
import { PowerTranslator, ProviderTypes, TranslatorConfiguration, TranslatorFactory } from 'react-native-power-translator';
const API_KEY = 'AIzaSyClnfcFWOuOg_DfiqlY3-Hvb0t7Q3DiIYw';

class Fire {

  constructor() {
    this.init();
    this.observeAuth();
  }

  // Credentials from my firebase account
  init = () => {
    try {
      firebase.initializeApp({
        apiKey: "AIzaSyAdkQuNxg6Gav-3__-PEVHi49i8rB9sV4E",
        authDomain: "penpal-906f0.firebaseapp.com",
        databaseURL: "https://penpal-906f0.firebaseio.com",
        projectId: "penpal-906f0",
        storageBucket: "penpal-906f0.appspot.com",
        messagingSenderId: "750457223745",
      });
    } catch (error) {
      // Skip 'app already exists' error when hot-reloading
      if(error.message.includes('already exists')) {
        console.error('Firebase initialization error, can be ignored.');
        //error.stack if you have detailed results
      }
    }
  }

  observeAuth = () =>
    firebase.auth().onAuthStateChanged(this.onAuthStateChanged);

  onAuthStateChanged = user => {
    if (!user) {
      try {
        // If username hasn't been registered before, user signs in anonymously
        firebase.auth().signInAnonymously();
      } catch ({ message }) {
        alert(message);
      }
    }
  };

  // Get current userId
  get uid() {
    return (firebase.auth().currentUser || {}).uid;
  }

  // Create a reference to a location in our database where the messages will be saved
  get ref() {
    return firebase.database().ref('messages');
  }

  get language() {
    return firebase.database().ref('language');
  }

  // get tempText() {
  //   return firebase.database().ref('tempText');
  // }

  // This takes care of all the messages currently stored in the database
  // Manually changing text for example, will change all text
  parse = snapshot => {
    let { timestamp: numberStamp, text, user } = snapshot.val();
    const { key: _id } = snapshot;
    const timestamp = new Date(numberStamp);

    this.language.once('value').then(languageRefData => {
      console.log("languageRefData is: " + languageRefData.val())
      TranslatorConfiguration.setConfig(ProviderTypes.Google, API_KEY, languageRefData);
      const translator = TranslatorFactory.createTranslator();

      // ** CONFIRMED WORKING, DOES TRANSLATE EVERY MESSAGE ON THE FRONT END, BUT NEVER UPDATES CUZ OUT OF SCOPE
      translator.translate(text).then(translated  => {
        console.log('[' + text +'] translated to [' + translated + ']');
        text = translated;
        // this.updateTempText(translated);
      });
    })

    // ** TEXT IS OUT OF SCOPE SO IT IS NEVER UPDATED, NEED A FIX ON THIS
    const message = {
      _id,
      timestamp,
      text,
      user,
    };

    return message;
    // this.resetTempText();
  }

  // Callback prop that calls our messages ref
  // Subsribes to the database, Gets last 100 messages and subscribes to every new message then parse it
  on = callback =>
    this.ref
      .limitToLast(100)
      .on('child_added', snapshot => callback(this.parse(snapshot)));

  // Get accurate timestamp
  get timestamp() {
    return firebase.database.ServerValue.TIMESTAMP;
  }

  // This only takes care of the current message being sent
  // Sends the message to the Backend
  send = (messages) => {
    for (let i = 0; i < messages.length; i++) {
      let { text, user } = messages[i];

      this.updateLanguage(user.language);
      console.log("Language is updated to " + user.language);
      TranslatorConfiguration.setConfig(ProviderTypes.Google, API_KEY, user.language);

      const translator = TranslatorFactory.createTranslator();
      translator.translate(text).then(translated => {
          console.log("original text: " + text);
          text = translated;
          console.log("translated: " + text);

          const message = {
            text,
            user,
            timestamp: this.timestamp,
          };

          this.append(message);
      });
    }
  };

  append = message => this.ref.push(message);
  // This makes sure only one language preference is set
  updateLanguage = languagePreference => this.language.set(languagePreference);
  // // This makes sure there's only one set of text
  // updateTempText = textSet => this.tempText.push(textSet);
  // resetTempText = () => this.tempText.set([]);

  // Unsubscribe from the database
  off() {
    this.ref.off();
  }
}

Fire.shared = new Fire();
export default Fire;
