import React, {Component} from 'react'
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native'
import {connect} from 'react-redux'
import { removeDeckWithId } from '../actions'

class Deck extends Component {

    onAddCard = () => {
        this.props.navigation.navigate('AddCard', {deckId: this.props.deckId})
    }

    onDeleteDeck = () => {
        this.props.dispatch(removeDeckWithId(this.props.deckId))
        this.props.navigation.navigate('Decks')
    }

    shouldComponentUpdate(nextProps) {
        return this.props.deckId in nextProps.state
    }

    onStartQuiz = () => {
        this.props.navigation.navigate('Quiz', {deckId: this.props.deckId})
    }

    render() {
        if(!(this.props.deckId in this.props.state) ){
            return null
        }
        const {state, deckId} = this.props
        return (
            <View style={styles.container}>
                <Text style={{fontSize: 40}}>{deckId}</Text>
                <Text style={[styles.beSpokeMargin, {fontSize: 20}]}>
                {`Number of cards are: ${Object.keys(JSON.parse(state[deckId])).length}`}
                </Text>
                <TouchableOpacity 
                    style={[styles.button, styles.beSpokeMargin]}
                    onPress={this.onAddCard}>
                    <Text style={styles.text}>
                        Add Card
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={[styles.button, styles.beSpokeMargin, 
                            {backgroundColor: 'black'}]}
                    onPress={this.onStartQuiz}>
                    <Text style={[styles.text, {color: 'white'}]}>
                        Start Quiz
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={styles.beSpokeMargin}
                    onPress={this.onDeleteDeck}>
                    <Text styles={{color: 'blue'}}>
                        Delete Deck
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        marginTop: 40,
    },

    beSpokeMargin: {
        marginTop: 30
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
    },

    button: {
        borderRadius: 10,
        borderWidth: 1,
        padding: 20,
    }
})

const mapStateToProps = (state, {navigation}) => {
    const {deckId} = navigation.state.params

    return {
        deckId,
        state,
        navigation
    }
}

export default connect(mapStateToProps)(Deck)