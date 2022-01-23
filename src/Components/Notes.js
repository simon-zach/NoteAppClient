import React, {useEffect,useState} from "react";
import {gql, useMutation,useQuery,useLazyQuery} from "@apollo/client"
import { Link, useNavigate, useHistory, useParams } from "react-router-dom";
import { Button, Form , ListGroup, Card, CardGroup, Row, Col} from "react-bootstrap";

import {CREATE_NOTE, GET_NOTES, DELETE_NOTE} from "../../src/Queries/Queries"
import EditNote from "./EditNote";



function Notes(){
    const [userNotes,setUserNotes]=useState()
    const [noteText, setNoteText] = useState()
    const [noteTitle, setNoteTitle] = useState()
    const [noteColor, setNoteColor] = useState()
    const [refresh, setRefresh] = useState(0)
  
  
    const navigate = useNavigate()
    const  { loading, error, data ,refetch} = useQuery(GET_NOTES,{
            onCompleted:(data)=>{
            //setUserNotes(data.me.notes)
            }
    });

    const [newNote, { data1, loading1, error1 }] =  useMutation(CREATE_NOTE, {
        onCompleted: data1 =>{
            /*
            let nowy2=[data1.newNote,...userNotes]
            setUserNotes(nowy2)
        */
        },
            refetchQueries: [GET_NOTES]
    })

    const [deleteNote, { data2, loading2, error2, }] =  useMutation(DELETE_NOTE,{
            refetchQueries: [GET_NOTES]
    })
   
  
    
    useEffect(()=>{
        refetch()
    },[])

    if (loading2) return <p>Loading ...</p>;
    if (error2) return `Error! ${error}`;
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
        e.target.color.value='Select Color'
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
      const onClickDeleteNote = (e) => {
        deleteNote({variables:
        {id:e.target.value}})
      /*  .then(()=>{
            let filteredNotes=[]
            filteredNotes=userNotes.filter(note=>note.id!=e.target.value)
            setUserNotes(filteredNotes)
        })*/
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
            <br/>
            
     
            <CardGroup>
                
                {
                data && data.me.notes.map(note=>{ 
                  return  (
                    <Col key={note.id} >
                        <Card bg={selectColor(note.color)} key={note.id} style={{ width: '18rem' }} className="mb-2">
                            <Card.Header>{new Date(note.createdAt).toLocaleString()}</Card.Header>
                            <Card.Body>
                                <Card.Title>{note.title}</Card.Title>
                                <Card.Text>{note.content}</Card.Text>
                            </Card.Body>
                            <Card.Footer> 
                                <Button  value={note.id} name="delete" type="submit" variant="danger" onClick={onClickDeleteNote}>Delete</Button>{' '}
                                <Link to={`/editnote/${note.id}`}>
                                    <Button name="edit" type="submit" variant="info">Edit</Button>{' '}
                                </Link>
                                
                            </Card.Footer>
                        </Card>
                    </Col>)
                    })
                }
                
          
            </CardGroup>
                
            
            
        </>
    )

}
export default Notes;