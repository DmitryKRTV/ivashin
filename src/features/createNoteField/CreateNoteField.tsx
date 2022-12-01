import React, {useState} from "react";
import {Box, Button, FormControl, FormGroup, TextField} from "@mui/material";
import {useDispatch} from "react-redux";
import {useFormik} from "formik";
import {addNote, addTag} from "../../app/Redux/notes-reducer";
import {v1} from "uuid";
import {updateTempFilter} from "../../app/Redux/filter-reducer";


export const CreateNoteField = () => {

    const dispatch = useDispatch()

    const [tagsTemp, setTagsTemp] = useState("");

    const formik = useFormik({
        initialValues: {
            fieldValue: "",
        },
        validate: (values) => {
            const errors: FormikErrorType = {}
            if (!values.fieldValue) {
                errors.fieldValue = "Required"
            }
            if (values.fieldValue.includes("#")) {
                setTagsTemp(values.fieldValue.split("#")[1])
                setTempFilter(values.fieldValue.split("#")[1])
            }
            return errors
        },
        onSubmit: values => {
            if (tagsTemp) {
                dispatch(addTag({id: v1(), title: tagsTemp}))
                dispatch(updateTempFilter(""))
                setTagsTemp("")
            }
            dispatch(addNote({id: v1(), title: values.fieldValue}))
            clearFilter()
            formik.resetForm()
        },
    })

    const setTempFilter = (title: string) => {
        dispatch(updateTempFilter(title))
    }

    const clearFilter = () => {
        if (!tagsTemp || formik.values.fieldValue === "") setTempFilter("")
    }

    return (
        <Box>
            <form onSubmit={formik.handleSubmit}>
                <FormControl>
                    <FormGroup row>
                        <TextField id="outlined-basic"
                                   label="Note"
                                   variant="outlined"
                                   sx={{margin: "10px 10px 0 10px"}}
                                   {...formik.getFieldProps("fieldValue")}
                                   onBlur={clearFilter}
                        />
                        <Button sx={{margin: "11.5px 10px 5px 10px"}} type={"submit"} variant={"contained"}
                                color={"primary"}>Create</Button>
                    </FormGroup>
                </FormControl>
            </form>
        </Box>
    );
};

type FormikErrorType = {
    fieldValue?: string
}

