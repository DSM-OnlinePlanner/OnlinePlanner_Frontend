import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import arrow from "../img/arrow-20.svg";
import { gsap, Power3 } from "gsap";
import questionMark from "../img/question-thin.svg";
import apiController from "../js/ApiController.js";
import axios from "axios";
import { useHistory } from "react-router";

function SignUp() {
  //https://react.vlpt.us/basic/09-multiple-inputs.html 참고
  useEffect(() => {
    gsap.from(".use-animation", {
      opacity: 0,
      x: 50,
      duration: 1,
      ease: Power3.easeOut,
      stagger: 0.1,
    });
    gsap.from("#back-to-login", {
      opacity: 0,
      xPercent: -100,
      duration: 1,
      ease: Power3.easeOut,
      delay: 1,
    });
  }, []);

  const history = useHistory();

  const [inputs, setInputs] = useState({
    email: "",
    password: "",
    passwordChcek: "",
    emailCheck: "",
    nickname: "",
  });

  const { email, password, passwordCheck, emailCheck, nickname } = inputs;
  const [canEmailCheckButtonActive, setCanEmailCheckButtonActive] =
    useState(false);
  const [canEnterEmailCheck, setCanEnterEmailCheck] = useState(false);
  const [isEmailCheckSent, setIsEmailCheckSent] = useState(false);
  const [emailCheckButtonText, setEmailCheckButtonText] = useState(<>인증</>);
  useEffect(() => {
    if (
      email === "" ||
      password === "" ||
      passwordCheck === "" ||
      nickname === ""
    ) {
      setCanEmailCheckButtonActive(false);
    } else {
      setCanEmailCheckButtonActive(true);
    }
  }, [email, password, passwordCheck, nickname]);

  const onChange = (e) => {
    const { value, name } = e.target; // 우선 e.target 에서 name 과 value 를 추출
    setInputs({
      ...inputs, // 기존의 input 객체를 복사한 뒤
      [name]: value, // name 키를 가진 값을 value 로 설정
    });
  };

  const setErrorMessage = (callback, message, id) => {
    callback(message);
    document.getElementById(id).style = "";
    gsap.from("#" + id, { opacity: 1, duration: 10, ease: Power3.easeIn });
  };

  const onSignUp = async () => {
    if (emailCheck === "") {
      setErrorMessage(
        setAllErrorMessage,
        "이메일 인증을 해야합니다.",
        ErrorType.ALL
      );
      return;
    }

    await axios
      .post("/api/mail/auth", {
        email: email,
        code: emailCheck,
      })
      .then(await onSignUpSuccess)
      .catch((error) => {
        setErrorMessage(
          setEmailCheckErrorMessage,
          "인증코드가 맞지 않습니다.",
          ErrorType.EMAIL_CHECK
        );
      });
  };

  const onSignUpSuccess = (response) => {
    axios
      .post("/api/user", {
        email: email,
        password: password,
        nickName: nickname,
      })
      .then(() => {
        alert("회원가입 완료!");
        history.push("/login");
      })
      .catch((error) => {
        setErrorMessage(
          setEmailCheckErrorMessage,
          "사용자 생성에 실패했습니다.",
          ErrorType.EMAIL_CHECK
        );
      });
  };

  const onClickEmailCheck = async () => {
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; //이메일 정규식
    var isFailed = false;
    if (!mailformat.test(email)) {
      setErrorMessage(
        setEmailErrorMessage,
        "이메일 형식이 맞지 않습니다.",
        ErrorType.EMAIL
      );
      isFailed = true;
    }

    var pw = password;
    var num = pw.search(/[0-9]/g);
    var eng = pw.search(/[a-z]/gi);
    var spe = pw.search(/[`~!@@#$%^&*|₩₩₩'₩";:₩/?]/gi);

    if (
      pw.length < 8 ||
      pw.length > 20 ||
      pw.search(/\s/) !== -1 ||
      num < 0 ||
      eng < 0 ||
      spe < 0
    ) {
      setErrorMessage(
        setPasswordErrorMessage,
        "유효하지 않은 비밀번호 형식입니다.",
        ErrorType.PASSWORD
      );
      isFailed = true;
    }

    if (password !== passwordCheck) {
      setErrorMessage(
        setPasswordCheckErrorMessage,
        "비밀번호를 확인해주세요.",
        ErrorType.PASSWORD_CHECK
      );
      isFailed = true;
    }

    if (isFailed) {
      return;
    }

    const param = {
      //이메일 보낼 파라미터
      email: email,
      name: nickname,
    };

    const emailResend = () => {
      axios
        .put("/api/mail", null, { params: param })
        .then(onEmailSentSuccess)
        .catch((error) => {
          //메일 보내기 실패
          setErrorMessage(
            setEmailCheckErrorMessage,
            "다시 시도해주세요.",
            ErrorType.EMAIL_CHECK
          );
          console.log(error);
        });
    };

    if (!isEmailCheckSent) {
      //첫번째 보내는 이메일 인증일 경우
      axios
        .post("/api/mail", null, { params: param })
        .then(onEmailSentSuccess)
        .catch((error) => {
          //메일 보내기 실패
          emailResend();
          console.log(error);
        });
    } else {
      emailResend();
    }
    alert("이메일을 확인해주세요.");
  };

  const onEmailSentSuccess = (response) => {
    if (!isEmailCheckSent) {
      //첫번째 보내는 이메일일때
      setCanEnterEmailCheck(true); //이메일 인증 입력칸에 적을 수 있음
      setIsEmailCheckSent(true); //이메일을 보냈음
    }

    setEmailCheckButtonText(
      <>
        다시
        <br />
        보내기
      </>
    );
    setCanEmailCheckButtonActive(false);

    setTimeout(() => {
      setCanEmailCheckButtonActive(true);
    }, 10000);
  };

  const ErrorType = {
    EMAIL: "error-email",
    PASSWORD: "error-password",
    PASSWORD_CHECK: "error-password-check",
    EMAIL_CHECK: "error-email-check",
    NICKNAME: "error-nickname",
    ALL: "error-all",
  };

  //각종 입력 에러 메세지 변수
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
  const [passwordCheckErrorMessage, setPasswordCheckErrorMessage] =
    useState("");
  const [emailCheckErrorMessage, setEmailCheckErrorMessage] = useState("");
  const [nicknameErrorMessage, setNicknameErrorMessage] = useState("");
  const [allErrorMessage, setAllErrorMessage] = useState("");

  const [isPasswordInfomationVisible, setIsPasswordInfomationVisible] =
    useState(false);

  return (
    <div className="signin-container use-animation">
      <div className="font-36px font-bold use-animation color-black">
        SIGN UP
      </div>
      <div className="signin-content first-sign-content use-animation">
        <div className="display-flex justify-content-space-between">
          <span className="textfield-title font-16px color-gray3 font-medium">
            이메일
          </span>{" "}
          <span
            id={ErrorType.EMAIL}
            className="font-16px color-red font-medium opacity-0"
          >
            {emailErrorMessage}
          </span>
        </div>
        <input
          className="textfield font-24px color-black"
          name="email"
          placeholder="이메일을 입력해주세요"
          disabled={canEnterEmailCheck ? "disabled" : ""}
          onChange={onChange}
          value={email || ""}
        />
      </div>
      <div className="signin-content use-animation">
        <div className="display-flex justify-content-space-between">
          <span className="display-flex">
            <span className="textfield-title font-16px color-gray3 font-medium">
              비밀번호
            </span>
            <span className="display-flex">
              <img
                alt="questionMark"
                src={questionMark}
                className="filter-gray3"
                id="questionMark"
                onMouseEnter={() => {
                  setIsPasswordInfomationVisible(true);
                }}
                onMouseLeave={() => {
                  setIsPasswordInfomationVisible(false);
                }}
              />
              <div
                id="password-infomation-container"
                className={
                  (isPasswordInfomationVisible ? "" : "disabled ") +
                  "background-white border-radius-10px"
                }
              >
                비밀번호는 영문(대소문자), 숫자, 특수 문자를 포함해야 하고
                공백이 없어야하며 8~20자이여야 합니다.
              </div>
            </span>
          </span>
          <span
            id={ErrorType.PASSWORD}
            className="font-16px color-red font-medium opacity-0"
          >
            {passwordErrorMessage}
          </span>
        </div>
        <input
          className="textfield font-24px color-black"
          name="password"
          type="password"
          placeholder="비밀번호를 입력해주세요"
          disabled={canEnterEmailCheck ? "disabled" : ""}
          onChange={onChange}
          value={password || ""}
        />
      </div>
      <div className="signin-content use-animation">
        <div className="display-flex justify-content-space-between">
          <span className="textfield-title font-16px color-gray3 font-medium">
            비밀번호 확인
          </span>{" "}
          <span
            id={ErrorType.PASSWORD_CHECK}
            className="font-16px color-red font-medium opacity-0"
          >
            {passwordCheckErrorMessage}
          </span>
        </div>
        <input
          className="textfield font-24px color-black"
          name="passwordCheck"
          type="password"
          placeholder="비밀번호를 입력해주세요"
          disabled={canEnterEmailCheck ? "disabled" : ""}
          onChange={onChange}
          value={passwordCheck || ""}
        />
      </div>
      <div className="signin-content use-animation">
        <div className="display-flex justify-content-space-between">
          <span className="textfield-title font-16px color-gray3 font-medium">
            닉네임
          </span>{" "}
          <span
            id={ErrorType.NICKNAME}
            className="font-16px color-red font-medium opacity-0"
          >
            {nicknameErrorMessage}
          </span>
        </div>
        <input
          className="textfield font-24px color-black"
          name="nickname"
          placeholder="닉네임을 입력해주세요"
          disabled={canEnterEmailCheck ? "disabled" : ""}
          onChange={onChange}
          value={nickname || ""}
        />
      </div>
      <div className="use-animation signin-content">
        <div className="display-flex justify-content-space-between">
          <span className="textfield-title font-16px color-gray3 font-medium">
            이메일 인증
          </span>{" "}
          <span
            id={ErrorType.EMAIL_CHECK}
            className="font-16px color-red font-medium opacity-0"
          >
            {emailCheckErrorMessage}
          </span>
        </div>
        <div className="display-flex ">
          <input
            className="checkfield textfield font-24px color-black"
            name="emailCheck"
            disabled={canEnterEmailCheck ? "" : "disabled"}
            placeholder="인증코드를 입력해주세요"
            onChange={onChange}
            value={emailCheck || ""}
          />
          <button
            className="border-radius-10px font-18px color-white background-blue font-medium check-button "
            disabled={canEmailCheckButtonActive ? "" : "disabled"}
            onClick={onClickEmailCheck}
          >
            {emailCheckButtonText}
          </button>
        </div>
      </div>
      <div
        id={ErrorType.ALL}
        className="font-18px color-red font-medium opacity-0"
      >
        {allErrorMessage}
      </div>
      <button
        className="border-radius-10px background-blue font-24px font-medium color-white login-button use-animation"
        onClick={onSignUp}
      >
        회원가입
      </button>
      <Link
        id="back-to-login"
        className="display-flex align-items-center font-no-decoration"
        to="/login"
      >
        <img alt="arrow" src={arrow} />
        <span className="font-24px font-medium color-light-black">SIGN IN</span>
      </Link>
    </div>
  );
}

export default SignUp;
