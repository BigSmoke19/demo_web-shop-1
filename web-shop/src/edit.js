import { useState } from 'react';
import './styles/home/listItems.css';
import './styles/admin/create.css';

const Edit = () => {

    const item = JSON.parse(localStorage.getItem('editItem'));
    const [name,setName] = useState(item.name);
    const [type,setType] = useState(item.type);
    const [price,setPrice] = useState(item.price);
    const [image,setImage] = useState(item.image);

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

    };

    const handleDelete = () => {

    };

    return ( 
        <div className="edit-item-container" key={item.id}>
            <div className="thumbnail-container">
               <img  className="thumbnail" src={`data:image/jpeg;base64,${image}`}/>
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
    </div>
     );
}
export default Edit;