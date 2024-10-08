import { useState } from "react";
import { useNavigate } from "react-router-dom";
import './styles/admin/create.css';

const Create = () => {
    const [image,setImage] = useState(null);
    const [name,setName] = useState("");
    const [type,setType] = useState("");
    const [price,setPrice] = useState(0);
    const [isPending,setIsPending] = useState(false);
    const history = useNavigate();
    const url = "http://localhost/webshop-apis/adddata.php";
    const token = localStorage.getItem('createToken');
    const fileTypes = ['image/jpeg', 'image/png', 'image/gif'];
    const fileSize =  5 * 1024 * 1024;
    const [error,setError] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        if(name !== "" && type !== "" && price != 0 && image){
            const item = {name,type,price,image,token};
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
        }else{
            setError("Missing Credentials!!!")
        }
    }

    const handleImage = (event) =>{
        const file = event.target.files[0];
        if(file){
            if(file.size <= fileSize && fileTypes.includes(file.type)){
                const reader = new FileReader();
                reader.onloadend = () =>{
                    setImage(reader.result);
                }
                reader.readAsDataURL(file);
                console.log(image);
            }else{
                if(!fileTypes.includes(file.type)){
                    setError("Wrong file type!!");
                }else{
                    setError("image must be less than 5mb!!");
                }
            }
        }else{
            setError("Error in file upload!!");
        }
    }
    return (
        <div className="create">
            <h2 className="title" style={{color:"black"}}>Add New Item</h2>
            <div>
                <form onSubmit={handleSubmit} className="center">
                    <div className="name">
                        <p className="name-type-label">Name: </p>
                        <input className="name-type" type="text" required value={name} 
                            onChange={(e)=>{setName(e.target.value)}}/>
                    </div>

                    <div className="type-create">
                        <p className="name-type-label">Type: </p>
                        <input className="name-type" type="text" required value={type}
                            onChange={(e)=>{setType(e.target.value)}}/>
                    </div>

                    <div style={{marginTop:20}}>
                        <label className="price1">Price$: </label>
                        <input className="price-input" type="number" required value={price}
                            onChange={(e)=>{setPrice(e.target.value)}}/>
                    </div>

                    <div style={{marginTop:20}}>
                        <label for="file-input" className="custom-file-label">Choose image</label>
                        <input id="file-input" className="file-input" type="file" onChange={handleImage} accept="image/*"/>
                    </div>
                    {error && <p style={{color:'red'}}>{error}</p>}
                    {<div><input className="submit-button" type="submit" value={!isPending?"Add Item":"Adding Item ..."} /></div>}
                </form>
            </div>
        </div>
    );
}
 
export default Create;