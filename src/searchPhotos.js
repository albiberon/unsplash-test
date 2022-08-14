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
          .then((result)=>setPics(result.response.results))
          .then(console.log(pics))
        // unsplash.search
        // .photos(query)
        // .then(toJson)
        // .then((json) => {
        //   console.log(json);
        // });
      };

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
                    onChange={(e)=> setQuery(e.target.value)}
                />
                <button type="submit" className="button">
                    Search
                </button>
            </form>
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
