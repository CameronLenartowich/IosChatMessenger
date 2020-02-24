import React, {Component} from 'react';
import { TextInput, Text, View, Button, ScrollView } from 'react-native';
import {styles} from './../styles/messages'

// firebase works better with class components.
class MessageList extends Component {
    constructor(props){
        super(props)
        this.state = {
            messages: [],
            newMessage: "",
            scrollHeight: ""
        }
        this.messagesRef = this.props.firebase.database().ref('messages');
    }

    componentDidMount() {
        this.messagesRef.orderByChild('sentAt').on('child_added', snapshot => {
            const message = snapshot.val();
            message.key = snapshot.key;
            this.setState({ messages : 
                this.state.messages.concat( this.structureMessageForList(message))
            });
        });
    }

    structureMessageForList(message) {
        let newStructuredMessage = {};
        let structuredDate = "";
        for(let i = 0 ; i < 15 ; i++) {structuredDate += message.sentAt.charAt(i)}
        newStructuredMessage.title = message.key
        newStructuredMessage.data = []
        newStructuredMessage.data[0] = message.username
        newStructuredMessage.data[1] = structuredDate
        newStructuredMessage.data[2] = message.content 
        newStructuredMessage.roomId = message.roomId
        message = newStructuredMessage
        return message;
    }

    checkUserName(name) {
        if(name == ''){return 'guest'}
        else {return name};
    }

    addItem() {
        if (this.state.newMessage === '') {return};
        if (this.props.currentRoom === '') {return};
        this.messagesRef.push({
            content: this.state.newMessage,
            roomId: this.props.currentRoomKey,
            sentAt: Date(this.props.firebase.database.ServerValue.TIMESTAMP),
            username: this.checkUserName(this.props.user)
        });
    }

    render(){
        let serviceItems = this.state.messages.map((item, index) => {
            if(item.roomId == this.props.currentRoomKey) {
                return (
                    <View style={styles.messageContainer} key={index}>
                        <View style={styles.topRowOfMessageContainer}>
                            <Text style={styles.username}>{item.data[0]}</Text>
                            <Text style={styles.date}>{item.data[1]}</Text>
                        </View>
                        <Text style={styles.content}>{item.data[2]}</Text>
                    </View>
                )
            }
        })
        return(
            <View style={styles.container}>
                <View style={styles.contentContainer}>
                    <View style={styles.footerContainer}>
                        <Text style={styles.newMessageText}>New Message</Text>
                        <TextInput
                            style={styles.newMessageInput}
                            onChangeText={(text) => this.setState({newMessage: text})} 
                            placeholder="text"
                            placeholderTextColor='white'
                        />
                        <Button
                            color='#4FB4BA' 
                            style={styles.newMessageButton}
                            onPress={() => this.addItem()}
                            title="Send"
                        />
                    </View>
                    <ScrollView>
                        {serviceItems}
                    </ScrollView> 
                </View>
            </View>
        )
    }
}

export default MessageList;