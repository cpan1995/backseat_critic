import React, {useState} from "react";
import { useEffect } from "react";
import HomeMovie from "./HomeMovie";
import Carousel from 'react-bootstrap/Carousel'
import ItemsCarousel from 'react-items-carousel';

function HomeMoviesContainer() {
    const [homeMovies, setHomeMovies] = useState([]);
    const [topRatedMovies, setTopRatedMovies] = useState([]);
    const [oldies, setOldies] = useState([]);
    const [animation, setAnimation] = useState([]);
  
    useEffect(() => {
      fetch("http://localhost:9292/")
        .then((r) => r.json())
        .then((homeMovies) => setHomeMovies(homeMovies));
    }, []);

    useEffect(() => {
      fetch("http://localhost:9292/toprated")
        .then((r) => r.json())
        .then((topRatedMovies) => setTopRatedMovies(topRatedMovies));
    }, []);

    useEffect(() => {
      fetch("http://localhost:9292/oldies")
        .then((r) => r.json())
        .then((oldies) => setOldies(oldies));
    }, []);

    useEffect(() => {
      fetch("http://localhost:9292/animation")
        .then((r) => r.json())
        .then((animation) => setAnimation(animation));
    }, []);

    const [activeItemIndex, setActiveItemIndex] = useState(0);
    const [activeItemIndex2, setActiveItemIndex2] = useState(0);
    const [activeItemIndex3, setActiveItemIndex3] = useState(0);
    const [activeItemIndex4, setActiveItemIndex4] = useState(0);
    const chevronWidth = 40;

  return (
    <>
    <h1>Popular Now</h1>
    <div style={{ padding: `0 ${chevronWidth}px` }}>
      <ItemsCarousel
        requestToChangeActive={setActiveItemIndex}
        activeItemIndex={activeItemIndex}
        numberOfCards={4}
        gutter={20}
        leftChevron={<button>{'<'}</button>}
        rightChevron={<button>{'>'}</button>}
        outsideChevron
        chevronWidth={chevronWidth}
      >
          {homeMovies.map((movie) => {
            if (movie.img_url !== "N/A" && movie.img_url)
            return (
            <img
                style ={{height: 400, width: 290}}
              src={movie.img_url}
              alt="Poster not found"
            />)}
          )}
      </ItemsCarousel>
    </div>
    <h1>Top Rated Movies</h1>
    <div style={{ padding: `0 ${chevronWidth}px` }}>
      <ItemsCarousel
        requestToChangeActive={setActiveItemIndex2}
        activeItemIndex={activeItemIndex2}
        numberOfCards={4}
        gutter={20}
        leftChevron={<button>{'<'}</button>}
        rightChevron={<button>{'>'}</button>}
        outsideChevron
        chevronWidth={chevronWidth}
      >
          {topRatedMovies.map((movie) => {
            if (movie.img_url !== "N/A" && movie.img_url)
            return (
            <img
                style ={{height: 400, width: 290}}
              src={movie.img_url}
              alt="Poster not found"
            />)}
          )}
      </ItemsCarousel>
    </div>
    <h1>Oldies</h1>
    <div style={{ padding: `0 ${chevronWidth}px` }}>
      <ItemsCarousel
        requestToChangeActive={setActiveItemIndex3}
        activeItemIndex={activeItemIndex3}
        numberOfCards={4}
        gutter={20}
        leftChevron={<button>{'<'}</button>}
        rightChevron={<button>{'>'}</button>}
        outsideChevron
        chevronWidth={chevronWidth}
      >
          {oldies.map((movie) => {
            if (movie.img_url !== "N/A" && movie.img_url)
            return (
            <img
                style ={{height: 400, width: 290}}
              src={movie.img_url}
              alt="Poster not found"
            />)}
          )}
      </ItemsCarousel>
    </div>
    <h1>Animation</h1>
    <div style={{ padding: `0 ${chevronWidth}px` }}>
      <ItemsCarousel
        requestToChangeActive={setActiveItemIndex4}
        activeItemIndex={activeItemIndex4}
        numberOfCards={4}
        gutter={20}
        leftChevron={<button>{'<'}</button>}
        rightChevron={<button>{'>'}</button>}
        outsideChevron
        chevronWidth={chevronWidth}
      >
          {animation.map((movie) => {
            if (movie.img_url !== "N/A" && movie.img_url)
            return (
            <img
                style ={{height: 400, width: 290}}
              src={movie.img_url}
              alt="Poster not found"
            />)}
          )}
      </ItemsCarousel>
    </div>
    </>
  );

    //   return (
    //     <Carousel >
    //       {homeMovies.map((movie) => (
    //         <Carousel.Item>
    //         <img
    //           className="d-block w-100"
    //           src={movie.img_url}
    //           alt="First slide"
    //         />
    //         <Carousel.Caption>
    //           <h3>{movie.name}</h3>
    //           <p>{movie.plot}</p>
    //         </Carousel.Caption>
    //       </Carousel.Item>
    //       ))}
    //     </Carousel>
    //   );
  
    // return (
    //   <section>
    //     {homeMovies.map((movie) => (
    //       <HomeMovie key={movie.imdb_id} name={movie.name} img_url={movie.img_url}/>
    //     ))}
    //   </section>
    // );
  }

export default HomeMoviesContainer