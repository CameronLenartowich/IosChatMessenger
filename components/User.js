import React from 'react';
import { Text, View } from 'react-native';
import {styles} from './../styles/user'

function User(props) {
    
    return(
        <View style={styles.userContainer}>
            <Text style={styles.userText}>
                Signed in as {props.user}
            </Text>
        </View>
    );
}

export default User;