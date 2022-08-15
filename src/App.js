import React from "react";
import './App.css';
import SearchPhotos from "./searchPhotos"
import { LightgalleryProvider } from "react-lightgallery";


function App() {
  return (
    <div className="App">
            <div className="container">
        <h1 className="title">React Photo Search</h1>
        <LightgalleryProvider
                lightgallerySettings={
                    {
                        // settings: https://sachinchoolur.github.io/lightgallery.js/docs/api.html
                    }
                }
                galleryClassName="my_custom_classname"
            >
                <SearchPhotos />
            </LightgalleryProvider>
      </div>
    </div>
  );
}

export default App;
