import { useContext, useState } from "react";
import { useNavigate} from "react-router-dom";
import { useCookies } from "react-cookie";
import { VerifyContext } from "./verifycontext";
import { UserContext } from "./usercontext";

const VerifyEmail = () => {
    const [number,setNumber] = useState(null);
    const [error,setError] = useState("");
    const [count,setCount] = useState(3);

    const history = useNavigate();

    const url = "http://localhost/webshop-apis/adduser.php";
    const [ispending,setIsPending] = useState(false);

    const [cookies,setCookies,removeCookies] = useCookies(['email']);

    const [{name,setName},{email,setEmail},{password,setPassword},{code,setCode}] = useContext(VerifyContext);
    const token = process.env.REACT_APP_SIGN_UP_TOKEN;

    const [{useremail,setUserEmail},
        {isadmin,setIsAdmin}] = useContext(UserContext);

    const handleChange = (value) => {
        setNumber(value);
    }
    const handleSubmit = () =>{
        if(count <= 0){
            history("/");
        }
        if(parseInt(number) === parseInt(code)){
            setIsPending(true);
            const user = {name,email,password,token};
            fetch(url,{
                method:'POST',
                headers:{"content-type":"application/json"},
                body:JSON.stringify(user)
            })
            .then(res => {
                if(!res.ok){
                    throw Error("Faild");
                }
                return res.text() 
            })
            .then(
                (data) =>{
                    alert(data);
                    setUserEmail(email);
                    setIsAdmin(false);
                    setCookies('email',email,{path: '/',expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000)});
                    alert("Signed Up!");
                    setIsPending(false);
                    history("/");
                }
            ).catch(err =>{
                setError(err.message);
            });         
        }
        else{
            setError ("Wrong Number!!");
            setCount (count-1);
        }
    }
    return (  
        <div className="email-verify">
            <h2>Email Verification</h2>
            <p>Enter the 8 digit number sent by email</p>
            <input type="number" onChange={(e)=>handleChange(e.target.value)}/>
            {number && number.length === 8 && <input type="submit" value="Submit" onClick={handleSubmit} />}
            {ispending && <p>Verifiying...</p>}
        </div>
    );
}
 
export default VerifyEmail;