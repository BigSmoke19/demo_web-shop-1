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
                    alert("Signed Up!");
                    setIsPending(false);
                    history("/");
                }
            );            
        }
    }
    return ( 
        <div className="sign-up">
            <form onSubmit={handleSubmit}>
                <label >Name:</label>
                <input type="text" onChange={(e)=>{setName(e.target.value)}}/>
                <br /> <br />
                <label >Email: </label>
                <input type="email" onChange={(e)=>{setEmail(e.target.value)}}/>
                <br /> <br />
                <label >Password: </label>
                <input type="password" onChange={(e)=>{setPassword(e.target.value)}}/>
                <br /> <br />
                <label >Confirm Password:</label>
                <input type="password" onChange={(e)=>{setConfirmPass(e.target.value)}}/>
                <br /> <br />
                {!isPending && <input type="submit" value="Sign Up" />}
                <p id="error">{errorMessage}</p>
                <br /> <br />

                {isPending && <p>Adding Item.....</p>}
            </form>
        </div>
     );
}
 
export default SignUp;