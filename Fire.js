import firebase from 'firebase';

class Fire {
  constructor() {
    this.init();

    this.observeAuth();
  }

  observeAuth = () =>
    firebase.auth().onAuthStateChanged(this.onAuthStateChanged);

  // Credentials from my firebase account
  init = () => firebase.initializeApp({
    apiKey: "AIzaSyAdkQuNxg6Gav-3__-PEVHi49i8rB9sV4E",
    authDomain: "penpal-906f0.firebaseapp.com",
    databaseURL: "https://penpal-906f0.firebaseio.com",
    projectId: "penpal-906f0",
    storageBucket: "penpal-906f0.appspot.com",
    messagingSenderId: "750457223745"
  });

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

  // Create a reference to a location in our database where the messages will be saved
  get ref() {
    return firebase.database().ref('messages');
  }

  // Subsribes to the database, Gets last 20 messages and subscribes to every new message then parse it
  on = callback =>
    this.ref
      .limitToLast(20)
      .on('child_added', snapshot =>
  callback(this.parse(snapshot)));

  parse = snapshot => {
    // Calling val function will return the value or object associated with it
    const { timestamp: numberStamp, text, user } = snapshot.val();
    const { key: _id } = snapshot;

    // Create timestamp in JS
    const timestamp = new Date(numberStamp);

    // For GiftedChat tool to easily recognize message object
    const message = {
      _id,
      timestamp,
      text,
      user,
    };

    return message;
  }

  // Get current userId
  get uid() {
    return (firebase.auth().currentUser || {}).uid;
  }

  // Get accurate timestamp
  get timestamp() {
    return firebase.database.ServerValue.TIMESTAMP;
  }

  // Accepts an array of input, then loop through
  send = messages => {
    for (let i = 0; i < messages.length; i++) {
      const { text, user } = messages[i];

      // Make it GiftedChat format with a uniqueUser
      const message = {
        text,
        user,
        timestamp: this.timestamp,
      };

      this.append(message);
    }
  };


  // The append function will save the message object with a unique ID
  append = message => this.ref.push(message);

  // Function to unsubscribe from the database
  off() {
    this.ref.off();
  }
}

Fire.shared = new Fire();
export default Fire;
