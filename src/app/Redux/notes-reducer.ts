const initialState = {
    notes: [] as Note[],
    tags: [] as Tag[],
}

type InitialStateType = typeof initialState

export const notesReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case "NOTES/ADD-NOTE":
            return {
                ...state, notes: [action.payload.note, ...state.notes]
            }
        case "NOTES/DELETE-NOTE":
            return {
                ...state, notes: state.notes.filter((note) => note.id !== action.payload.id)
            }
        case "NOTES/UPDATE-NOTE":
            return {
                ...state, notes: state.notes.map((note) => note.id === action.payload.id
                    ? {...note, title: action.payload.title} : {...note})
            }
        case "NOTES/ADD-TAG":
            if (!state.tags.some((tag) => {
                return tag.title === action.payload.tag.title
            })) {
                return {
                    ...state, tags: [action.payload.tag, ...state.tags]
                }
            }
            return state
        case "NOTES/DELETE-TAG":
            return {
                ...state, tags: state.tags.filter((tags) => tags.id !== action.payload.id)
            }
        default:
            return state
    }
}

export const addNote = (note: Note) => ({type: "NOTES/ADD-NOTE", payload: {note}} as const)
export const deleteNote = (id: string) => ({type: "NOTES/DELETE-NOTE", payload: {id}} as const)
export const updateNote = (id: string, title: string) => ({type: "NOTES/UPDATE-NOTE", payload: {id, title}} as const)

export const addTag = (tag: Tag) => ({type: "NOTES/ADD-TAG", payload: {tag}} as const)
export const deleteTag = (id: string) => ({type: "NOTES/DELETE-TAG", payload: {id}} as const)

export type AddNoteAT = ReturnType<typeof addNote>
export type DeleteNoteAT = ReturnType<typeof deleteNote>
export type UpdateNoteAT = ReturnType<typeof updateNote>
export type AddTagAT = ReturnType<typeof addTag>
export type DeleteTagAT = ReturnType<typeof deleteTag>

export type ActionsType = AddNoteAT | DeleteNoteAT | UpdateNoteAT | AddTagAT | DeleteTagAT

export type Note = {
    id: string,
    title: string,
}

export type Tag = {
    id: string,
    title: string,
}
