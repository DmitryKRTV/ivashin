import React, {ChangeEvent, useState} from "react";
import {IconButton, TextField} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {Item} from "../../common/components/item/Item";
import {addTag, deleteNote, Note, updateNote} from "../../app/Redux/notes-reducer";
import {useDispatch} from "react-redux";
import EditIcon from "@mui/icons-material/Edit";
import {useAppSelector} from "../../common/hooks/reduxHooks";
import {getHighlightedTextFromArray} from "../../common/utils/getHighlightedText";
import {v1} from "uuid";
import {updateTempFilter} from "../../app/Redux/filter-reducer";

export const NoteItem = (props: NoteItemProps) => {

    const {note} = props

    const filters = useAppSelector(state => state.filterReducer.filters)

    const [inputValue, setInputValue] = useState("");
    const [editMode, setEditMode] = useState(false);
    const [tagsTemp, setTagsTemp] = useState("");
    const dispatch = useDispatch()

    const removeNote = (id: string) => {
        dispatch(deleteNote(id))
    }

    const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.currentTarget.value.includes("#")) {
            setTagsTemp(e.currentTarget.value.split("#")[1])
            dispatch(updateTempFilter(e.currentTarget.value.split("#")[1]))
        }
        setInputValue(e.currentTarget.value)
    }

    const disactivateEditMode = () => {
        if (tagsTemp) {
            dispatch(addTag({id: v1(), title: tagsTemp}))
            setTagsTemp("")
        }
        setEditMode(false)
        dispatch(updateTempFilter(""))
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
                {note.title ? getHighlightedTextFromArray(note.title, filters.map((f)=>{return f.title})) : ""}
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
