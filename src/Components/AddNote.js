import React, {useState} from "react";
import { useMutation,gql } from "@apollo/client";
import { useNavigate } from "react-router-dom";

 const CREATE_NOTE = gql`
 mutation($content: String!){
    newNote(content: $content) {
      content
    }
  }
     `

function AddNote(){
    let navigate = useNavigate();
    const [noteText, setNoteText] = useState()

    const [newNote, {loading, error}] = useMutation(CREATE_NOTE, {
        onCompleted: data =>{
            console.log(data.newNote);
           
            navigate("/notes");
        }
    })

    

    const onChangeNote = (e) => {
        setNoteText(e.target.value)
        console.log(e.target.value)
    }

    const onSubmitNote = (e) => {
        e.preventDefault();
        newNote({variables:{
            content:noteText
        }})
    }

    return(<>
    
        <form onSubmit={onSubmitNote}>
            <label htmlFor="note">Treść notatki</label>
            <input required id="note" name="note" type="text" placeholder="Twoja notatka" onChange={onChangeNote}></input>
            <button>Create note</button>
        </form>
    
    </>)
}

export default AddNote