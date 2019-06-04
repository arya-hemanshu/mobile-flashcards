import { RECEIVE_DECKS, ADD_DECK, ADD_CARD, REMOVE_DECK } from '../actions'

const decks = (state = {}, action) => {
    switch(action.type) {
        case RECEIVE_DECKS:
            return {
                ...state,
                ...action.decks
            }
        case ADD_DECK:
            return {
                ...state,
                [action.deck]: JSON.stringify({})
            }
        case ADD_CARD:
            const oldCards = JSON.parse(state[action.deckId])
            return {
                ...state,
                [action.deckId]: JSON.stringify({
                    ...oldCards,
                    [Object.keys(action.card)[0]]: action.card[Object.keys(action.card)[0]]
                })
            }
        case REMOVE_DECK:
            const obj = Object.assign({}, state)
            delete obj[action.deckId]
            return obj

        default:
            return state
    }
}

export default decks