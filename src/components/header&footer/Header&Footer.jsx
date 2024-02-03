import React, { useEffect, useState } from "react";
import LogoutBtn from "./LogoutBtn";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Container from "../container/Container";

export function Header() {
  const [userStatus, userInfo] = useSelector((state) => {
    return [state.authreducer.status, state.authreducer.userinfo];
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
      active:  (userInfo.name) ? false : true,
    },
    {
      name: "Signup",
      slug: "/signup",
      active: (userInfo.name) ? false : true,
    },
    {
      name: "My Posts",
      slug: "/allPosts",
      active: (userInfo.name) ? true : false,
    },
    {
      name: "Add Post",
      slug: "/addpost",
      active: (userInfo.name) ? true : false,
    },
  ];
  return (
    <>
      <header>
        <Container>
          <nav className="flex">
            <div>
              <Link to={"/"}>LOGO</Link>
            </div>
            <ul className="flex space-x-4">
              {NavBtn.map((item) => {
                if (item.active) {
                  return (
                    <li key={item.name}>
                      <button onClick={() => navigate(item.slug)}>
                        {item.name}
                      </button>
                    </li>
                  );
                }
              })}
              {userInfo.name && <LogoutBtn />}
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
