import { doc, getDoc } from 'firebase/firestore'
import { db } from '../config/firebase'

export function getUserDetail(id) {
    return new Promise(async (resolve, reject) => {
        const docRef = doc(db, 'Users', id)
        getDoc(docRef)
            .then((response) => {
                const data = response.data()
                return resolve({ response, data })
            })
            .catch((error) => {
                return reject(error)
            })
    })
}

export function getEncounterInformation(id) {
    return new Promise(async (resolve, reject) => {
        const docRef = doc(db, 'Encounters', id)
        getDoc(docRef)
            .then((response) => {
                const data = response.data()
                return resolve({ response, data })
            })
            .catch((error) => {
                return reject(error)
            })
    })
}
export function getChatSessions(id) {
    return new Promise(async (resolve, reject) => {
        const docRef = doc(db, 'ChatSession', id)
        getDoc(docRef)
            .then((response) => {
                const data = response.data()
                return resolve({ response, data })
            })
            .catch((error) => {
                return reject(error)
            })
    })
}
