import ReviewContainer from "./UserReviewContainer";
import { useState } from "react";
function User({ user, name, favMovie, profPic, dateJoined}) {

  const [ isClicked, setIsClicked ] = useState(false)
  
  function handleClick(){
    setIsClicked(!isClicked)
  }
  console.log(dateJoined)
  return(
    <div className="container" onClick={handleClick}>
      <div className="profpic">
        <img src={profPic} alt="Profile" style={{ maxWidth: "400px", width:"100%" }}/>
      </div>
      <div className="userInfo">
        <h1>User: {name}</h1>
        <h2 className={ !isClicked ? "favoritemovie" : "hidden" }>Favorite Movie: {favMovie}</h2>
        <h2 className={ !isClicked ? "datejoined" : "hidden" }>Date Joined: {user.format_date}</h2>
      </div>
      <div className={ isClicked ? "reviews" : "hidden"}>
        <ReviewContainer user={user}/>
      </div>
      <hr/>
    </div>
  )
}

export default User;
