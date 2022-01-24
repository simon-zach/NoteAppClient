import React, {useEffect,useState} from "react";
import {gql, useMutation,useQuery,useLazyQuery} from "@apollo/client"
import { Link ,Navigate,useNavigate,useParams} from "react-router-dom";
import { Button, Form , ListGroup, Card, CardGroup, Row, Col} from "react-bootstrap";


import {GET_NOTE} from "../../src/GraphQL/Queries"
import {UPDATE_NOTE} from "../../src/GraphQL/Mutations"
function EditNote(){
    
    const params = useParams()
    const id = params.noteId;
    const [noteText, setNoteText] = useState('')
    const [noteTitle, setNoteTitle] = useState('')
    const [noteColor, setNoteColor] = useState()
    const navigate = useNavigate()

    const cardColors=[
        'primary',
        'secondary',
        'success',
        'danger',
        'warning',
        'info',
        'light',
        'dark',
      ]

    const { loading, error, data } = useQuery(GET_NOTE, 
        {
            variables: { id },
            onCompleted:data=>{
                console.log(data)
                setNoteTitle(data.note.title)
                setNoteText(data.note.content)
                setNoteColor(data.note.color)
            }
        }
        );

 
        const [updateNote, { data1, loading1, error1 }] =  useMutation(UPDATE_NOTE, {
            
            onCompleted: data1 =>{
                const refresh=1
                navigate('/mynotes');
            }
        })
        
        if (loading1) return null;
        if (error1) return `Error! ${error1}`;

      if (loading) return null;
      if (error) return `Error! ${error}`;
    

    const onChangeNote = (e) => {
        setNoteText(e.target.value)
    }
    const onChangeTitle = (e) => {
        setNoteTitle(e.target.value)
    }

    const onSubmitNote = (e) => {
        e.preventDefault();
        console.log(noteText+noteTitle+noteColor)
        updateNote({variables:{
            id: id,
            content:noteText,
            title: noteTitle,
            color: noteColor
        }})

    }
    const onChangeNoteColor= (e) =>{
        setNoteColor(parseInt(e.target.value))
        
    }


    return(<>
    <h1>ID: {params.noteId}</h1>
         <Form onSubmit={onSubmitNote}>
                <Form.Group>  
                    <Form.Label htmlFor="title">Title:</Form.Label>
                    <Form.Control required id="title" value={noteTitle} name="title" type="text" placeholder="Title" onChange={onChangeTitle}></Form.Control>
                    <Form.Label htmlFor="note">Note Text:</Form.Label>
                    <Form.Control required id="note" value={noteText} name="note" type="text" placeholder="Your note" onChange={onChangeNote}></Form.Control>
                    <br/>
                    <Form.Select required id="color" name="color" onChange={onChangeNoteColor}>
                        <option value={noteColor}>{cardColors[noteColor]}</option>
                        <option value="0">Primary</option>
                        <option value="1">Secondary</option>
                        <option value="2">Success</option>
                        <option value="3">Danger</option>
                        <option value="4">Warning</option>
                        <option value="5">Info</option>
                        <option value="6">Light</option>
                      
                    </Form.Select>
                    <br/>
                    <Button type="submit">Save note</Button>
                </Form.Group>
            </Form>    
    </>)
}

export default EditNote 

