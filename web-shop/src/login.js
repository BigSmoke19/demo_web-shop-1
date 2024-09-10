import { useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate,Link } from "react-router-dom";

const LogIn = () => {
    const [user,setUser] = useState(null);
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [errorMessage,setErrorMessage] = useState(null);
    const [pending,setPending] = useState(null);
    const [myError,setMyError] = useState(null);
    const [cookies,setCookies,removeCookies] = useCookies(['email']);
    const history = useNavigate();
    const url = `http://localhost/webshop-apis/checkuser.php?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`;

    const checkCredentials = () =>{
        if ( email === "" || password === ""){
            setErrorMessage("Missing Credentials!!");
            return false;
        }
        setErrorMessage(null);
        return true;
    }

    const handleSubmit = (e) =>{
        e.preventDefault();
        if(checkCredentials()){
            fetch(url,{
                method:'GET',
                headers:{"content-type":"application/json"},
            }).then(res => {
                if(!res.ok){
                    throw Error("Faild");
                }
                return res.json() // extract json data from response
            })
            .then(data => {
                setPending(false);
                setUser(data);
                setMyError(null);
                console.log(data);

                if(user.email == true){
                    if(user.password == true){
                        setCookies('email',email,{path: '/'});
                        alert("Logged in!");
                        setPending(false);
                        history("/");
                    }else{
                        setErrorMessage("Wrong Password!!");
                        setPassword("");
                    }
                }else{
                    setErrorMessage("Email not found!!");
                    setEmail("");
                }
            });   
        }
    }
    return ( 
        <div className="create">
            <h2 className="title" style={{color:"black"}}>Log in</h2>
            <div>
                <form onSubmit={handleSubmit} className="center">
                    <div className="name">
                        <p className="name-type-label">Email: </p>
                        <input className="name-type" type="email" value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
                    </div>

                    <div className="type-create">
                        <p className="name-type-label">Password: </p>
                        <input className="name-type" type="password" value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
                    </div>
                    {!pending && <input className="submit-button" type="submit" value="log in" />}
                    <p id="error">{errorMessage}</p>
                    <br /> <br />
                    <p>Don't have an account?</p>
                    <Link to="SignUp">SignUp</Link>

                    {myError && <div>{myError}</div>}     
                    {pending && <p>Logging in....</p>}
                </form>
            </div>
            
        </div>
     );
}
 
export default LogIn;