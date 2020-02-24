import React, { Component } from 'react';
import { TextInput, Text, View, Button, Picker } from 'react-native';
import {styles} from './../styles/rooms'

// firebase works better with class components.
class Rooms extends Component {
    constructor(props){
        super(props)
        this.state= {
            rooms: [],
            newRoom: [],
            showAddRoom: false
        };
        this.roomsRef = this.props.firebase.database().ref('rooms');
    }

    componentDidMount() {
        this.roomsRef.on('child_added', snapshot => {
            const room = snapshot.val();
            room.key = snapshot.key;
            this.setState({ rooms: this.state.rooms.concat( room ) })
        });
    }

    addItem() {
        if (this.state.newRoom === '') {return};
        this.roomsRef.push({name: this.state.newRoom});
        this.setState({showAddRoom: false})
    }

    handleClick(item) {
        this.state.rooms.map(x => {
            if(x.name == item){this.props.setCurrentRoomKey(x.key)}
        })
        this.props.setCurrentRoom(item);
    }

    render() {
        let roomNames = [];
        this.state.rooms.map(x => roomNames.push(x.name))
        let serviceItems = roomNames.map((item, index) => {
            return (
                <Picker.Item 
                    key={index} 
                    value={item} 
                    label={item} 
                    color='white'
                />
            )
        })
        return(
            <View style={styles.container}>
                <View>
                    <Picker
                        style={styles.picker}
                        selectedValue={this.props.currentRoom}
                        onValueChange={(item) => this.handleClick(item)}
                    >
                        <Picker.Item 
                            label="--Select a Room--" 
                            value="select-a-room" 
                            color='white'
                        />
                        {serviceItems}
                    </Picker>
                </View>
                {
                    this.state.showAddRoom ? 
                    <View style={styles.newRoomContainer}>
                        <Text style={styles.newRoomText}>Add New Room</Text>
                        <TextInput 
                            style={styles.newRoomInput}
                            placeholder="text"
                            placeholderTextColor='white'
                            onChangeText={(text) => this.setState({newRoom: text})}
                        />
                        <Button
                            color='#4FB4BA' 
                            onPress={() => this.addItem()}
                            title="add"
                        />
                        <Button 
                            color='#4FB4BA' 
                            onPress={() => this.setState({showAddRoom: !this.state.showAddRoom})}
                            title="cancel"
                        />
                    </View>
                    : 
                    <Button
                        onPress={() => this.setState({showAddRoom: !this.state.showAddRoom})}
                        title="Create New Room"
                        color='#4FB4BA' 
                    />
                }
            </View>
        )
    }
}

export default Rooms;