import React, {useState} from 'react';
import { View, SafeAreaView } from 'react-native';
import Landing from './components/Landing'
import RoomList from './components/Rooms';
import MessageList from './components/Messages';
import User from './components/User';
import * as firebase from 'firebase'
import {styles} from './styles/app'

// This is my api key. In a real business application this would
// not be stored here since that makes our database vulnerable.
// The solution is to store these details in a config file that
// does not get checked into version control.
var firebaseConfig = {
  apiKey: "AIzaSyCBxhUrobjhX7UGwqtvPMjWPsd0qoK0tvc",
  authDomain: "bloc-chat-messenger-dd4f6.firebaseapp.com",
  databaseURL: "https://bloc-chat-messenger-dd4f6.firebaseio.com",
  projectId: "bloc-chat-messenger-dd4f6",
  storageBucket: "bloc-chat-messenger-dd4f6.appspot.com",
  messagingSenderId: "1015629588032",
  appId: "1:1015629588032:web:6852b7795725f18997a1a5"
};
firebase.initializeApp(firebaseConfig);

export default function App() {
  
  const [currentRoom, setCurrentRoom] = useState('');
  const [currentRoomKey, setCurrentRoomKey] = useState('');
  const [user, setUser] = useState("");
  const [userIsConfirmed, setUserIsConfirmed] = useState(false);
  
  return (
    <SafeAreaView style={styles.container}>
      { 
        userIsConfirmed ?
          <View>
            <User user={user}/>
            <RoomList
              firebase={firebase}
              setCurrentRoom={setCurrentRoom}
              setCurrentRoomKey={setCurrentRoomKey}
              currentRoom={currentRoom}
            />
            {
              currentRoom != '' &&
              <MessageList
                firebase={firebase}
                currentRoom={currentRoom}
                currentRoomKey={currentRoomKey}
                user={user}
              />
            }
          </View>
        :
          <Landing 
            setUser={setUser} 
            setUserIsConfirmed={setUserIsConfirmed}
          />
      }
    </SafeAreaView>
)
}
