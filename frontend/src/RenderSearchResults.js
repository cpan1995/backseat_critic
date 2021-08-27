import { useEffect, useState } from "react";
import RenderMovieCard from "./RenderMovieCard";
import { v4 as uuidv4 } from 'uuid';
import { Card } from 'semantic-ui-react' 


function filterMovies(movie, selectedObject){
    if(movie.Poster !== 'N/A' || !movie.Plot !== 'N/A' || movie.Title !== 'N/A'){
        if(selectedObject.yearStart <= parseInt(movie.Year) && selectedObject.yearEnd >= parseInt(movie.Year)){
            console.log("filtering")
            if(selectedObject.genreOptions.length == 0){
                return true
            }
            else{
                let genreChecker=movie.Genre.replace('-','').toLowerCase().split(', ')
                console.log(genreChecker)
                return genreChecker.some(genre => selectedObject.genreOptions.includes(genre))
            }
        }
        else{
            return false;
        }
    }
}

export default function RenderSearchResults({searchObject}){
    const apiKey = "799cdd3c";
    const [movieSearch, setMoviesSearch] = useState([])
    let movieCards = [];

    useEffect(()=>{
        if(searchObject.searchTerm != undefined){
            fetch(`https://www.omdbapi.com/?apikey=${apiKey}&s=${searchObject.searchTerm}&page=1`)
            .then(res => res.json())
            .then(data => {
                let storeMovies = []
                const moviePromises = data.Search.map(movie => {
                    return fetch(`https://www.omdbapi.com/?apikey=${apiKey}&i=${movie.imdbID}`)
                    .then(res => res.json())
                    .then(data => {
                        console.log("fetching data")
                        storeMovies.push(data)
                    })
                })
                Promise.all(moviePromises).then(() => {
                    setMoviesSearch(storeMovies)
                })
            })
        }
    }, [searchObject]);

    if(movieSearch.length != 0){
        movieCards = movieSearch.map(movie => {
            if(filterMovies(movie, searchObject)){
                let newRating = 0;
                if(movie.Ratings[0] != null){
                    newRating = parseFloat(movie.Ratings[0].Value.replace('/10', ''))
                }else{
                    newRating = 0;
                }
                
                return <RenderMovieCard key={uuidv4()} title={movie.Title} imdbId={movie.imdbID} posterImg = {movie.Poster} year = {movie.Year} plot={movie.Plot} rating={newRating}/>
            }
        })
    }

    return(
        <Card.Group className='cardGroupSearch'>
            {movieCards}
        </Card.Group>
    )
}