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
    const token = localStorage.getItem('createToken');
    const fileTypes = ['image/jpeg', 'image/png', 'image/gif'];
    const fileSize =  5 * 1024 * 1024;
    const [error,setError] = useState(null);
    const [prefix,setPrefix] = useState("data:image/png;base64,");


    const handleImage = (event) => {
        console.log("started.........");
        const selectedFile = event.target.files[0];


        if (!selectedFile){console.log(selectedFile);return;} 

        setIsPending(true);
        setError(null);

        const formData = new FormData();
        formData.append('image_file', selectedFile);
        formData.append('size', 'auto');
    
            fetch('https://api.remove.bg/v1.0/removebg', {
                method: 'POST',
                headers: {
                  'X-Api-Key': 'N8M2xcLWBLzHSk5wBN3QadPY',
                },
                body: formData,
              })
              .then(response => {
                if (!response.ok) {
                  throw new Error('Network response was not ok');
                }
                return response.blob();
              })
              .then(blob => {
                const myblob = new Blob([blob], { type: 'image/png' });
                const file = new File([myblob], 'fetched-image.png', { type: myblob.type });
                console.log("Image:" + file);
            

        if(file){
            if(file.size <= fileSize && fileTypes.includes(file.type)){
                const reader = new FileReader();
                reader.onloadend = () =>{
                    setImage(reader.result);
                }
                reader.readAsDataURL(file);
                setIsPending(false);
                setPrefix("");
            }else{
                setIsPending(false);
                if(!fileTypes.includes(file.type)){
                    setError("Wrong file type!!");
                }else{
                    setError("image must be less than 5mb!!");
                }
            }
        }else{
            setError("Error in file upload!!");
        }
    });
    };

    const handleSave = () => {
        console.log(image);
        if(name !== "" && type !== "" && price != 0 && image){
            const newitem = {id,name,type,price,image,token};
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
        }else{
            setError("Missing Credentials!!!")
        }
    };

    const handleDelete = () => {
        if(true){
            const newitem = {id,token};
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
               <img  className="thumbnail" src={`${prefix}${image}`}/>
               <label for="file-input" className="custom-file-label">Choose image</label>
                <input  id="file-input" className="file-input" 
                    type="file" onChange={(e)=>handleImage(e)} accept="image/*" /> 
            </div>

            <div style={{border:"2px black solid"}}>
                <input type='text' className="item-name"
                    value={name} onChange={(e)=>setName(e.target.value)}/>
                <input type='text' className="type"
                    value={type} onChange={(e)=>setType(e.target.value)}/>
                <input type='text' className="price"
                    value={price} onChange={(e)=>setPrice(e.target.value)}/>$
            </div>
            <button className={"add-to-cart"} onClick={handleSave}>Save</button>
            <button style={{backgroundColor:"red"}} className={"add-to-cart"} onClick={handleDelete}>Delete</button>
            {error && <p style={{color:'red'}}>{error}</p>}
            {ispending && <p>Saving changes...</p>}
    </div>
     );
}
export default Edit;