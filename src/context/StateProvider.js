import { useReducer, createContext, useContext } from "react"

const StateContext = createContext()

function StateProvider({ children, reducer, intialState }) {
    return (
        <StateContext.Provider value={useReducer(reducer, intialState)}  >
            {children}
        </StateContext.Provider>
    )
}

export const useStateValue = () => useContext(StateContext)

export default StateProvider