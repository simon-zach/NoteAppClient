import React, {useEffect} from "react";
import {useMutation,useQuery} from "@apollo/client"
import { useNavigate} from "react-router-dom";
import { Button , Card, CardGroup, Col,Accordion} from "react-bootstrap";
import LikesList from "./LikesList";
import {GET_ALL_NOTES} from "../../src/GraphQL/Queries"
import {DELETE_NOTE,TOOGLE_FAVORITE} from "../../src/GraphQL/Mutations"


function AllNotes(){
  
    useEffect(()=>{
        refetch()
    },[])
    const navigate= useNavigate()
    

    const  { loading, error, data , refetch} = useQuery(GET_ALL_NOTES);
    

    const [deleteNote, { data2, loading2, error2, }] =  useMutation(DELETE_NOTE,{
            refetchQueries: [GET_ALL_NOTES]
    })

    const [toogleLike, { data3, loading3, error3, }] =  useMutation(TOOGLE_FAVORITE,{
        refetchQueries: [GET_ALL_NOTES]
    })
 
  
    if (loading) return <p>Loading ...</p>;
    if (error) return `Error! ${error}`;

    if (loading2) return <p>Loading ...</p>;
    if (error2) return `Error! ${error2}`;
  
    if (loading3) return <p>Loading ...</p>;
    if (error3) return `Error! ${error3}`;
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