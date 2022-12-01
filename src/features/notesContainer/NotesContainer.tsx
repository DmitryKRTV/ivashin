import React from "react";
import {useAppSelector} from "../../common/hooks/reduxHooks";
import {NoteItem} from "../noteItem/NoteItem";
import {Box} from "@mui/material";

export const NotesContainer = () => {

    const notes = useAppSelector(state => state.notesReducer.notes)

    return (
        <Box sx={{display: "flex", flexWrap: "wrap", margin: "10px"}}>
            {notes.map((note, index) => {
                return (
                    <NoteItem note={note} key={`${note.id} ${index}`}/>
                )
            })}
        </Box>
    );
};
