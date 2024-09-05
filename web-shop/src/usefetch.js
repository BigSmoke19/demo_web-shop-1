import { useEffect, useState } from "react";
const useFetch = (url) => {
    const [items,setItems] = useState(null);
    const [isPending,setIsPending] = useState(true);
    const [error,setError] = useState(null);

        useEffect( () => {
            const abortCont = new AbortController();

            setTimeout(() => {
                fetch(url,{signal: abortCont.signal})
                .then(res => {
                    if(!res.ok){
                        throw Error("Faild");
                    }
                    return res.json() // extract json data from response
                })
                .then(data => {
                    setIsPending(false);
                    setItems(data);
                    setError(null);
                })
                .catch(err =>{
                    if(err.name === "AbortError"){
                        console.log("fetch aborted");
                    }
                    else{
                        setIsPending(false);
                        setError(err.message);
                    }
                })
            }, 1000);
            return ()=> abortCont.abort();
        },[url])
    return ({items,isPending,error});
}
 
export default useFetch;