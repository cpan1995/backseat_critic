  
import React, {useState} from "react";

function Movie({name, img_url}) {

  return (
    <div className="Movierenders">
        <h1>
            {name}
        </h1>
        <img src={img_url}/>
    </div>
  );
}

export default Movie;