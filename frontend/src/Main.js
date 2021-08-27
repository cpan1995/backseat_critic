import { Switch, Route } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Search from "./Search.js";
import UserContainer from "./UserContainer.js";
import ReviewContainer from "./ReviewContainer.js";

import HomeMoviesContainer from "./HomeMoviesContainer"

function Main () { 
    return (
        <>
            <Switch>
                <Route exact path="/">
                    <HomeMoviesContainer />
                </Route>
                <Route exact path="/search">
                    <Search />
                </Route>
                <Route exact path="/users">
                    <UserContainer />
                </Route>
                <Route exact path="/search/:id">
                    <ReviewContainer />
                </Route>
                <Route path="*">
                    <h1>404 not found</h1>
                </Route>
            </Switch>
        </>
    )
}

export default Main