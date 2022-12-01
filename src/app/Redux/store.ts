import {combineReducers, legacy_createStore} from "redux";
import {loadState, saveState} from "../../common/utils/localstorage-utils";
import {notesReducer} from "./notes-reducer";
import {filterReducer} from "./filter-reducer";

const rootReducer = combineReducers({
    filterReducer,
    notesReducer
})

export const store = legacy_createStore(rootReducer, loadState())

store.subscribe(() => {
    saveState({
        notesReducer: store.getState().notesReducer,
        filterReducer: store.getState().filterReducer
    })
})

export type RootState = ReturnType<typeof rootReducer>
export type AppStoreType = typeof store