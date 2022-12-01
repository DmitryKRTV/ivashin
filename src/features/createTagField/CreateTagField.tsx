import React, {useState} from "react";
import {Box, FormControl, FormGroup, IconButton, TextField} from "@mui/material";
import {useDispatch} from "react-redux";
import {useFormik} from "formik";
import {addTag} from "../../app/Redux/notes-reducer";
import {v1} from "uuid";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

export const CreateTagField = () => {

    const dispatch = useDispatch()

    const formik = useFormik({
        initialValues: {
            fieldValue: "",
        },
        validate: (values) => {
            const errors: FormikErrorType = {}
            if (!values.fieldValue) {
                errors.fieldValue = "Required"
            }
            return errors
        },
        onSubmit: values => {
            dispatch(addTag({id: v1(), title: values.fieldValue}))
            formik.resetForm()
        },
    })

    const [editMode, setEditMode] = useState(false);

    const disactivateEditMode = () => {
        setEditMode(false)
        formik.submitForm()
    }

    const activateEditMode = () => {
        setEditMode(true)
    }


    return (
        <Box>
            <form onSubmit={formik.handleSubmit}>
                <FormControl>
                    <FormGroup row>
                        {
                            editMode
                                ?
                                <>
                                    <TextField id="outlined-basic"
                                               label="Tag"
                                               variant="outlined"
                                               sx={{margin: "0 0 10px 0"}}
                                               {...formik.getFieldProps("fieldValue")}
                                               autoFocus
                                               onBlur={disactivateEditMode}
                                    />
                                    <IconButton aria-label="add" type={"submit"}
                                                sx={{margin: "10px", height: "40px", width: "40px"}}
                                                onClick={disactivateEditMode}
                                    >
                                        <AddCircleOutlineIcon/>
                                    </IconButton>
                                </>
                                :
                                <IconButton aria-label="add"
                                            sx={{margin: "0 0 5px 0", height: "40px", width: "40px"}}
                                            onClick={activateEditMode}
                                >
                                    <AddCircleOutlineIcon/>
                                </IconButton>
                        }

                    </FormGroup>
                </FormControl>
            </form>
        </Box>
    );
};

type FormikErrorType = {
    fieldValue?: string
}

