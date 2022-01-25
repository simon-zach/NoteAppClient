import React, {useEffect} from "react";
import {useMutation,useQuery} from "@apollo/client"
import { Button , Card, CardGroup, Col, Spinner,Alert} from "react-bootstrap";
import LikesList from "./LikesList";
import {GET_ALL_NOTES} from "../../src/GraphQL/Queries"
import {DELETE_NOTE,TOOGLE_FAVORITE} from "../../src/GraphQL/Mutations"


function AllNotes(){
  
    useEffect(()=>{
        refetch()
    },[])
    
    const  { loading, error, data , refetch} = useQuery(GET_ALL_NOTES);
    
    const [deleteNote, { data2, loading2, error2, }] =  useMutation(DELETE_NOTE,{
            refetchQueries: [GET_ALL_NOTES]
    })

    const [toogleLike, { data3, loading3, error3, }] =  useMutation(TOOGLE_FAVORITE,{
        refetchQueries: [GET_ALL_NOTES]
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
            <br/>
            {(loading||loading2||loading3) && <Spinner animation="border" role="status"><span className="visually-hidden">Loading...</span></Spinner>}
            {error && <Alert variant="danger">{`Error! ${error}`}</Alert>}
            {error2 && <Alert variant="danger">{`Error! ${error2}`}</Alert>}
            {error3 && <Alert variant="danger">{`Error! ${error3}`}</Alert>}

            {data && data.notes.length==0 && <h1>At this moment there is no notes in app!</h1> }
            <CardGroup>
                {
                data && data.notes.map(note=>{ 
                  return  (
                    <Col key={note.id} >
                        <Card bg={selectColor(note.color)} key={note.id} style={{ width: '18rem' }} className="mb-2">
                            <Card.Header>
                                {new Date(note.createdAt).toLocaleString()}
                            </Card.Header>
                            <Card.Body>
                                <Card.Text> <img style={{ width: '2rem' }} src={note.author.avatar}></img> <span>{note.author.username}</span></Card.Text>
                                <Card.Title>{note.title}</Card.Title>
                                <Card.Text>{note.content}</Card.Text>
                                {note.favoriteCount>0 && <LikesList note={note}></LikesList>}
                            </Card.Body>
                            <Card.Footer> 
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
export default AllNotes;