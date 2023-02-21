import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { auth } from "../store/userSlice";

const PC = ["Win", "Mac", "Lin"];
const userData = window.navigator.platform.slice(0, 3);
const platform = PC.indexOf(userData) >= 0 ? "PC" : "MOBILE";
export default function AUTH(SpecificComponent, option, adminRoute = null) {
  // option : null/아무나 true/로그인한 자 false/로그인하지 않은 자
  // post 페이지가 아닌데 redux-data-path 가 비어있지 않다면 초기화해주기
  function AuthenticationCheck(props) {
    let user = useSelector((state) => state.user);
    const token =
      user.loginSuccess && user.loginSuccess.token
        ? user.loginSuccess.token
        : false;
    const isNative = platform === "PC" ? false : token;
    const navigate = useNavigate();
    const dispatch = useDispatch();
    useEffect(() => {
      dispatch(auth(isNative)).then((response) => {
        const payload = response.payload.data;
        if (!payload.isAuth) {
          if (option) {
            navigate("/");
            alert("🙅‍♂️로그인 먼저 해주세요🙏");
          }
        } else {
          if (adminRoute && !payload.isAdmin) {
            navigate("/");
            alert("관리자 권한이 필요합니다");
          } else {
            if (option === false) {
              navigate("/");
              alert("이미 로그인되어있습니다");
            }
          }
        }
      });
    }, []);

    return <SpecificComponent {...props} user={user} />;
  }

  return AuthenticationCheck;
}
