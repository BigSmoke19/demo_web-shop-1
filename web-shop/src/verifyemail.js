import { useState } from "react";
import { useNavigate} from "react-router-dom";
import { useCookies } from "react-cookie";

const VerifyEmail = () => {
    const [number,setNumber] = useState(null);
    const [error,setError] = useState("");
    const [count,setCount] = useState(3);
    const history = useNavigate();
    const code = parseInt(localStorage.getItem('code'));
    const url = "http://localhost/webshop-apis/adduser.php";
    const [ispending,setIsPending] = useState(false);
    const name = localStorage.getItem('name');
    const email = localStorage.getItem('sEmail');
    const password = localStorage.getItem('password');
    const [cookies,setCookies,removeCookies] = useCookies(['email']);
    const token = "fieuifvhwou84gfhvoh347tyfjrgfvi7g47fglifvula74cv4gfvliagf47g4fvhlqi7gf47fvifgrfgtfgigfewweiokug7sheoif8tgb93e73hpij9sd7wj0if";

    const handleChange = (value) => {
        setNumber(value);
    }
    const handleSubmit = () =>{
        console.log("code:" + code,"nmbr:" + number);
        if(count <= 0){
            history("/");
        }
        if(parseInt(number) === parseInt(code)){
            console.log(101);
            setIsPending(true);
            const user = {name,email,password,token};
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
            ).catch(err =>{
                console.log(err.message);
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