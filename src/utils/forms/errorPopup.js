import React from 'react';
import {View, StyleSheet, Text} from 'react-native';


const errorPopup = (props) => {
    if (!props.hasErrors) {
        return null;
    }

    return (
        <View style={styles.errorContainer}>
            <View style={styles.errorInnerContainer}>
                <Text style={styles.errorLabel}>Oops, please check your email and your password.</Text>
            </View>
        </View>
    )
};


const styles = StyleSheet.create({
    errorContainer: {
        marginBottom: 10,
        marginTop: 10,
        paddingLeft: 10,
        backgroundColor: '#F44336'
    },
    errorInnerContainer: {
        marginLeft: 2,
        padding: 10,
        backgroundColor: '#FFFFFF'
    },
    errorLabel: {
        color: '#746D6D',
        textAlign: 'center',
        textAlignVertical: 'center'
    },
});


export default errorPopup;
