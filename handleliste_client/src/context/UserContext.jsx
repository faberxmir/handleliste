import {createContext, useReducer} from 'react'

export const UserContext = createContext()

export const userReducer = (state, action) => {
    switch(action.type){
        case 'AUTHORIZED':
            return {
                user: action.payload
            }
        case 'NOT_AUTHORIZED':
            return {
                user: null
            }
        default:
            return state
    }
}

export const UserContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(userReducer, {
        user: null
    })

    return (
        <UserContext.Provider value={{...state, dispatch}}>
            {children}
        </UserContext.Provider>
    )
}