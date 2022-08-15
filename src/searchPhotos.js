import React, { useState } from 'react'
// import Unsplash, { toJson } from "unsplash-js";
import { createApi } from 'unsplash-js';


export default function SearchPhotos() {

    const [query, setQuery] = useState("");
    const [pics, setPics] = useState([]);

    console.log(query);
    const unsplash = createApi({ accessKey: '0d54d7bf8f81c9ee80a75d9e1263fbb6b8267fad9d908e597b9f7c4f6bcdee23' });
    // const unsplash = new Unsplash({
    //     accessKey: "0d54d7bf8f81c9ee80a75d9e1263fbb6b8267fad9d908e597b9f7c4f6bcdee23",
    //   });

    const searchPhotos = async (e) => {
        e.preventDefault();
        unsplash.search.getPhotos({
            query: query
        })
            //.then(result=>{console.log(result)})
            //.then((result)=>{setPics(result)})
            // .then(result.toJson)
            //.then((result)=>console.log(result.response.results))
            .then((result) => setPics(result.response.results))
            .then(console.log(pics))
        // unsplash.search
        // .photos(query)
        // .then(toJson)
        // .then((json) => {
        //   console.log(json);
        // });
    };

    function dateSort () {
        let newArray
        newArray = [...pics]
        newArray.sort((a,b) => new Date(a.created_at) - new Date(b.created_at))
        //console.log('clicked');
        setPics(newArray)
    }
    function popularSort () {
        let newArray
        newArray = [...pics]
        newArray.sort((a,b) => a.likes - b.likes)
        //console.log('clicked');
        setPics(newArray)
    }
    function colorSort () {
        let newArray
        newArray = [...pics]
        newArray.sort((a,b) => a.color.substring(1) - b.color.substring(1)            
                    )
        //console.log('clicked');
        setPics(newArray)
    }

    return (
        <>
            <form className="form" onSubmit={searchPhotos}>
                <label className="label" htmlFor="query">
                    {" "}
                    📷
                </label>
                <input
                    type="text"
                    name="query"
                    className="input"
                    placeholder={`Try "dog" or "apple"`}
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                <button type="submit" className="button">
                    Search
                </button>
            </form>
            <button className="button sort-button" onClick={popularSort}>by Popularity</button>
            <button className="button sort-button" onClick={dateSort}>by Date</button>
            <button className="button sort-button" onClick={colorSort}>by Color</button>
            

            <div className="card-list">
                {
                    pics.map((pic) =>
                        <div className="card" key={pic.id}>
                            <img
                                className="card--image"
                                alt={pic.alt_description}
                                src={pic.urls.full}
                                width="50%"
                                height="50%"
                            ></img>
                        </div>)
                }
            </div>
        </>
    )

}
