// Import the two phone screens
import Main from './components/Main';
import Chat from './components/Chat';
import Flashcards from './components/Flashcards'
// Import React Navigation
import { createStackNavigator } from 'react-navigation'

// Create the stack navigator for users to navigate the two screens
const navigator = createStackNavigator({
  Main: { screen: Main },
  Chat: { screen: Chat },
  Flashcards: { screen: Flashcards },
});

export default navigator
