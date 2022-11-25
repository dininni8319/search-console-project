import './App.css';
import { useState, useEffect } from 'react';

function App() {
    // const handleClick = async () = {

    // }
    useEffect(() => {
        fetch('localhot://8000/api/google/login/url')
            .then((resp) => resp.json())
            .then((data) => console.log(data));
    }, []);

    return (
        <div className="App">
            <h1>Development</h1>
        </div>
    );
}

export default App;
