import './App.css';
import { useState, useEffect, useCallback } from 'react';

function App() {
   
    const [ url , setUrl] = useState('')
   
    const handleGoogleLogin = async() => {
    
        try {
          const response = await(await fetch('http://localhost:8000/api/google/login/url'))  
          
          if(response) {
            const url = await response.json();
            setUrl(url);
            window.location.replace(url);
            
          }

        } catch (error) {
            console.log(error.message);
        }
    };

    return (
        <div className="App">
            <h1>Development</h1>
            <button onClick={handleGoogleLogin}>Login with Google</button>
        </div>
    );
}

export default App;
