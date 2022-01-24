import React from "react";
import {Accordion} from "react-bootstrap"

function LikesList({note}){
    return (
        <Accordion>
                            <Accordion.Item eventKey="0">
                                <Accordion.Header>Likes: {note.favoriteCount}</Accordion.Header>
                                    <Accordion.Body>
                                        {
                                            note.favoritedBy.map((user)=>{
                                                return (<p key={user.id}>{<img style={{ width: '2rem' }} src={user.avatar}></img>}{user.username}</p>)
                                            })
                                        }
                                    </Accordion.Body>
                                </Accordion.Item>
                                
                            </Accordion>
    )
}
export default LikesList