import React from "react";
import LogoutBtn from "./LogoutBtn";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Container from "../container/Container";

export function Header() {
  const userStatus = useSelector((state) => {
    console.log(state.authreducer.status);
    return state.authreducer.status;
  });
  const userInfo = useSelector((state) => {
    console.log(state.authreducer.userinfo);
    return state.authreducer.userinfo;
  });
  const navigate = useNavigate(); //react-router-dom external feature -------- it takes url to which it has to navigate

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
      slug: "/allPosts",
      active: userStatus,
    },
    {
      name: "Add Post",
      slug: "/addpost",
      active: userStatus,
    },
  ];
  return (
    <>
      <header>
        <Container>
          <nav className="flex">
            <div>
              {" "}
              <Link to={"/"}>LOGO</Link>
            </div>
            <ul className="flex space-x-4">
              {NavBtn.map((item) => {
                if (item.active) {
                  return <li key={item.name}>
                    <button onClick={() => navigate(item.slug)}>
                      {item.name}
                    </button>
                  </li>;
                }
              })}
              {userStatus && <LogoutBtn />}
            </ul>
            <p>{userInfo?.name}</p>
          </nav>
        </Container>
      </header>
    </>
  );
}

export function Footer() {
  return <>Footer</>;
}
