import React from 'react';
import { View, Platform, StatusBar } from 'react-native';
import { createBottomTabNavigator, 
          createMaterialTopTabNavigator,
        createStackNavigator, 
        createAppContainer, HeaderBackButton } from 'react-navigation'
import DeckList from './components/DeckList'
import AddCard from './components/AddCard'
import AddDeck from './components/AddDeck'
import Quiz from './components/Quiz'
import { purple, white, lightPurp } from './_colors'
import {Constants} from 'expo'
import {Provider} from 'react-redux'
import reducer from './reducers'
import {createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import Deck from './components/Deck'
import { setNotification } from './_helper'
import { FontAwesome } from '@expo/vector-icons'

export const FlashCardsStatusBar = ({backgroundColor, ...props}) => {
  return (
    <View style={{backgroundColor, height: Constants.statusBarHeight}} >
      <StatusBar translucent backgroundColor={backgroundColor} {...props}/>
    </View>
  )
}

const RouteConfigs = {
  Decks: {
    screen: DeckList,
    navigationOptions: {
      tabBarLabel: "Decks",
      tabBarIcons: ({tintColor}) => {
        <FontAwesome name='layer-group' size={30} color={tintColor}/>
      }
    }
  },
  AddDeck: {
    screen: AddDeck,
    navigationOptions: ({navigation}) => ({
      tabBarLabel: "Add Deck",
      tabBarIcons: ({tintColor}) => {
        <FontAwesome name='plus-circle' size={30} color={tintColor} />
      }
    })
  }
}

const TabNavigatorConfig = {
  navigationOptions: {
    header: null
  },
  tabBarOptions: {
    activeTintColor: Platform.OS === "ios" ? purple : white,
    style: {
      height: 56,
      backgroundColor: Platform.OS === "ios" ? white : purple,
      shadowColor: "rgba(0,0,0,0.24)",
      shadowOffset: {
        width: 0,
        height: 3
      },
      showRadius: 6,
      shadowOpacity: 1
    }
  }
}

const Tabs = Platform.OS === "ios"
              ? createBottomTabNavigator(RouteConfigs, TabNavigatorConfig)
              : createMaterialTopTabNavigator(RouteConfigs, TabNavigatorConfig)

const MainNavigator = createStackNavigator({
  home: {
    screen: Tabs,
    navigationOptions: {
      header: null
    }
  },
  Deck: {
    screen: Deck,
    navigationOptions: ({navigation}) => ({
      headerTintColor: white,
      title: navigation.state.params.deckId,
      headerStyle: {
        backgroundColor: purple
      },
      headerLeft: <HeaderBackButton onPress={() => {
        navigation.navigate('Decks')
      }} />
    })
  },
  AddCard: {
    screen: AddCard,
    navigationOptions: ({navigation}) => ({
      headerTintColor: white,
      title: 'Add Card',
      headerStyle: {
        backgroundColor: purple
      }
    })
  },
  Quiz: {
    screen: Quiz,
    navigationOptions: ({navigation}) => ({
      headerTintColor: white,
      title: navigation.state.params.deckId,
      headerStyle: {
        backgroundColor: purple
      }
    })
  }
})

const Appl = createAppContainer(MainNavigator)

export default class App extends React.Component {

  componentDidMount() {
    setNotification()
  }

  render() {
    return (
        <Provider store={createStore(reducer, applyMiddleware(thunk))}>
          <FlashCardsStatusBar 
            backgroundColor={purple}
            barStyle="light-content"
          />
          <Appl />
        </Provider>
        
    );
  }
}

