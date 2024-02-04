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
      active:  (userInfo?.name) ? false : true,
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
      active: (userInfo?.name) ? true : false,
    },
  ];
  return (
    <>
      <header className="py-2 border-b border-gray-500 px-4">
        <nav className="flex items-center justify-between px-14">
          <div>
            <Link to={"/"}>
              <img class="w-20" src="/logo.png" alt="Logo" />
            </Link>
          </div>
          <ul className="flex items-center space-x-4 ">
            {NavBtn.map((item) => {
              if (item.active) {
                return (
                  <li key={item.name}>
                    <button
                      className="text-lg py-1 rounded-md font-bold px-5 hover:shadow-none hover:translate-x-1 shadow-[1px_2px_0_rgba(14,24,12,0.8)] "
                      onClick={() => navigate(item.slug)}
                    >
                      {item.name}
                    </button>
                  </li>
                );
              }
            })}
            {userInfo?.name && <LogoutBtn />}
          </ul>
          {userInfo.name &&  
          <div className="font-bold mr-8 flex items-center gap-1">
            <img className="size-9" src="./public/user.svg" alt="logo" />
            { userInfo?.name}            
          </div>}
        </nav>
      </header>
    </>
  );
}

export function Footer() {
  return (
    <>
      <div className="flex justify-around items-center border-gray-500 border-y pb-5">
        <div className=" text-center">
          <img className="scale-50" src="/logo.png" alt="Logo" />
          <p className="-mt-6 text-2xl font-serif font-semibold">BLOGS</p>
        </div>
        <div>
          <ul className=" flex gap-20 pt-4 font-serif text-lg">
            <li>
              {" "}
              <Link to="/">Home</Link>{" "}
            </li>
            <li>
              {" "}
              <Link to="/login">About</Link>{" "}
            </li>
            <li>
              {" "}
              <Link to="/login">Terms</Link>{" "}
            </li>
          </ul>
        </div>
      </div>
      <div className="text-gray-500 flex justify-between pt-3 px-14">
        <p>
          © 2024 Blogs - Created by
          <span className="text-gray-400"> Nazam Kalsi</span>
        </p>
        <ul className="flex">
          <li>
            {" "}
            <Link to="https://github.com/Nazam-Kalsi/Blog-App">
              <svg
                className="fill-gray-500 hover:fill-slate-200"
                enable-background="new -1163 1657.697 56.693 56.693"
                height="26.693px"
                id="Layer_1"
                version="1.1"
                viewBox="-1163 1657.697 56.693 56.693"
                width="56.693px"
                xml:space="preserve"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
              >
                <g>
                  <path
                    clip-rule="evenodd"
                    d="M-1134.6598,1662.9163c-13.601,0-24.63,11.0267-24.63,24.6299   c0,10.8821,7.0573,20.1144,16.8435,23.3713c1.2308,0.2279,1.6829-0.5345,1.6829-1.1849c0-0.587-0.0227-2.5276-0.0334-4.5857   c-6.8521,1.4901-8.2979-2.906-8.2979-2.906c-1.1205-2.8467-2.7347-3.6039-2.7347-3.6039   c-2.2349-1.5287,0.1685-1.4972,0.1685-1.4972c2.473,0.1737,3.7755,2.5385,3.7755,2.5385c2.1967,3.7651,5.7618,2.6765,7.1675,2.0472   c0.2211-1.5917,0.8591-2.6786,1.5637-3.2936c-5.4707-0.6226-11.2218-2.7347-11.2218-12.1722c0-2.6888,0.9623-4.8861,2.538-6.611   c-0.2557-0.6206-1.0989-3.1255,0.2386-6.5183c0,0,2.0684-0.6616,6.7747,2.525c1.9648-0.5458,4.0719-0.8195,6.165-0.829   c2.093,0.0095,4.2017,0.2832,6.17,0.829c4.7012-3.1866,6.7665-2.525,6.7665-2.525c1.3406,3.3928,0.4974,5.8977,0.2417,6.5183   c1.5793,1.7249,2.5348,3.9221,2.5348,6.611c0,9.4602-5.7618,11.5428-11.2465,12.1527c0.8834,0.7644,1.6704,2.2632,1.6704,4.561   c0,3.2955-0.0282,5.9479-0.0282,6.7592c0,0.6556,0.4432,1.4236,1.6915,1.1818c9.7812-3.2605,16.8296-12.4896,16.8296-23.3682   C-1110.0299,1673.943-1121.0574,1662.9163-1134.6598,1662.9163z"
                    fill-rule="evenodd"
                  />
                  <path d="M-1149.9611,1698.2793c-0.0542,0.1227-0.2469,0.1593-0.4222,0.0753c-0.1788-0.0804-0.2788-0.2473-0.2211-0.37   c0.053-0.126,0.2457-0.161,0.4242-0.0769C-1150.0013,1697.9882-1149.8993,1698.1566-1149.9611,1698.2793L-1149.9611,1698.2793z    M-1150.2642,1698.0547" />
                  <path d="M-1148.9634,1699.3922c-0.1174,0.1086-0.3473,0.0581-0.5031-0.1139c-0.1613-0.1718-0.1912-0.4016-0.072-0.5118   c0.1211-0.1088,0.3438-0.0579,0.505,0.1139C-1148.8721,1699.0541-1148.8407,1699.2819-1148.9634,1699.3922L-1148.9634,1699.3922z    M-1149.1984,1699.14" />
                  <path d="M-1147.9922,1700.8105c-0.151,0.1051-0.3979,0.0067-0.5505-0.2123c-0.151-0.2191-0.151-0.4819,0.0035-0.5872   c0.1526-0.1051,0.396-0.0104,0.5505,0.2068C-1147.8381,1700.4406-1147.8381,1700.7034-1147.9922,1700.8105L-1147.9922,1700.8105z    M-1147.9922,1700.8105" />
                  <path d="M-1146.6619,1702.1812c-0.1351,0.1489-0.4227,0.1086-0.6329-0.0945c-0.2155-0.1984-0.2753-0.4803-0.1403-0.6293   c0.1371-0.149,0.4263-0.1072,0.6381,0.0944C-1146.5831,1701.7501-1146.5182,1702.0337-1146.6619,1702.1812L-1146.6619,1702.1812z    M-1146.6619,1702.1812" />
                  <path d="M-1144.8265,1702.9769c-0.0597,0.1927-0.3365,0.2804-0.6154,0.1984c-0.2788-0.0845-0.4608-0.3103-0.4047-0.5051   c0.0577-0.1943,0.3361-0.2855,0.6169-0.1979C-1144.9512,1702.5563-1144.7688,1702.7805-1144.8265,1702.9769L-1144.8265,1702.9769z    M-1144.8265,1702.9769" />
                  <path d="M-1142.8107,1703.1243c0.0067,0.2031-0.2299,0.3716-0.5226,0.3752c-0.2944,0.0067-0.533-0.1577-0.5361-0.3577   c0-0.2052,0.2313-0.3717,0.5258-0.3768C-1143.0509,1702.7594-1142.8107,1702.9227-1142.8107,1703.1243L-1142.8107,1703.1243z    M-1142.8107,1703.1243" />
                  <path d="M-1140.9351,1702.8052c0.035,0.198-0.1686,0.4015-0.4594,0.4557c-0.2859,0.0526-0.5504-0.0701-0.587-0.2665   c-0.0354-0.2031,0.1716-0.4066,0.4573-0.4592C-1141.233,1702.4846-1140.9722,1702.6036-1140.9351,1702.8052L-1140.9351,1702.8052z    M-1140.9351,1702.8052" />
                </g>
              </svg>
            </Link>
          </li>
          <li>
            <Link to="https://twitter.com/Nazam_kalsi">
              {" "}
              <svg
                className="fill-gray-500 hover:fill-slate-200"
                height="26.693px"
                version="1.1"
                viewBox="0 0 512 512"
                width="56.693px"
                xml:space="preserve"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:serif="http://www.serif.com/"
                xmlns:xlink="http://www.w3.org/1999/xlink"
              >
                <path d="M161.014,464.013c193.208,0 298.885,-160.071 298.885,-298.885c0,-4.546 0,-9.072 -0.307,-13.578c20.558,-14.871 38.305,-33.282 52.408,-54.374c-19.171,8.495 -39.51,14.065 -60.334,16.527c21.924,-13.124 38.343,-33.782 46.182,-58.102c-20.619,12.235 -43.18,20.859 -66.703,25.498c-19.862,-21.121 -47.602,-33.112 -76.593,-33.112c-57.682,0 -105.145,47.464 -105.145,105.144c0,8.002 0.914,15.979 2.722,23.773c-84.418,-4.231 -163.18,-44.161 -216.494,-109.752c-27.724,47.726 -13.379,109.576 32.522,140.226c-16.715,-0.495 -33.071,-5.005 -47.677,-13.148l0,1.331c0.014,49.814 35.447,93.111 84.275,102.974c-15.464,4.217 -31.693,4.833 -47.431,1.802c13.727,42.685 53.311,72.108 98.14,72.95c-37.19,29.227 -83.157,45.103 -130.458,45.056c-8.358,-0.016 -16.708,-0.522 -25.006,-1.516c48.034,30.825 103.94,47.18 161.014,47.104" />
              </svg>
            </Link>
          </li>
          <li>
            <Link to="https://www.linkedin.com/in/nazam-kalsi">
              <svg
                height="26.693px"
                className="fill-gray-500 hover:fill-slate-200"
                version="1.1"
                viewBox="0 0 512 512"
                width="56.693px"
                xml:space="preserve"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
              >
                <g id="_x35_6-linkedin">
                  <g>
                    <g>
                      <rect
                        height="328.97"
                        width="106.716"
                        x="17.397"
                        y="166.28"
                      />
                      <path d="M414.789,170.138c-1.133-0.355-2.207-0.743-3.396-1.078c-1.438-0.327-2.865-0.6-4.328-0.833     c-5.662-1.139-11.875-1.946-19.148-1.946c-62.211,0-101.678,45.372-114.674,62.894V166.28H166.526v328.97h106.716V315.813     c0,0,80.643-112.628,114.674-29.911V495.25h106.688V273.257C494.604,223.549,460.629,182.13,414.789,170.138L414.789,170.138z      M414.789,170.138" />
                      <path d="M121.789,69.085c0,28.909-23.373,52.337-52.195,52.337c-28.824,0-52.196-23.429-52.196-52.337     c0-28.903,23.372-52.335,52.196-52.335C98.416,16.75,121.789,40.182,121.789,69.085L121.789,69.085z M121.789,69.085" />
                    </g>
                  </g>
                </g>
                <g id="Layer_1" />
              </svg>
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
}
