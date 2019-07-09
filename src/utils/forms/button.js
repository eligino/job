import {StyleSheet, Text, TouchableOpacity} from "react-native";
import React from 'react';

const button = (props) => {
    let template = null;

    switch (props.type) {
        case 'primary':
            template = <TouchableOpacity {...props} style={[styles.button, styles.buttonPrimary]}>
                <Text style={styles.buttonText}>{props.text}</Text>
            </TouchableOpacity>;
            break;

        case 'secondary':
            template = <TouchableOpacity {...props} style={styles.button}>
                <Text style={styles.buttonText}>{props.text}</Text>
            </TouchableOpacity>;
            break;

        default:
            template = <TouchableOpacity {...props} style={styles.button}>
                <Text style={styles.buttonText}>{props.text}</Text>
            </TouchableOpacity>;
            return template;
    }


    return template;
};


const styles = StyleSheet.create({
    button: {
        padding: 10,
        width: '100%',
        borderRadius: 10,
        alignItems: 'center',
    },
    buttonPrimary: {
        backgroundColor: '#32B6B3',
        marginBottom: 10,
        marginTop: 10
    },
    buttonText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        fontSize: 16
    },
});


export default button;
