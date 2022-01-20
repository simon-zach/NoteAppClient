import React, {useEffect,useState} from "react";
import {gql, useMutation,useQuery,useLazyQuery} from "@apollo/client"
import { Link } from "react-router-dom";
import { Button, Form } from "react-bootstrap";

import {CREATE_NOTE, GET_NOTES} from "./Queries/Queries"



function Notes(){
    const [userNotes,setUserNotes]=useState()
    const [noteText, setNoteText] = useState()
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
    //if (loading) return <p>Loading ...</p>;
    //if (error) return `Error! ${error}`;

    const onChangeNote = (e) => {
        setNoteText(e.target.value)
    }

    const onSubmitNote = (e) => {
        e.preventDefault();
        newNote({variables:{
            content:noteText
        }})
        e.target.note.value=''
  
    }

    return(
        <>
            <Form onSubmit={onSubmitNote}>
                <Form.Group>
                    <Form.Label htmlFor="note">New Note</Form.Label>
                    <Form.Control required id="note" name="note" type="text" placeholder="Your note" onChange={onChangeNote}></Form.Control>
                    <br/>
                    <Button type="submit">Create note</Button>
                </Form.Group>
            </Form>
            <p>My notes:</p>
     
            
           {userNotes && userNotes.map(note=>{ return <div key={note.id}>{note.content}</div>})}
        </>
    )

}
export default Notes;