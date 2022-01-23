import React, {useEffect} from "react";
import {useMutation,useQuery} from "@apollo/client"
import { Link, } from "react-router-dom";
import { Button , Card, CardGroup, Col} from "react-bootstrap";
import {GET_NOTES, DELETE_NOTE} from "../../src/Queries/Queries"
import AddNoteForm from "./AddNoteForm";


function Notes(){
  
    useEffect(()=>{
        refetch()
    },[])

    const  { loading, error, data ,refetch} = useQuery(GET_NOTES);


    const [deleteNote, { data2, loading2, error2, }] =  useMutation(DELETE_NOTE,{
            refetchQueries: [GET_NOTES]
    })
     
    if (loading) return <p>Loading ...</p>;
    if (error) return `Error! ${error}`;

    if (loading2) return <p>Loading ...</p>;
    if (error2) return `Error! ${error2}`;
  
      const onClickDeleteNote = (e) => {
        deleteNote({variables:
        {id:e.target.value}})
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
          <AddNoteForm ></AddNoteForm>
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