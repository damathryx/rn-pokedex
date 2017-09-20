import React, { Component } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import Relay from 'react-relay';
import ViewerQuery from './ViewerQuery';
import { createRenderer } from './RelayUtils';

class Pokemon extends Component {
    static navigationOptions = {
        title: 'Pokemon',
    };

    render() {
        const { user, pokemon } = this.props.viewer;
        console.log(pokemon);
        return (
            <View style={styles.container}>
                <Text>ID: {pokemon.id}</Text>
                <Text>Name: {pokemon.name}</Text>
                <Image source={{ uri: pokemon.image }} style={{ height: 100, width: 100 }} />
            </View>
        );
    }
}

// Create a Relay.Renderer container
export default createRenderer(Pokemon, {
    queries: ViewerQuery,
    queriesParams: ({ navigation }) => {
        return {
            name: navigation.state.params.name,
        }
    },
    initialVariables: {
        name: 'Pikachu',
    },
    fragments: {
        viewer: () => Relay.QL`
      fragment on Query {
        pokemon(name: $name) {
          name
          image
          id
        }
      }
    `,
    },
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});