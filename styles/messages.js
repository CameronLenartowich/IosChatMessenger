import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    contentContainer: {
        padding: 10,
    },
    messageContainer: {
        borderBottomColor: '#4FB4BA',
        borderBottomWidth: 1,
        borderStyle: 'solid',
        paddingVertical: '2%'
    },
    topRowOfMessageContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    newMessageText: {
        textAlign:'center',
        textAlignVertical: 'center',
        fontSize: 18,
        color: 'white'
    },
    newMessageInput: {
        margin: '3%',
        padding: '3%',
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: '#4FB4BA',
        borderRadius: 5,
        width: '20%',
        height: 30,
        width: 100,
        textAlign: 'center',
        color: 'white'
    },
    footerContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    username: {
        color: '#B2C3C4',
        fontSize: 18
    },
    date: {
        color: '#B2C3C4'
    },
    content: {
        fontSize: 18,
        color: 'white'
    }
})