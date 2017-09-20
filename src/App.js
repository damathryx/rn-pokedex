import React from 'react';
import Relay from 'react-relay';
import { StackNavigator } from 'react-navigation';

import RelayStore from './RelayStore';

import Pokemons from './Pokemons';
import Pokemon from './Pokemon';

RelayStore.reset(
    new Relay.DefaultNetworkLayer('http://localhost:5000/graphql'),
);

const RelayApp = StackNavigator(
    {
        Pokemons: { screen: Pokemons },
        Pokemon: { screen: Pokemon },
    },
    {
        initialRouteName: 'Pokemons',
    },
);

export default () => <RelayApp />;