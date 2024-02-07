import { SERVER_BASE_URL } from '../../config/config'
import { updateDoc, arrayUnion } from 'firebase/firestore'

export function getReceiverFromEncounterId(input) {
    const parts = input.split('_')
    if (parts.length > 1) {
        return parts[1]
    } else {
        return null
    }
}

export const getStreamingUrl = (isOnboarding, hasActiveEncounter) => {
    if (isOnboarding) {
        return `${SERVER_BASE_URL}/onboardingStreaming`
    } else if (hasActiveEncounter) {
        return `${SERVER_BASE_URL}/encounterStreaming`
    } else {
        return `${SERVER_BASE_URL}/chatStreaming`
    }
}

export const messageListReducer = (state, action) => {
    // console.log('messageListReducer', action)
    switch (action.type) {
        case 'SET_MESSAGES':
            // Filter out messages where role is 'function'
            const filteredMessages = action.messages.filter(
                (message) => message.role !== 'function'
            )
            return filteredMessages
        case 'APPEND_CONTENT':
            return state.map((message, index) => {
                // console.log('message', message)
                if (
                    index === state.length - 1 &&
                    message.role === 'assistant'
                ) {
                    return {
                        ...message,
                        content: message.content + action.content,
                    }
                } else {
                    return message
                }
            })
        case 'ADD_MESSAGE':
            return [...state, action.message]
        case 'ADD_SYSTEM_MESSAGE':
            return [...state, action.message]
        default:
            throw new Error()
    }
}

export const isJsonString = (str) => {
    try {
        JSON.parse(str)
    } catch (e) {
        return false
    }
    return true
}
