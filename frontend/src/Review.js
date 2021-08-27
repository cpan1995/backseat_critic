import { Segment, Grid, Image, Header, Container, Card , Icon, Button , Rating } from 'semantic-ui-react'
import {useHistory, useParams} from 'react-router-dom'
import {useEffect, useState} from 'react'

function Review({ handleEditCallback , reviewId, handleDeleteCallback,userName , movieId, userId, review, userRating, wouldRecommend }) {

    function handleClick(){
      let newObject = {
        id: reviewId,
        name: userName,
        movie_id: movieId,
        user_id: userId,
        user_review: review
      }
      handleDeleteCallback(newObject)
    }

    function handleEdit(){
      let newObject = {
        id: reviewId,
        name: userName,
        movie_id: movieId,
        user_id: userId,
        user_review: review
      }
      handleEditCallback(newObject)
    }
  
    return(
      <Card>
        <Card.Content>
          <Card.Header>{userName} Says</Card.Header>
          <Card.Description>
            {review}
          </Card.Description>
        </Card.Content>
        <Card.Content extra className='userRatingClass'>
          <div>User Rating: {userRating}/10</div>
          {wouldRecommend ? <div><Icon name="thumbs up" color ='Green'/></div>: <div><Icon name="thumbs down"/></div>}
        </Card.Content>
        <Card.Content extra>
          <div className='ui two buttons'>
            <Button color ='red' onClick={handleClick}>Delete</Button>
            <Button color ='green' onClick={handleEdit}>Edit</Button>
          </div>
        </Card.Content> 
      </Card>  
    )
  }
  
  export default Review;