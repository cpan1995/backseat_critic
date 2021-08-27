import { useEffect, useState } from "react";
import {
    Input,
    Dropdown,
    Button,
    Form
} from 'semantic-ui-react'
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import { makeStyles } from '@material-ui/core/styles';
import RenderSearchResults from "./RenderSearchResults";


const useStyles = makeStyles({
    rangeSlider: {
      width: '100%',
      justifyContent: 'center',
    }
    
});

export default function Search(){
    const searchClass = useStyles();
    const [sliderValue, setSliderValue] = useState([1950, 2021])
    const [currentGenres, setCurrentGenres] = useState([])
    const [searchObject, setSearchObject] = useState({})
    const [searchTerm, setSearchTerm] = useState("")
    const genreOptions = [
        {key: 'comedy', text: 'Comedy', value: 'comedy'},
        {key: 'scifi', text: 'Sci-Fi', value: 'scifi'},
        {key: 'horror', text: 'Horror', value: 'horror'},
        {key: 'romance', text: 'Romance', value: 'romance'},
        {key: 'action', text: 'Action', value: 'action'},
        {key: 'thriller', text: 'Thriller', value: 'thriller'},
        {key: 'drama', text: 'Drama', value: 'drama'},
        {key: 'crime', text: 'Crime', value: 'crime'},
        {key: 'animation', text: 'Animation', value: 'animation'},
        {key: 'adventure', text: 'Adventure', value: 'adventure'},
        {key: 'fantasy', text: 'Fantasy', value: 'fantasy'},
        {key: 'documentary', text: 'Documentary', value: 'documentary'},
    ]
    console.log(searchObject)
    const handleSliderChange = (event, newValue) => {
        setSliderValue(newValue)
    }
    const handleGenres = (event ,data) => {
        setCurrentGenres(data.value)
    }
    const handleButtonSearch = (e) => {
        e.preventDefault()
        let newObject = {}
        newObject.searchTerm = searchTerm
        newObject.yearStart = sliderValue[0]
        newObject.yearEnd = sliderValue[1]
        newObject.genreOptions = currentGenres
        setSearchObject(newObject)
    }
    const handleSearch = (data) => {
        setSearchTerm(data.target.value)
    }
    
    return(
        <div>
            <form className = 'searchForm'>
                <Input placeholder='Search for a movie' size="large" onChange={handleSearch}/>
                <div className={searchClass.rangeSlider}>
                    <Typography id="range-slider">
                        Select Year Range
                    </Typography>
                    <Slider
                        value = {sliderValue}
                        onChange={handleSliderChange}
                        valueLabelDisplay="auto"
                        aria-labelledby="range-slider"
                        min={1950}
                        max={2021}
                    />
                </div>
                
                <label>Select Genre</label>            
                <Dropdown placeholder='All' 
                    fluid 
                    multiple selection 
                    options={genreOptions}
                    onChange={handleGenres}
                />
                <Button type='submit' onClick={handleButtonSearch}>Search</Button>
            </form>
            <br/>
            <RenderSearchResults searchObject = {searchObject}/>
            
        </div>
    )
}