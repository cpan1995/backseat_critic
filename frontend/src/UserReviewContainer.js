import { useState, useEffect } from 'react'

import UserReview from "./UserReview"

function UserReviewContainer({ user }) {

    const [ reviewArray, setReviewArray ] = useState([])
    useEffect(() => {
        fetch(`http://localhost:9292/users/${user.id}`)
            .then(resp=>resp.json())
            .then(data=>setReviewArray(data.reviews))
    }, [])
   
    const review = reviewArray.map(review => {
        return <UserReview key={review.id} title={review.title} user_rating={review.user_rating} poster={review.poster} recommend={review.recommend} rating={review.rating} content={review.review}/>
    })

    return (
        <div className="reviewcontainer">
            {review}
        </div>
    )
}
export default UserReviewContainer
