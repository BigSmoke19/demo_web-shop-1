import { useState } from "react";


const Test = () => {
    const url = "http://localhost/webshop-apis/test.php";
    const [ispending,setIsPending] = useState(false);
    const handleClick = () => {
        fetch(url,{
            method:'POST',
            headers:{"content-type":"application/json"},
            body:JSON.stringify({"name":"bigsmoke"})
        }).then(
            () =>{
                alert("done");
                setIsPending(false);
            }
        );
    }

    return ( 
        <div>
            <button on onClick={handleClick} disabled={ispending}>Test</button>
        </div>
     );
}
 
export default Test;