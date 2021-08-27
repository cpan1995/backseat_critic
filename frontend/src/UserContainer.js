import { useState, useEffect } from 'react'
import User from './User'
function UserContainer() {
    
    const [ userArray, setUserArray ] = useState([])

    useEffect(() => {
        fetch(`http://localhost:9292/users`)
            .then(resp=>resp.json())
            .then(data=>setUserArray(data))
    }, [])

    const user = userArray.map(user => {
        //HOW TO HANDLE THESE SNAKE CASE VARIABLES PROF_PIC, FAV_MOVIE, DATE_JOINED
        return <User key={user.id} user={user} name={user.name} favMovie={user.fav_movie} profPic={user.profile_pic} dateJoined={user.date_joined.format_date}/>
    })

    return (
        <div className="usercontainer">
            {user}
        </div>
    )
    
}

export default UserContainer;
