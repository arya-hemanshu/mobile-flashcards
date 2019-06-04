import { AsyncStorage } from 'react-native'
import { Notifications, Permissions } from 'expo'


export const NOTIFICATION_KEY = 'mobileflashcards:notifications'


export const _saveNewDeck = (deck) => {
    return AsyncStorage.setItem(deck, JSON.stringify({}))
}

export const _getAllDecks = async () => {
    const keys = await AsyncStorage.getAllKeys()
    const decks = await AsyncStorage.multiGet(keys)
    const rObj = {}

    decks.forEach(deck => {
        rObj[deck[0]] = deck[1]
    })
    return JSON.stringify( rObj )
}

export const _saveNewCard = (deckId, card) => {
    return AsyncStorage.getItem(deckId)
                .then(data => {
                    const jParse = JSON.parse(data)
                    let obj = {}
                    obj[`${Object.keys(card)[0]}`] = card[Object.keys(card)[0]]
                    const d = {...obj, ...jParse}
                    return AsyncStorage.setItem(deckId, JSON.stringify(d))
                })
}

export const _removeDeck = deckId => {
    return AsyncStorage.removeItem(deckId)
}

export const clearNotification = () => {
    return AsyncStorage.removeItem(NOTIFICATION_KEY)
            .then(Notifications.cancelAllScheduledNotificationsAsync)
}

const createNotification = () => {
    return {
        title: 'Play Flash Cards',
        body: 'Dont forget to play today',
        ios: {
            sound: true
        }, 
        android: {
            sound: true,
            priority: 'high',
            sticky: false,
            vibrate: true
        }
    }
}

export const setNotification = () => {

    AsyncStorage.getItem(NOTIFICATION_KEY)
      .then(JSON.parse)
      .then(data => {
        if (data === null) {
          Permissions.askAsync(Permissions.NOTIFICATIONS)
            .then(({status}) => {
              if(status === 'granted') {
                Notifications.cancelAllScheduledNotificationsAsync()

                let tomorrow = new Date()
                tomorrow.setDate(tomorrow.getDate() + 1)
                tomorrow.setHours(16)
                tomorrow.setMinutes(28)

                Notifications.scheduleLocalNotificationAsync(
                  createNotification(),
                  {
                    time: tomorrow,
                    repeat: 'day'
                  }
                )

                AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
              }
            })
        }
      })
}