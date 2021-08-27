import Review from "./Review"
import {useHistory, useParams} from 'react-router-dom'
import {useEffect, useState} from 'react'
import { Segment, Grid, Image, Header, Container, Card, Form, Input, TextArea, Button, Select, Rating } from 'semantic-ui-react'
import { v4 as uuidv4 } from 'uuid';

function addNewMovie(movieObject){
    return fetch(`http://localhost:9292/search/add/${movieObject.imdb_id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(movieObject)
    })
}

function saveReview(reviewObject){
    return fetch(`http://localhost:9292/search/addReview/${reviewObject.imdb_id}/${reviewObject.userName}`, {
        method:'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(reviewObject)
    })
}

function deleteReview(review){
    return fetch(`http://localhost:9292/search/removeReview/${review.imdb_id}/${review.id}`, {
        method: 'DELETE',
    })
}

function ReviewContainer({  }) {
    let apiKey = "799cdd3c"
    let { id } = useParams();
    const [currentMovie, setCurrentMovie] = useState({});
    const [currentReviews, setReviews] = useState([]);
    const [rating, setRating] = useState(0);
    const [wouldRecommend, setRecommend] = useState(false);
    const [userNameInfo, setUserNameInfo] = useState("")
    const [reviewInfo, setReviewInfo] = useState("")

    const handleDeleteCallback = (newObject) => {
        newObject.imdb_id = id;
        deleteReview(newObject)
        .then(res=>res.json())
        .then(data => setReviews(data))
    }

    const handleEditCallback = (newObject) => {
        setUserNameInfo(newObject.name)
        setReviewInfo(newObject.user_review)
    }

    let reviewCards = [];
    if(currentReviews.length != 0){
        reviewCards = currentReviews.map(review =>{
            return <Review key={uuidv4()} handleEditCallback={handleEditCallback} reviewId = {review.id} handleDeleteCallback = {handleDeleteCallback} userName = {review.user.name} movieId={review.movie_id} userId={review.users_id}  review={review.review} userRating={review.user_rating} wouldRecommend={review.recommend}/>
        })
    }

    console.log(currentReviews)

    const experienceOptions = [
        {key: 'recommend', text: 'Would Recommend', value: "true" },
        {key: 'notrecommend', text: 'Would Not Recommend', value: "false" }
    ]

    const emptyReviews = () => {
        return(
            <Segment>
                There Are Currently Zero Reviews, Be The First to Review This Movie!
            </Segment>
        )
    }

    const handleRatingChange = (e) => setRating(e.target.value)

    const handleUserInfo = (e) => setUserNameInfo(e.target.value)

    const handleReviewInfo = (e) => setReviewInfo(e.target.value)

    const handleRecommendChange = (e) => {
        if (e.target.innerHTML === 'Would Recommend'){
            setRecommend(true)
        }
        else{
            setRecommend(false)
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        let submittedUserName = e.target[0].value
        let submittedReview = e.target[1].value
        let submittedRecommend = wouldRecommend
        let submittedRating = parseFloat(e.target[2].value)
        
        let newObject = {
            imdb_id: id,
            userName: submittedUserName,
            review: submittedReview,
            user_rating: submittedRating,
            recommend: submittedRecommend
        }

        saveReview(newObject)
        .then(res=>res.json())
        .then(data => {
            setReviews(data)
        })
        
    }
    useEffect(()=>{
        fetch(`https://www.omdbapi.com/?apikey=${apiKey}&i=${id}`)
        .then(res => res.json())
        .then(data => {
            let newObject = {
                imdb_id: data.imdbID,
                name: data.Title,
                year: data.Year,
                img_url: data.Poster,
                run_time: data.Runtime,
                genre: data.Genre,
                plot: data.Plot,
                rating: data.Ratings[0].Value
            }
            addNewMovie(newObject)
            .then(res => res.json())
            .then(data => {
                setReviews(data.reviews)
                setCurrentMovie(data)
            })
        })
    },[])

    return (
        <div>
            <Segment vertical>
            </Segment>
            <div className='reviewPageInfo'>
                <Grid>
                    <Grid.Column width ={3}>
                        <Image src={currentMovie.img_url} size='medium' rounded/>
                    </Grid.Column>
                    <Grid.Column width ={9}>
                        <Header as='h2'>Movie Info</Header>
                        <Container>
                            <p><span className='movieInfo'>Title:  </span>{currentMovie.name}</p>
                            <p><span className='movieInfo'>Year of Release:  </span>{currentMovie.year}</p>
                            <p><span className='movieInfo'>Run Time:  </span>{currentMovie.run_time}</p>
                            <p><span className='movieInfo'>Genre:  </span>{currentMovie.genre}</p>
                            <p><span className='movieInfo'>Rating:  </span>{currentMovie.rating}</p>
                            <p><span className='movieInfo'>Backseat Critic Rating:  </span>{currentMovie.rating}</p>
                            <p><span className='movieInfo'>Plot:  </span>{currentMovie.plot}</p>
                        </Container>
                    </Grid.Column>
                </Grid>
            </div>
            <Container textAlign='center'>
                {reviewCards.length!=0 ? <Segment><Card.Group className='reviewCardsClass'>{reviewCards}</Card.Group></Segment> : emptyReviews() }
                <Form onSubmit={handleSubmit}>
                    <Form.Group width='equal' className='reviewPageContainer2'>
                        <Form.Field
                            control={Input}
                            value={userNameInfo}
                            label='UserName'
                            placeholder="UserName"
                            onChange={handleUserInfo}
                        />
                        <Form.Field
                            control={Select}
                            label='Would You Recommend'
                            options={experienceOptions}
                            placeholder="Recommend?"
                            onChange={handleRecommendChange}
                        />
                    </Form.Group>
                    <Form.Group width='equal' className='reviewPageContainer2'>
                        <Form.Field
                            control={TextArea}
                            label='Review'
                            placeholder="Please go gentle on this movie"
                            value={reviewInfo}
                            onChange={handleReviewInfo}
                        />
                        <div>
                            <div>Rating: {rating}</div>
                            <input
                                type='range'
                                min={0}
                                max={10}
                                value={rating}
                                onChange={handleRatingChange}
                            />
                            <br />
                            <Rating rating={rating} maxRating={10} />
                        </div>
                    </Form.Group>
                    <Form.Field control={Button}>Submit</Form.Field>
                </Form>
            </Container>
        </div>
    )
}
export default ReviewContainer