import React from "react";
import LogoutBtn from "./LogoutBtn";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Container from "../container/Container";

export function Header() {
  const userStatus = useSelector((state) => {
    return state.authreducer.status;
  });
  // const navigator=useNavigate(); //react-router-dom external feature -------- it takes url to which it has to navigate

  let NavBtn = [
    {
      name: "Home",
      slug: "/",
      active: true,
    },
    {
      name: "Login",
      slug: "/login",
      active: !userStatus,
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !userStatus,
    },
    {
      name: "All Posts",
      slug: "/all-posts",
      active: userStatus,
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: userStatus,
    },

  ];
  return (
    <>
      <header>

        <Container>
          <nav className="flex">
            <div>{/* <Link to={'/'}>LOGO</Link> */}logo</div>
            <ul className="space-x-4 flex">
              {NavBtn.map((item) => (
                <li key={item.name}>
                  <button onClick={()=>console.log("hlo")
                    // navigator(item.slug)
                    }>{item.name}</button>
                </li>
              ))}
              {
                userStatus && (<LogoutBtn/>)
              }
            </ul>
          </nav>
        </Container>
      </header>
    </>
  );
}

export function Footer() {
  return <>Footer</>;
}
