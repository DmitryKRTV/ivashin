import {Tag} from "./notes-reducer";

const initialState = {
    filters: [] as Tag[]
}

type InitialStateType = typeof initialState

export const filterReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case "FILTER/ADD-FILTER":
            return {
                ...state, filters: [action.payload.filter,...state.filters]
            }
        case "FILTER/DELETE-FILTER":
            return {
                ...state, filters: state.filters.filter((filter) => {
                    return filter.id !== action.payload.id
                })
            }
        case "FILTER/UPDATE-TEMP-FILTER":
            if (!state.filters.some((f) => f.id === "temp")) {
                return {
                    ...state, filters: [{title: action.payload.title, id: "temp"}, ...state.filters]
                }
            } else {
                return {
                    ...state, filters: state.filters.map((filter) => {
                        return filter.id === "temp" ? {title: action.payload.title, id: "temp"} : {...filter}
                    })
                }
            }
        case "FILTER/REMOVE-ALL-FILTER":
            return {
                ...state, filters: []
            }
        default:
            return state
    }
}

export const addFilter = (filter: Tag) => ({type: "FILTER/ADD-FILTER", payload: {filter}} as const)
export const updateTempFilter = (title: string) => ({type: "FILTER/UPDATE-TEMP-FILTER", payload: {title}} as const)
export const deleteFilter = (id: string) => ({type: "FILTER/DELETE-FILTER", payload: {id}} as const)
export const removeAllFilters = () => ({type: "FILTER/REMOVE-ALL-FILTER", payload: {}} as const)

export type AddFilterAT = ReturnType<typeof addFilter>
export type DeleteFilterAT = ReturnType<typeof deleteFilter>
export type UpdateTempFilterAT = ReturnType<typeof updateTempFilter>
export type RemoveAllFiltersAT = ReturnType<typeof removeAllFilters>

export type ActionsType = AddFilterAT | DeleteFilterAT | UpdateTempFilterAT | RemoveAllFiltersAT

