import React from 'react';
import { Text, View, TextInput, Button } from 'react-native';
import {styles} from './../styles/landing'

const Landing = (props) => {
    return(
        <View style={styles.container}>
            <Text style={styles.brand}>Chat Messenger</Text>
            <Text style={styles.title}>Enter a public username.</Text>
            <TextInput 
              style={styles.input}
              placeholder="username"
              placeholderTextColor="white"
              onChangeText={(text) => props.setUser(text)}
            />
            <Button
              onPress={() => {props.setUserIsConfirmed(true)}}
              color='white'
              title="Next"
            />
        </View>
    )
}

export default Landing;