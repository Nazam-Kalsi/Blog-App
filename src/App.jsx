import "./App.css";
import { Header, Footer, Container } from "./components";
import { useDispatch } from "react-redux";
import authservice from "./appWrite/auth";
import { useEffect, useState } from "react";
import { login, logOut } from "./store/authSlice";
import { Outlet } from "react-router-dom";
function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    authservice
      .currentUser()
      .then((userdata) => {
        if (userdata) {
          dispatch(login(userdata));
        } else {
          dispatch(logOut());
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // return !loading ? <div></div> : (
  if (loading) {
    return (
      <div
        id="modal"
        className={`absolute  overflow-hidden bg-blur bg-white/80 border border-black z-10 left-[35%]   w-96  rounded-md `}
      >
        <div className=" text-end pr-2 border-b bg-white border-black text-black">
          ooo
        </div>
        <p className="text-black text-2xl font-serif font-bold text-center h-56 py-20">
          Loading...
        </p>
        <div className="pb-8 bg-white  border-t border-black"></div>
      </div>
    );
  } else
    return (
      <>
        <Header />
        <Container>
          <Outlet />
        </Container>
        <Footer />
      </>
    );
}

export default App;
