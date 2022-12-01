const initialState = {
    filter: "" as string
}

type InitialStateType = typeof initialState

export const filterReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case "FILTER/CHANGE-FILTER":
            return {
                ...state, filter: action.payload.filter
            }
        default:
            return state
    }
}

export const changeFilter = (filter: string) => ({type: "FILTER/CHANGE-FILTER", payload: {filter}} as const)

export type ChangeFilterAT = ReturnType<typeof changeFilter>

export type ActionsType = ChangeFilterAT

