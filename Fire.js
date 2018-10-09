import firebase from 'firebase';

class Fire {
  constructor() {
    this.init();
    this.observeAuth();
  }

  // Credentials from my firebase account
  init = () =>
    firebase.initializeApp({
      apiKey: "AIzaSyAdkQuNxg6Gav-3__-PEVHi49i8rB9sV4E",
      authDomain: "penpal-906f0.firebaseapp.com",
      databaseURL: "https://penpal-906f0.firebaseio.com",
      projectId: "penpal-906f0",
      storageBucket: "penpal-906f0.appspot.com",
      messagingSenderId: "750457223745"
    });

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

  parse = snapshot => {
    const { timestamp: numberStamp, text, user } = snapshot.val();
    const { key: _id } = snapshot;
    const timestamp = new Date(numberStamp);
    const message = {
      _id,
      timestamp,
      text,
      user,
    };
    return message;
  }

  // Subsribes to the database, Gets last 20 messages and subscribes to every new message then parse it
  on = callback =>
    this.ref
      .limitToLast(20)
      .on('child_added', snapshot => callback(this.parse(snapshot)));

  // Get accurate timestamp
  get timestamp() {
    return firebase.database.ServerValue.TIMESTAMP;
  }

  // Sends the message to the Backend
  send = messages => {
    for (let i = 0; i < messages.length; i++) {
      const { text, user } = messages[i];
      const message = {
        text,
        user,
        timestamp: this.timestamp,
      };
      this.append(message);
    }
  };

  append = message => this.ref.push(message);

  // Unsubscribe from the database
  off() {
    this.ref.off();
  }
}

Fire.shared = new Fire();
export default Fire;
