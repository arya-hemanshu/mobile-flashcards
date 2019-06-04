import React, {Component} from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import {connect} from 'react-redux'
import { clearNotification, setNotification } from '../_helper'

class Quiz extends Component {

    state = {
        questionsObj: {},
        questions: [],
        correctAnswer: 0,
        updated: false,
        answerView: false
    }

    componentDidMount() {
        const questions = this.getQuestions()
        this.setState({questions: Object.keys(questions), 
                        updated: true,
                        questionsObj: {...questions}})

    }

    getQuestions = () => {
        const ques = JSON.parse(this.props.state[this.props.deckId])
        const questions = {...ques}
        return questions
    }

    onShowAnswer = () => {
        clearNotification().then(setNotification)
        this.setState({answerView: true})
    }

    onValidateAnswer = (mark) => {
        const newList = this.state.questions.slice(1, this.state.questions.length)
        this.setState((prevState) => ({
            answerView: false,
            correctAnswer: prevState.correctAnswer + mark,
            updated: false,
            questions: newList
        }))
    }

    onRestartClick = () => {
        this.setState({
            answerView: false,
            correctAnswer: 0,
            questions: Object.keys(this.getQuestions())
        })
    }

    onDeckClick = () => {
        this.props.navigation.navigate('Decks')
    }

    render() {

        if(this.state.questions.length === 0 && !this.state.updated) {
            return (
                <View style={styles.container}>
                    <Text style={{fontSize: 20}}>
                        {`You have scored: ${this.state.correctAnswer}`}
                    </Text>

                    <TouchableOpacity 
                        style={[styles.show, { marginTop: 40}]}
                        onPress={this.onRestartClick}>
                        <Text style={{fontSize: 20}}>
                            Restart
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        style={[styles.show, {marginTop: 40}]}
                        onPress={this.onDeckClick}>
                        <Text style={{fontSize: 20}}>
                            Decks
                        </Text>
                    </TouchableOpacity>
                </View>
            )
        }

        if(this.state.questions.length === 0 && this.state.updated) {
            return (
                <View style={styles.container}>
                    <Text style={styles.text}>
                        No Question in the Deck
                    </Text>
                </View>
            )
        }
        
        return (
            <View style={styles.container}>

                <Text style={[styles.text, {marginTop: 40}]}>
                    {this.state.questions[0]}
                </Text>

                {
                    !this.state.answerView && (
                        <TouchableOpacity 
                            style={[styles.show, {marginTop: 40}]}
                            onPress={this.onShowAnswer}>
                            <Text style={{fontSize: 20}}>
                                Show Answer
                            </Text>
                        </TouchableOpacity>
                    )
                }

                {
                    this.state.answerView && (
                        <View style={styles.container}>
                            <Text style={{fontSize: 20}}>
                                {`Answer: ${this.state.questionsObj[this.state.questions[0]]}`}
                            </Text>

                            <TouchableOpacity 
                                style={[styles.show, {marginTop: 40}]}
                                onPress={() => this.onValidateAnswer(1)}>
                                <Text style={{fontSize: 20}}>
                                    Correct
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity 
                                style={[styles.show, {marginTop: 40}]}
                                onPress={() => this.onValidateAnswer(0)}>
                                <Text style={{fontSize: 20}}>
                                    Incorrect
                                </Text>
                            </TouchableOpacity>
                        </View>
                    )
                }
                
            
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
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        fontSize: 40
    },
    show: {
        borderWidth: 1,
        borderColor: 'gray',
        padding: 20,
        borderRadius: 10
    }
})

export default connect(mapStateToProps)(Quiz)