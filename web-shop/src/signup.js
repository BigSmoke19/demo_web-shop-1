import { useState } from "react";
import { useNavigate } from "react-router-dom";


const SignUp = () => {
    const [name,setName] = useState(null);
    const [email,setEmail] = useState(null);
    const [password,setPassword] = useState(null);
    const [confirmPass,setConfirmPass] = useState(null);
    const [errorMessage,setErrorMessage] = useState(null);
    const [isPending,setIsPending] = useState(false);
    const history = useNavigate();
    const url = "http://localhost/webshop-apis/verifyemail.php?email="+email;

    const checkCredentials = () =>{
        if (name === null || email === null || password === null || confirmPass === null){
            setErrorMessage("Missing Credentials!!");
            return false;
        }
        if(password !== confirmPass){
            setErrorMessage("Password Mismatch!!!");
            return false;
        }
        setErrorMessage(null);
        return true;
    }

    const handleSubmit = (e) =>{
        e.preventDefault();
        if(checkCredentials()){
            setIsPending(true);
            fetch(url)
                .then(res => {
                    if(!res.ok){
                        throw Error("Faild");
                    }
                    return res.json() // extract json data from response
                })
                .then(data => {
                    console.log(data);
                    setIsPending(false);
                    localStorage.setItem('name',name);
                    localStorage.setItem('sEmail',email);
                    localStorage.setItem('password',password);
                    localStorage.setItem('code',parseInt(data));
                    history('/verifyemail');
                });
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