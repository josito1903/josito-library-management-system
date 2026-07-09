import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Sign.css";
import API from "../../API/api";

function Sign() {

  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");

  const navigate=useNavigate();

  const handleLogin=async()=>{

    try{

      const res=await API.post("/auth/signin",{
        email,
        password
      });

      localStorage.setItem("token",res.data.token);
      localStorage.setItem("user",JSON.stringify(res.data.user));

      if(res.data.user.role==="admin"){
        navigate("/admin");
      }else{
        navigate("/dashboard");
      }

    }catch(err){

      alert(err.response?.data?.message || "Login Failed");

    }

  };

  return(

<div className="sign-container">

<div className="sign-card">

<h1>Sign In</h1>

<input
type="email"
placeholder="Enter Email"
value={email}
onChange={(e)=>setEmail(e.target.value)}
/>

<input
type="password"
placeholder="Enter Password"
value={password}
onChange={(e)=>setPassword(e.target.value)}
/>

<button onClick={handleLogin}>
Login
</button>

<p className="bottom-link">
Don't have an account?
<Link to="/signup"> Register</Link>
</p>

</div>

</div>

  );

}

export default Sign;