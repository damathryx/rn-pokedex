import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    ScrollView,
    TouchableOpacity
} from 'react-native';
import Relay from 'react-relay';
import ViewerQuery from './ViewerQuery';
import { createRenderer } from './RelayUtils';

class Pokemons extends Component {
    static navigationOptions = {
        title: 'Pokemons',
    };

    render() {
        const { navigate } = this.props.navigation;
        const { user, pokemons } = this.props.viewer;
        return (
            <ScrollView style={{ height: 500 }}>
                {pokemons.map((pokemon) => (
                    <TouchableOpacity
                        onPress={() =>
                            navigate('Pokemon', { name: pokemon.name })
                        }
                        key={pokemon.number}
                    >
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text>ID: {pokemon.number}</Text>
                            <Text>Name: {pokemon.name}</Text>
                            <Image source={{ uri: pokemon.image }} style={{ height: 100, width: 100 }} />
                        </View>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        );
    }
}

// Create a Relay.Renderer container
export default createRenderer(Pokemons, {
    queries: ViewerQuery,
    queriesParams: ({ navigation }) => {
        return {
            count: 10,
        }
    },
    initialVariables: {
        count: 10,
    },
    fragments: {
        viewer: () => Relay.QL`
      fragment on Query {
        pokemons(first: $count) {
          name
          image
          number
          id
        }
      }
    `,
    },
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});