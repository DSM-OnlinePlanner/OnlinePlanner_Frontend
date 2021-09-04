import { useState, useEffect} from 'react';
import {Link, useHistory} from 'react-router-dom';
import '../css/signIn.css';
import { gsap, Power3 } from "gsap";
import axios from 'axios';
import react from 'react';
import apiController from '../js/ApiController.js';
import {ClearToken} from '../js/Token.js'

function SignIn(){
    const ErrorType = {
        EMAIL: 'error-email',
        INFOMATION: 'error-information'
    }

    //https://react.vlpt.us/basic/09-multiple-inputs.html 참고
    const history = useHistory();
    useEffect(() => {
        gsap.from('.use-animation', {opacity:0, x:50, duration:1, ease:Power3.easeOut, stagger:0.1});
    }, []);

    const [infomationMessaage, setInfomationMessaage] = useState('');
    const [emailErrorMessage, setEmailErrorMessage] = useState('');

    const [inputs, setInputs] = useState({
        email: '',
        password: ''
    });

    const onChange = (e) => {
        const { value, name } = e.target; // 우선 e.target 에서 name 과 value 를 추출
        setInputs({
          ...inputs, // 기존의 input 객체를 복사한 뒤
          [name]: value // name 키를 가진 값을 value 로 설정
        });
    };
    const {email, password} = inputs;


    const setErrorMessage = (callback, message, id) => {
        callback(message);
        document.getElementById(id).style = '';
        gsap.from('#' + id, {opacity:1, duration:10, ease:Power3.easeIn});
    }

    const onLogin = () => { //로그인 버튼 누를때 실행
        const data = {
            email,
            password,
        }

        if(data.email === '' || data.password === ''){
            setErrorMessage(setInfomationMessaage, '빈칸을 채워주세요.', ErrorType.INFOMATION);
            return;
        }

        var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; //이메일 정규식
        if(!mailformat.test(data.email)){ //이메일이 유효하지 않음
            setErrorMessage(setEmailErrorMessage, '유효하지 않은 이메일입니다.', ErrorType.EMAIL);
            return;
        }

        //testuser@naver.com qwer1234
        axios.post('api/auth/nd', data)
             .then(onLoginSuccess)
             .catch(error => { //로그인 실패
                 setErrorMessage(setInfomationMessaage, '정보를 다시 확인해 주세요.', ErrorType.INFOMATION);
             })
            
    }

    //https://velog.io/@yaytomato/%ED%94%84%EB%A1%A0%ED%8A%B8%EC%97%90%EC%84%9C-%EC%95%88%EC%A0%84%ED%95%98%EA%B2%8C-%EB%A1%9C%EA%B7%B8%EC%9D%B8-%EC%B2%98%EB%A6%AC%ED%95%98%EA%B8%B0 참고
    const onLoginSuccess = async response => { //로그인 성공시

        const {accessToken, refreshToken} = response.data;

        // axios.defaults.headers.common['Authorization'] = `${accessToken}`; //헤더에 엑세스 토큰 설정

        apiController.defaults.headers.common['Authorization'] = `${accessToken}`; //헤더에 엑세스 토큰 설정
        localStorage.setItem('refreshToken', refreshToken)

        history.push('/');
    }

    return (
        <div className='signin-container '>
            <div className='font-36px font-bold use-animation color-black'>SIGN IN</div>
            <div className='signin-content first-sign-content use-animation'>
                <div className='display-flex justify-content-space-between'><span className='textfield-title font-16px color-gray3 font-medium'>이메일</span><span id={ErrorType.EMAIL}className='font-16px color-red font-medium opacity-0'>{emailErrorMessage}</span></div>
                <input className="textfield font-24px color-black" name='email' placeholder='이메일을 입력해주세요' onChange={onChange} value={email}/>
            </div>
            <div className='signin-content use-animation'>
                <div className='textfield-title font-16px color-gray3 font-medium'>비밀번호</div>
                <input className="textfield font-24px color-black" name='password' type='password' placeholder='비밀번호를 입력해주세요' onChange={onChange} value={password}/>
            </div>
            <div id='password-find' className='use-animation'>
                <span id={ErrorType.INFOMATION} className="color-red font-16px font-medium opacity-0">{infomationMessaage}</span>
                <Link to='/login/password-find' className='font-no-decoration use-animation'><span className="font-16px color-blue font-medium">비밀번호</span><span className='font-16px font-medium color-gray3'>를 잊으셨나요?</span></Link>
            </div>
            <button className="border-radius-10px background-blue font-24px font-medium color-white login-button use-animation" onClick={onLogin}>
                로그인
            </button>

            <div id='sign-in-div'className='use-animation'><span className="color-gray3 font-16px font-medium">회원이 아니라면 &nbsp;</span><span><Link to='/login/signup' className='font-16px color-blue font-medium font-no-decoration'>회원가입</Link></span></div>
        </div>
    )
}

export default SignIn;