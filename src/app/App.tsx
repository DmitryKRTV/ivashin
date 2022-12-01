import React from "react";
import "./App.scss";
import {Container} from "@mui/material";
import {TagsContainer} from "../features/tagsContainer/TagsContainer";
import {NotesContainer} from "../features/notesContainer/NotesContainer";
import {CreateNoteField} from "../features/createNoteField/CreateNoteField";


function App() {
    return (
        <div className="App">
            <Container maxWidth="lg">
                <CreateNoteField/>
                <TagsContainer/>
                <NotesContainer/>
            </Container>

        </div>
    );
}

export default App;

