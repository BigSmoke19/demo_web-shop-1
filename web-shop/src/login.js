import { useState, useEffect, useContext} from "react";
import { useCookies } from "react-cookie";
import { useNavigate,Link } from "react-router-dom";
import { UserContext } from "./usercontext";

const LogIn = () => {

    const [{useremail,setUserEmail},{isadmin,setIsAdmin}] = useContext(UserContext);


    const [user,setUser] = useState(null);
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [errorMessage,setErrorMessage] = useState(null);
    const [pending,setPending] = useState(false);
    const [myError,setMyError] = useState(null);
    const [cookies,setCookies] = useCookies(['email']);
    const history = useNavigate();
    const url = `http://localhost/webshop-apis/checkuser.php`;

    useEffect(()=>{
        if(user !== null){
            checkUser();
        }
    },[user]);

    const checkCredentials = () =>{
        if ( email === "" || password === ""){
            setErrorMessage("Missing Credentials!!");
            return false;
        }
        setErrorMessage(null);
        return true;
    }
    const checkUser = () =>{
        if(parseInt(user.email) === 1){
            if(parseInt(user.password) === 1){
                setCookies('email',email,{path: '/',expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000)});

                setUserEmail(email);
                setIsAdmin(user.isadmin);

                setPending(false);

                if(parseInt(user.isadmin) === 1){


                    alert("Hello admin");
                    history("/create");  
                }else{
                    alert("Logged in!");
                    history("/");
                }
            }else{
                setPending(false);
                setErrorMessage("Wrong Password!!");
                setPassword("");
            }
        }else{
            setPending(false);
            setErrorMessage("Email not found!!");
            setEmail("");
        }
    }

    const handleSubmit = (e) =>{
        e.preventDefault();
        if(checkCredentials()){

            setPending(true);

            const user = {email,password};
            fetch(url,{
                method:'POST',
                headers:{"content-type":"application/json"},
                body:JSON.stringify(user)
            }).then(res => {
                if(!res.ok){
                    throw Error("Faild");
                }
                return res.json() // extract json data from response
            })
            .then(data => {

                setUser(data);
                setMyError(data.message);
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