import React from "react";
import {Chip, IconButton} from "@mui/material";
import {Item} from "../../common/components/item/Item";
import {deleteTag, Tag} from "../../app/Redux/notes-reducer";
import {useDispatch} from "react-redux";
import CloseIcon from "@mui/icons-material/Close";
import {useAppSelector} from "../../common/hooks/reduxHooks";
import {changeFilter} from "../../app/Redux/filter-reducer";

export const TagItem = (props: TagItemProps) => {

    const filter = useAppSelector(state => state.filterReducer.filter)

    const {tag} = props

    const dispatch = useDispatch()

    const removeTag = (id: string) => {
        dispatch(deleteTag(id))
    }

    const setFilter = (title: string) => {
        console.log(title)
        console.log(filter)
        if (filter === title) {
            dispatch(changeFilter(""))
            return
        }
        dispatch(changeFilter(title))
    }

    return (
        <Item>
            <Chip sx={{cursor: "pointer"}}
                  label={`${tag.title}`}
                  color="primary"
                  variant={filter === tag.title ? "filled" : "outlined"}
                  onClick={() => {
                      setFilter(tag.title)
                  }}

            />
            <IconButton aria-label="delete"
                        onClick={() => {
                            removeTag(tag.id)
                        }}
            >
                <CloseIcon color={"primary"}/>
            </IconButton>
        </Item>
    )
};

type TagItemProps = {
    tag: Tag
}
