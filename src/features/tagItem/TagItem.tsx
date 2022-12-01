import React from "react";
import {Chip, IconButton} from "@mui/material";
import {Item} from "../../common/components/item/Item";
import {deleteTag, Tag} from "../../app/Redux/notes-reducer";
import {useDispatch} from "react-redux";
import CloseIcon from "@mui/icons-material/Close";
import {useAppSelector} from "../../common/hooks/reduxHooks";
import {addFilter, deleteFilter} from "../../app/Redux/filter-reducer";

export const TagItem = (props: TagItemProps) => {

    const filters = useAppSelector(state => state.filterReducer.filters)

    const {tag} = props

    const dispatch = useDispatch()

    const removeTag = (id: string) => {
        dispatch(deleteTag(id))
        dispatch(deleteFilter(id))
    }

    const setFilter = (title: string, id: string) => {
        if (filters.some((filter)=>{ return filter.title === tag.title })) {
            dispatch(deleteFilter(id))
            return
        }
        dispatch(addFilter(tag))
    }

    const getVariant = () => {
        if (filters) {
            return filters.some((filter)=>{ return filter.title === tag.title }) ? "filled" : "outlined"
        }
    }

    return (
        <Item>
            <Chip sx={{cursor: "pointer"}}
                  label={`${tag.title}`}
                  color="primary"
                  variant={getVariant()}
                  onClick={() => {
                      setFilter(tag.title, tag.id)
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
