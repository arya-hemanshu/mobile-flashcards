import React, {Component} from 'react'
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native'
import {connect} from 'react-redux'
import { addNewCard } from '../actions'

class AddCard extends Component {

    state = {
        question: '',
        answer: ''
    }

    onClickHandler = () => {

        if(this.questionExists()) {
            alert(`${this.state.question} already exists!!!`)
        } else {
            this.props.dispatch(addNewCard(this.props.deckId, {[this.state.question]: this.state.answer}))
            this.props.navigation.goBack()
        }
    }

    shouldComponentUpdate() {
        return !this.questionExists()
    }

    questionExists = () => {
        const {deckId, state} = this.props
        const currQuestions = JSON.parse(state[deckId])
        return this.state.question in currQuestions
    }

    isDisabled = () => {
        return this.state.question !== '' && this.state.answer !== ''
    }

    render() {
        return(
            <View style={styles.container}>
                <View style={{flexDirection: 'row'}}>
                    <TextInput 
                        style={styles.inputText }
                        placeholder='Enter Question'
                        onChangeText={text => this.setState({question: text})}
                    />
                </View>
                <View style={{flexDirection: 'row'}}>
                    <TextInput 
                        style={styles.inputText }
                        placeholder='Enter Answer'
                        onChangeText={text => this.setState({answer: text})}     
                    />
                </View>
                <TouchableOpacity 
                    style={styles.save}
                    onPress={this.onClickHandler}
                    disabled={!(this.isDisabled())}>
                    <Text style={{fontSize: 20}}>
                        Save
                    </Text>
                </TouchableOpacity>

            </View>
        )
    }
}

const mapStateToProps = (state, {navigation}) => {
    const {deckId} = navigation.state.params
    return {
        state,
        deckId,
        navigation
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },

    inputText: {
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

export default connect(mapStateToProps)(AddCard)