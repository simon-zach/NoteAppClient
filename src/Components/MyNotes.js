import React, {useEffect} from "react";
import {useMutation,useQuery} from "@apollo/client"
import {useNavigate} from "react-router-dom";
import { Button , Card, CardGroup, Col, Spinner, Alert} from "react-bootstrap";
import AddNoteForm from "./AddNoteForm";
import {GET_MY_NOTES} from "../../src/GraphQL/Queries"
import {DELETE_NOTE,TOOGLE_FAVORITE} from "../../src/GraphQL/Mutations"
import LikesList from "./LikesList";

function MyNotes(){
    useEffect(()=>{
        refetch()
    },[])

    const navigate= useNavigate()

    const  { loading, error, data ,refetch} = useQuery(GET_MY_NOTES);

    const [deleteNote, { data2, loading2, error2, }] =  useMutation(DELETE_NOTE,{
            refetchQueries: [GET_MY_NOTES]
    })

    const [toogleLike, { data3, loading3, error3, }] =  useMutation(TOOGLE_FAVORITE,{
        refetchQueries: [GET_MY_NOTES]
    })
 
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

    const onClickToogleLike=(e)=>{
        const id = e.target.value
        toogleLike({
            variables: {id}
        })
    }
    return(
        <>
            {(loading||loading2||loading3) && <Spinner animation="border" role="status"><span className="visually-hidden">Loading...</span></Spinner>}
            {error && <Alert variant="danger">{`Error! ${error}`}</Alert>}
            {error2 && <Alert variant="danger">{`Error! ${error2}`}</Alert>}
            {error3 && <Alert variant="danger">{`Error! ${error3}`}</Alert>}
            <AddNoteForm ></AddNoteForm>
            <br/>
            {data && data.me.notes.length==0 && <h1>At this moment you don't have any notes!</h1> } 
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
                                
                                {note.favoriteCount>0 && <LikesList note={note}></LikesList>}
                            </Card.Body>
                            <Card.Footer> 
                                <Button  value={note.id} name="delete" type="submit" variant="danger" onClick={onClickDeleteNote}>Delete</Button>{' '}
                                <Button name="edit" type="submit" variant="info" onClick={()=>{navigate(`/editnote/${note.id}`)}}>Edit</Button>{' '}
                                <Button name="like" value={note.id} variant="success" onClick={onClickToogleLike}>Like</Button>{' '}
                            </Card.Footer>
                        </Card>
                    </Col>)
                    })
                }
            </CardGroup>     
        </>
    )

}
export default MyNotes;