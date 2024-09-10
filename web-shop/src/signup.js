import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

const SignUp = () => {
    const [name,setName] = useState(null);
    const [email,setEmail] = useState(null);
    const [password,setPassword] = useState(null);
    const [confirmPass,setConfirmPass] = useState(null);
    const [errorMessage,setErrorMessage] = useState(null);
    const [isPending,setIsPending] = useState(false);
    const [cookies,setCookies,removeCookies] = useCookies(['email']);
    const history = useNavigate();
    const url = "http://localhost/webshop-apis/adduser.php";

    const checkCredentials = () =>{
        if (name === null || email === null || password === null || confirmPass === null){
            setErrorMessage("Missing Credentials!!");
            return false;
        }
        if(password != confirmPass){
            setErrorMessage("Password Mismatch!!!");
            return false;
        }
        setErrorMessage(null);
        return true;
    }

    const handleSubmit = (e) =>{
        e.preventDefault();
        if(checkCredentials()){
            const user = {name,email,password};
            setIsPending(true);
            console.log(JSON.stringify(user));
            fetch(url,{
                method:'POST',
                headers:{"content-type":"application/json"},
                body:JSON.stringify(user)
            }).then(
                () =>{
                    setCookies('email',email,{path: '/'});
                    alert("Signed Up!");
                    setIsPending(false);
                    history("/");
                }
            );            
        }
    }
    return ( 
        <div className="create">
            <h2 className="title" style={{color:"black"}}>Sign Up</h2>
            <form onSubmit={handleSubmit} className="center">
                <div className="name">
                    <p className="name-type-label">Name:</p>
                    <input className="name-type" type="text" onChange={(e)=>{setName(e.target.value)}}/>
                </div>

                <div className="type-create">
                    <p className="name-type-label">Email: </p>
                    <input className="name-type" type="email" onChange={(e)=>{setEmail(e.target.value)}}/>
                </div>

                <div className="type-create">
                    <p className="name-type-label">Password: </p>
                    <input className="name-type" type="password" onChange={(e)=>{setPassword(e.target.value)}}/>
                </div>

                <div className="type-create">
                    <p className="name-type-label">Confirm Password:</p>
                    <input className="name-type" type="password" onChange={(e)=>{setConfirmPass(e.target.value)}}/>
                </div>
                
                <div>
                    <input className="submit-button" type="submit" value={!isPending?"Sign Up":"Signing up ..."} />
                </div>
                <p id="error">{errorMessage}</p>
            </form>
        </div>
     );
}
 
export default SignUp;