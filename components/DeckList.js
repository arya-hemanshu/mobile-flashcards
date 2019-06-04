import React, {Component} from 'react'
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native'
import {connect} from 'react-redux'
import { receiveAllDecks } from '../actions'
import { NOTIFICATION_KEY } from '../_helper'


class DeckList extends Component {

    componentDidMount() {
        this.props.dispatch(receiveAllDecks())
      }

    onClickHandler = (key) => {
        this.props.navigation.navigate('Deck', {deckId: key})
    }

    render() {
        const data = []
        Object.keys(this.props.state).forEach(key => {
                if (key !== NOTIFICATION_KEY) {
                    data.push({'key': key})
                }
            }
            
        )
        if (data.length === 0) {
            return (
                <View style={styles.container}>
                    <Text style={styles.text}>
                        You don't have any decks, create one by clicking Add Deck
                    </Text>
                </View>
            )
        }
        return (
            <View style={{marginTop: 100}}>
                <FlatList 
                    data={data}
                    renderItem={(item) => <View style={styles.container}>
                                                <TouchableOpacity 
                                                    style={styles.record}
                                                    onPress={() => this.onClickHandler(item.item.key)}>
                                                    <Text style={styles.text}>{item.item.key}</Text>
                                                    <Text>
                                                        {`Number of cards are: ${Object.keys(JSON.parse(this.props.state[item.item.key])).length}`}
                                                    </Text>
                                                </TouchableOpacity>
                                            </View>
                                            
                                }
                />
                   
            </View>

        )
    }
}

const mapStateToProps = (state) => {
    return {
        state
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },

    record: {
        flex: 1,
        borderWidth: 1,
        margin: 5,
        padding: 10,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center'

    },

    text: {
        fontSize: 20
    }
})

export default connect(mapStateToProps)(DeckList)