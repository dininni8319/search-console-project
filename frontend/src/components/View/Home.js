import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

const Home = () => {
  const [searchParams, setSearchParams ] = useSearchParams();
  let code = searchParams.get("code")

  useEffect(() => {
    fetch(`http://localhost:8000/api/google/auth/login`,{
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({auth_code: code}),
    })
     .then(response => response.json())
     .then(res => console.log(res))
     
  }, [code])
 

  return ( 
    <h1>Welcome</h1>
   );
}
 
export default Home;