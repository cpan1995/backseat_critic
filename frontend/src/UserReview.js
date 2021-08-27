function UserReview({ title, poster, recommend, rating, user_rating, content }) {

  return(
    <div className={recommend ? "good" : "bad" }>
      <div className="reviewContainer" >
        <div className="poster">
          <img src={poster} alt="Poster" style={{ maxWidth: "200px" }}/>
        </div>
        <div className="review" >
          <h1>{title}</h1>
        </div>
        <div className="reviewText">
          <h3>IMDB Rating: {rating}/10</h3>
          <h3>User Rating: {user_rating}/10</h3>
          <p>{content}</p>
        </div>
      </div>
    </div>
  )
}
  
export default UserReview;