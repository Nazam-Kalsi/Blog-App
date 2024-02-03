import "./App.css";
import { Header, Footer,Container } from "./components";
import { useDispatch } from "react-redux";
import authservice from "./appWrite/auth";
import { useEffect,useState } from "react";
import { login, logOut } from "./store/authSlice";
import {Outlet} from 'react-router-dom'
function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    
    authservice
      .currentUser()
      .then((userdata) => {
        if (userdata) {
          dispatch(login({ userinfo: userdata }));
        } else {
          dispatch(logOut());
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);


  // return !loading ? <div></div> : (
  if(loading){
    return <div>Loading...</div>
  }else 
  return (
    <>
      <Header />
      <Container>
    <Outlet/>
      </Container>
      <Footer />
    </>
  );
}

export default App;
