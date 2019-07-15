import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import {RootNavigator} from './routes';

class App extends Component {
    render() {
        const Nav = RootNavigator();

        return (
            <View style={styles.container}>
                <Nav/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
});

export default App;
