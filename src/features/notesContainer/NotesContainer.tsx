import React from "react";
import {useAppSelector} from "../../common/hooks/reduxHooks";
import {NoteItem} from "../noteItem/NoteItem";
import {Box, Button} from "@mui/material";
import {Tag} from "../../app/Redux/notes-reducer";
import {removeAllFilters} from "../../app/Redux/filter-reducer";
import {useDispatch} from "react-redux";
import {Item} from "../../common/components/item/Item";

export const NotesContainer = () => {

    const filters = useAppSelector(state => state.filterReducer.filters)
    const notes = useAppSelector(state => state.notesReducer.notes)

    const dispatch = useDispatch()

    const getFilteredArray = (filters: Tag[]) => {
        if (filters.length > 0) {
            return notes.filter((note) => {
                return (
                    filters.every((filter) => {
                        return note.title.includes(filter.title)
                    })
                )
            })
        } else {
            return notes
        }
    }

    const finalArray = getFilteredArray(filters)

    const removeFilters = () => {
        dispatch(removeAllFilters())
    }

    return (
        notes.length > 0
            ? <>
                <Box sx={{display: "flex", flexWrap: "wrap", margin: "10px"}}>
                    {
                        !(finalArray.length === 0)
                            ? finalArray.map((note, index) => {
                                return (
                                    <NoteItem note={note} key={`${note.id} ${index}`}/>
                                )
                            })
                            : <Item sx={{margin: "5px 0 0 0"}}>Notes not found!</Item>
                    }
                </Box>
                <Box>
                    <Button
                        sx={{margin: "11.5px 10px 5px 10px"}}
                        variant={"contained"}
                        color={"primary"}
                        onClick={removeFilters}
                    >
                        Remove all Filters
                    </Button>
                </Box>
            </>
            : <></>
    );
};
