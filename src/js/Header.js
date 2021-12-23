/* eslint-disable */
import "../css/header.css";
import logo from "../img/logo_with_no_line.svg";
import profileImg from "../img/1f914.png";
import chevronLeft from "../img/chevron-left.svg";
import logout from "../img/log-out-7.svg";
import account from "../img/account.svg";
import flag from "../img/flag-3.svg";
import { useEffect } from "react";
import apiController from "../js/ApiController.js";
import { useState, useRef } from "react";
import { useHistory } from "react-router";
import { ClearToken } from "./Token.js";
import { Link } from "react-router-dom";
import ProfileModal from "../component/ProfileModal/ProfileModal";

function Header() {
  const [userName, setUserName] = useState("loading");
  const userMenu = useRef(null);
  const userNameChevron = useRef(null);
  useEffect(() => {
    apiController
      .get("/api/user") //유저정보 불러오기
      .then((response) => {
        //유저정보 불러오기 성공
        const { nickName, userLevel, exp, maxExp, tier } = response.data;
        setUserName(nickName);
      })
      .catch((error) => {
        //유저정보 불러오기 실패하면 (= 토큰 만료) 로그인 화면으로
        console.log(error);
      });
  }, []);

  //사용자 메뉴를 펼치는 버튼을 눌렀을 때 실행됨
  const userMenuClick = () => {
    const isActive = userMenu.current.classList.contains("active"); //클래스 보유 여부

    //만약 메뉴가 활성화 되있으면
    if (isActive) {
      userMenu.current.classList.replace("active", "disactive");
      userNameChevron.current.classList.remove("active");
    } else {
      //활성화 되있지 않으면
      userMenu.current.classList.replace("disactive", "active");
      userNameChevron.current.classList.add("active");
    }
  };
  const onLogout = () => {
    ClearToken();
    window.location.href = "/login";
  };

  const [isProfile, setIsProfile] = useState(false);

  return (
    //   헤더 div
    <div id="header" className="background-gray">
      {/* 헤더 컨테이너 */}
      <div id="header-container">
        {/* 헤더 로고 부분 */}
        <Link to="/" className="font-no-decoration">
          <span id="logo-title-container">
            <img alt="logo" src={logo} id="header-logo-svg" />
            <span
              id="header-logo-title"
              className="color-black font-medium font-18px"
            >
              Online Planner
            </span>
          </span>
        </Link>

        {/* 헤더 사용자 이름 부분 */}
        <div id="header-user-profile">
          <img id="profile-img" alt="profile-img" src={profileImg} />

          <div>
            {/* 사용자 이름 */}
            <div
              id="profile-name"
              className="font-no-decoration"
              onClick={() => {
                userMenuClick();
              }}
            >
              <span
                id="user-name"
                className=" color-black font-medium font-18px"
              >
                {" "}
                {userName}{" "}
              </span>
              <img
                alt="left"
                src={chevronLeft}
                id="icon-chevron-left"
                className=""
                ref={userNameChevron}
              />
            </div>

            {/* 사용자 메뉴 */}
            <div
              id="profile-menu"
              className="background-white shadow-default border-radius-10px color-black disactive"
              ref={userMenu}
            >
              <ul className="font-16px font-regular color-black">
                <li className="color-black">
                  {" "}
                  <img
                    alt="profile"
                    src={account}
                    className="filter-light-black"
                  />{" "}
                  <a
                    href="#"
                    onClick={() => {
                      setIsProfile(true);
                    }}
                  >
                    프로필
                  </a>{" "}
                </li>
                <li id="log-out" className="color-black">
                  {" "}
                  <img
                    alt="logout"
                    src={logout}
                    className="filter-light-black"
                  />{" "}
                  <a href="#" onClick={onLogout}>
                    로그아웃
                  </a>{" "}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      {isProfile && <ProfileModal activeFunction={setIsProfile} />}
    </div>
  );
}

export default Header;
