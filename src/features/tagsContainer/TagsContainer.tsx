import React from "react";
import {TagItem} from "../tagItem/TagItem";
import {Box} from "@mui/material";
import {useAppSelector} from "../../common/hooks/reduxHooks";
import {CreateTagField} from "../createTagField/CreateTagField";


export const TagsContainer = () => {

    const tags = useAppSelector(state => state.notesReducer.tags)

    return (
        <Box sx={{display: "flex", flexWrap: "wrap", margin: "10px", alignItems: "center"}}>
            {
                tags.length > 0
                    ?
                    <>
                        {tags.map((tag, index) => {
                            return (
                                <TagItem tag={tag} key={`${tag.id} ${index}`}/>
                            )
                        })}
                        <Box>
                            <CreateTagField/>
                        </Box>
                    </>
                    : <Box>
                        <CreateTagField/>
                    </Box>
            }
        </Box>
    );
};
