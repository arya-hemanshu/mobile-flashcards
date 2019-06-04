import { _saveNewDeck, _getAllDecks, _saveNewCard, _removeDeck } from '../_helper'

export const RECEIVE_DECKS = 'RECEIVE_DECKS'
export const ADD_DECK = 'ADD_DECK'
export const ADD_CARD = 'ADD_CARD'
export const REMOVE_DECK = 'REMOVE_DECK'

const receiveDecks = decks => {
    return {
        type: RECEIVE_DECKS,
        decks
    }
}

const addDeck = deck => {
    return {
        type: ADD_DECK,
        deck
    }
}

const addCard = (deckId, card) => {
    return {
        type: ADD_CARD,
        deckId,
        card
    }
}

const removeDeck = deckId => {
    return {
        type: REMOVE_DECK,
        deckId
    }
}

export const addNewDeck = (deck) => {
    return dispatch => {
        return _saveNewDeck(deck)
                .then(() => {
                    dispatch(addDeck(deck))
                })
    }

}

export const receiveAllDecks = () => {
    return dispatch => {
        return _getAllDecks()
                .then(decks => {
                    dispatch(receiveDecks(JSON.parse(decks)))
                })
    }
}

export const addNewCard = (deckId, card) => {
    return dispatch => {
        return _saveNewCard(deckId, card)
                .then(() => {
                    dispatch(addCard(deckId, card))
                })
    }
}

export const removeDeckWithId = deckId => {
    return dispatch => {
        return _removeDeck(deckId)
                .then(() => {
                    dispatch(removeDeck(deckId))
                })
    }
}