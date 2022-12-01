import {Paper, styled} from "@mui/material";


export const Item = styled(Paper)(({theme}) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    margin: "0 10px 10px 0",
    color: theme.palette.text.secondary,
}));