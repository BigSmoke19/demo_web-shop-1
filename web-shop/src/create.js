import { useState } from "react";
import { useNavigate } from "react-router-dom";


const Create = () => {
    const [image,setImage] = useState("");
    const [name,setName] = useState("");
    const [type,setType] = useState("");
    const [price,setPrice] = useState(0);
    const [isPending,setIsPending] = useState(false);
    const history = useNavigate();
    const url = "http://localhost/webshop-apis/adddata.php";

    const handleSubmit = (e) => {
        e.preventDefault();
        const item = {name,type,price,image};
        setIsPending(true);
        console.log(JSON.stringify(item));
        fetch(url,{
            method:'POST',
            headers:{"content-type":"application/json"},
            body:JSON.stringify(item)
        }).then(
            () =>{
                alert("New Item Added");
                setIsPending(false);
                history("/");
            }
        );
    }

    const handleImage = (event) =>{
        const file = event.target.files[0];
        if(file){
            const reader = new FileReader();
            reader.onloadend = () =>{
                setImage(reader.result);
            }
            reader.readAsDataURL(file);
            //console.log(image);
        }
    }
    return (
        <div className="create">
            <h2>Add New Item</h2>
            <form onSubmit={handleSubmit}>
            <label>uplaod image </label>
            <input type="file" onChange={handleImage} accept="image/*"/>
                <label>Name: </label>
                <input type="text" required value={name} 
                    onChange={(e)=>{setName(e.target.value)}}/>
                <br /> <br />
                <label>Type: </label>
                <input type="text" required value={type}
                    onChange={(e)=>{setType(e.target.value)}}/>
                <br /> <br />
                <label>Price: </label>
                <input type="number" required value={price}
                    onChange={(e)=>{setPrice(e.target.value)}}/>$
                <br /> <br />
                {!isPending && <input type="submit" value="Add" />}
                {isPending && <p>Adding Item.....</p>}
            </form>

        </div>
         

        );
}
 
export default Create;