import React, {ChangeEvent, useState} from "react";
import {IconButton, TextField} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {Item} from "../../common/components/item/Item";
import {deleteNote, Note, updateNote} from "../../app/Redux/notes-reducer";
import {useDispatch} from "react-redux";
import EditIcon from "@mui/icons-material/Edit";
import {useAppSelector} from "../../common/hooks/reduxHooks";
import {getHighlightedText} from "../../common/utils/getHighlightedText";

export const NoteItem = (props: NoteItemProps) => {

    const {note} = props

    const filter = useAppSelector(state => state.filterReducer.filter)

    const [inputValue, setInputValue] = useState("");
    const [editMode, setEditMode] = useState(false);
    const dispatch = useDispatch()

    const removeNote = (id: string) => {
        dispatch(deleteNote(id))
    }

    const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.currentTarget.value)
    }

    const disactivateEditMode = () => {
        setEditMode(false)
        dispatch(updateNote(note.id, inputValue))
    }

    const activateEditMode = () => {
        setEditMode(true)
        setInputValue(note.title)
    }



    return (
        editMode
            ? <TextField value={inputValue}
                         variant={"standard"}
                         type="text"
                         onBlur={disactivateEditMode}
                         onChange={onChangeTitle}
                         autoFocus
                         sx={{padding: "8px"}}
            />
            : <Item onDoubleClick={activateEditMode}>
                {note.title ? getHighlightedText(note.title, filter) : ""}
                <IconButton aria-label="delete"
                            onClick={() => {
                                removeNote(note.id)
                            }}
                >
                    <Delete/>
                </IconButton>
                <IconButton aria-label="update"
                            onClick={activateEditMode}
                >
                    <EditIcon/>
                </IconButton>
            </Item>
    )
};

type NoteItemProps = {
    note: Note
}
