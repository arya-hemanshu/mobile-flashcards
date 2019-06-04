import React, {Component} from 'react'
import { View, 
            Text, 
            StyleSheet, 
            TextInput,
            TouchableOpacity } from 'react-native'
import {connect} from 'react-redux'
import { addNewDeck } from '../actions'

class AddDeck extends Component {

    state = {
        deckTitle: ''
    }

    onClickHandler = () => {

        if ( this.state.deckTitle in this.props.state ) {
            alert(`${this.state.deckTitle} already exists!!!`)
        } else {
            this.props.dispatch(addNewDeck(this.state.deckTitle))
            this.props.navigation.navigate('Deck', {deckId: this.state.deckTitle})
        }
    }

    shouldComponentUpdate(nextProps) {
        return !(this.state.deckTitle in nextProps.state)
    }

    isDisabled = () => {
        return this.state.deckTitle === ''
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>
                    What is the title of your new Deck?
                </Text>
                <View style={{flexDirection: 'row'}}>
                    <TextInput 
                        style={styles.deckText}
                        onChangeText={text => this.setState({deckTitle: text})}
                        value={this.state.deckTitle}
                    />
                </View>

                <TouchableOpacity style={styles.save} 
                                onPress={this.onClickHandler}
                                disabled={this.isDisabled()}>
                    <Text style={styles.title}>
                        Save
                    </Text>
                </TouchableOpacity>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        fontSize: 20
    },
    deckText: {
        flex: 1,
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        margin: 20
    },
    save: {
        borderWidth: 1,
        borderColor: 'gray',
        padding: 20,
        borderRadius: 10
    }
})


const mapStateToProps = (state, {navigation}) => {

    return {
        state,
        navigation
    }
}

export default connect(mapStateToProps)(AddDeck)