import {useState } from 'react';
import { useNavigate } from "react-router-dom";
import './styles/home/listItems.css';


const Edit = () => {

    const item = JSON.parse(localStorage.getItem('editItem'));
    const id = item.id;
    const [name,setName] = useState(item.name);
    const [type,setType] = useState(item.type);
    const [price,setPrice] = useState(item.price);
    const [image,setImage] = useState(item.image);
    const [ispending,setIsPending] = useState(false);
    const history = useNavigate();
    const url = "http://localhost/webshop-apis/edit.php";
    const url2 = "http://localhost/webshop-apis/delete.php";

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
    };

    const handleSave = () => {
        const newitem = {id,name,type,price,image};
        setIsPending(true);
        console.log(JSON.stringify(newitem));
        fetch(url,{
            method:'POST',
            headers:{"content-type":"application/json"},
            body:JSON.stringify(newitem)
        }).then(
            () =>{
                alert("Edit Saved!!");
                setIsPending(false);
                history("/");
            }
        );
    };

    const handleDelete = () => {
        if(true){
            const newitem = {id};
            setIsPending(true);
            console.log(JSON.stringify(newitem));
            fetch(url2,{
                method:'POST',
                headers:{"content-type":"application/json"},
                body:JSON.stringify(newitem)
            }).then(
                () =>{
                    alert("Item Deleted!!");
                    setIsPending(false);
                    history("/");
                }
            );
        }
    };

    return ( 
        <div className="edit-item-container" key={item.id}>
            <div className="thumbnail-container">
               <img  className="thumbnail" src={image}/>
               <label for="file-input" className="custom-file-label">Choose image</label>
                <input  id="file-input" className="file-input" 
                    type="file" onChange={handleImage} accept="image/*" /> 
            </div>

            <div style={{border:"2px black solid"}}>
                <input type='text' className="item-name"
                    value={name} onChange={(e)=>setName(e.target.value)}/>
                <input type='text' className="type"
                    value={type} onChange={(e)=>setType(e.target.value)}/>
                <input type='text' className="price"
                    value={price}$ onChange={(e)=>setPrice(e.target.value)}/>
            </div>
            <button className={"add-to-cart"} onClick={handleSave}>Save</button>
            <button style={{backgroundColor:"red"}} className={"add-to-cart"} onClick={handleDelete}>Delete</button>
            {ispending && <p>Saving changes...</p>}
    </div>
     );
}
export default Edit;