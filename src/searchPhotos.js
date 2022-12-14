import React, { useState } from 'react'
import { createApi } from 'unsplash-js';
import { LightgalleryItem } from "react-lightgallery";

export default function SearchPhotos() {

    const [query, setQuery] = useState("");
    const [pics, setPics] = useState([]);
    const unsplash = createApi({ accessKey: '0d54d7bf8f81c9ee80a75d9e1263fbb6b8267fad9d908e597b9f7c4f6bcdee23' });
    const searchPhotos = async (e) => {
        e.preventDefault();
        unsplash.search.getPhotos({
            query: query
        })
            .then((result) => setPics(result.response.results))
            .then(console.log(pics))
    };

    function dateSort () {
        let newArray
        newArray = [...pics]
        newArray.sort((a,b) => new Date(a.created_at) - new Date(b.created_at))
        setPics(newArray)
    }
    function popularSort () {
        let newArray
        newArray = [...pics]
        newArray.sort((a,b) => a.likes - b.likes)
        setPics(newArray)
    }

    // function colorSort () {
    //     let newArray
    //     newArray = [...pics]
    //     newArray.sort((a,b) => a.color.substring(1) - b.color.substring(1)            
    //                 )
    //     setPics(newArray)
    // }

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
            {/* <button className="button sort-button" onClick={colorSort}>by Color</button> */}
            
            <div className="card-list">
                {
                    pics.map((pic) =>
                        <div className="card" key={pic.id}>
                            <LightgalleryItem group="any" src={pic.urls.full}>
                            <img
                                className="card--image"
                                alt={pic.alt_description}
                                src={pic.urls.full}
                                 width="100%"

                            ></img>
                             </LightgalleryItem>
                        </div>)
                }
            </div>
        </>
    )
}