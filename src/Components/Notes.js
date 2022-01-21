import React, {useEffect,useState} from "react";
import {gql, useMutation,useQuery,useLazyQuery} from "@apollo/client"
import { Link } from "react-router-dom";
import { Button, Form , ListGroup, Card, CardGroup, Row, Col} from "react-bootstrap";

import {CREATE_NOTE, GET_NOTES} from "../../src/Queries/Queries"



function Notes(){
    const [userNotes,setUserNotes]=useState()
    const [noteText, setNoteText] = useState()
    const [noteTitle, setNoteTitle] = useState()
    const [noteColor, setNoteColor] = useState()
    const [getData, { loading, error, data }] = useLazyQuery(GET_NOTES);

    const [newNote, { data1, loading1, error1 }] =  useMutation(CREATE_NOTE, {
        onCompleted: data1 =>{
            let nowy2=[data1.newNote,...userNotes]
            setUserNotes(nowy2)
        
        }
    })

    useEffect(()=>{
        getData().then(res=>setUserNotes(res.data.me.notes))
    },[])


    if (loading1) return <p>Loading1111111111111 ...</p>;
    if (error1) return `Error1111111111! ${error}`;
    if (loading) return <p>Loading ...</p>;
    if (error) return `Error! ${error}`;

    const onChangeNote = (e) => {
        setNoteText(e.target.value)
    }
    const onChangeTitle = (e) => {
        setNoteTitle(e.target.value)
    }

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
        e.target.color.value=''
    }
    const onChangeNoteColor= (e) =>{
        setNoteColor(parseInt(e.target.value))
        
    }

    

      const selectColor = (colorNum) => {
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
        return cardColors[colorNum]
        }
      
    return(
        <>
            <Form onSubmit={onSubmitNote}>
                <Form.Group>
                    <Form.Label htmlFor="note">Create new note:</Form.Label>
                    <Form.Control required id="note" name="note" type="text" placeholder="Your note" onChange={onChangeNote}></Form.Control>
                    <Form.Label htmlFor="title">Title:</Form.Label>
                    <Form.Control required id="title" name="title" type="text" placeholder="Title" onChange={onChangeTitle}></Form.Control>
                    <br/>
                    <Form.Select required id="color" name="color" onChange={onChangeNoteColor}>
                        <option>Open this select menu</option>
                        <option value="1">Primary</option>
                        <option value="2">Secondary</option>
                        <option value="3">Success</option>
                        <option value="4">Danger</option>
                        <option value="5">Warning</option>
                        <option value="6">Info</option>
                        <option value="7">Light</option>
                        <option value="8">Dark</option>
                    </Form.Select>
                    <br/>
                    <Button type="submit">Create note</Button>
                </Form.Group>
            </Form>
            <br/>
            
     
            <CardGroup>
                
                {userNotes && userNotes.map(note=>{ 
                    
                    
                    return  <Col key={note.id} ><Card bg={selectColor(note.color)} key={note.id} style={{ width: '18rem' }} className="mb-2">
                        <Card.Header>{new Date(note.createdAt).toLocaleString()}</Card.Header>
                        <Card.Body>
                        <Card.Title>{note.title}</Card.Title>
                        <Card.Text>
                        {note.content}
                        </Card.Text>
                        </Card.Body>
                    </Card></Col>})}
                
          
            </CardGroup>
                
            
            
        </>
    )

}
export default Notes;