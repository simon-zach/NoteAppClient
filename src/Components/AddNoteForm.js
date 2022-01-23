import React, {useState} from "react";
import { Button, Form } from "react-bootstrap";
import {CREATE_NOTE, GET_NOTES, DELETE_NOTE} from "../../src/Queries/Queries"
import {useMutation} from "@apollo/client"

function AddNoteForm(){

    const [noteText, setNoteText] = useState()
    const [noteTitle, setNoteTitle] = useState()
    const [noteColor, setNoteColor] = useState()

    const onChangeNote = (e) => {
        setNoteText(e.target.value)
    }
    const onChangeTitle = (e) => {
        setNoteTitle(e.target.value)
    }

    const [newNote, { data1, loading1, error1 }] =  useMutation(CREATE_NOTE, {
            refetchQueries: [GET_NOTES]
    })

    if (loading1) return <p>loading ...</p>;
    if (error1) return `Error! ${error1}`;

    const onSubmitNote = (e) => {
        e.preventDefault();
        newNote({variables:{
            content:noteText,
            title: noteTitle,
            color: noteColor
        }})
        //console.log(noteText+noteTitle+typeof(noteColor))
        e.target.note.value=''
        e.target.title.value=''
        e.target.color.value='Select Color'
    }
    const onChangeNoteColor= (e) =>{
        setNoteColor(parseInt(e.target.value))
        
    }
 
    return(
            <Form onSubmit={onSubmitNote}>
            <Form.Group>
                <Form.Label htmlFor="note">Create new note:</Form.Label>
                <Form.Control required id="note" name="note" type="text" placeholder="Your note" onChange={onChangeNote}></Form.Control>
                <Form.Label htmlFor="title">Title:</Form.Label>
                <Form.Control required id="title" name="title" type="text" placeholder="Title" onChange={onChangeTitle}></Form.Control>
                <br/>
                <Form.Select required id="color" name="color" onChange={onChangeNoteColor}>
                    <option>Select Color</option>
                    <option value="0">Primary</option>
                    <option value="1">Secondary</option>
                    <option value="2">Success</option>
                    <option value="3">Danger</option>
                    <option value="4">Warning</option>
                    <option value="5">Info</option>
                    <option value="6">Light</option>
                
                </Form.Select>
                <br/>
                <Button type="submit">Create note</Button>
            </Form.Group>
        </Form>
    )
}
export default AddNoteForm