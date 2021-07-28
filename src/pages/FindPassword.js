import { useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import arrow from '../img/arrow-20.svg';
import { gsap, Power3 } from "gsap";

function FindPassword(){
    //https://react.vlpt.us/basic/09-multiple-inputs.html 참고
    const [inputs, setInputs] = useState({
        email: '',
        emailCheck: ''
    });
    const [canEmailCheckButtonActive, setCanEmailCheckButtonActive] = useState(false); //이메일 인증을 할 수 있으면 true
    const [canEnterEmailCheck, setCanEnterEmailCheck] = useState(false); //이메일 인증 코드를 칠 수 있으면 true
    const onChange = (e) => {
        const { value, name } = e.target; // 우선 e.target 에서 name 과 value 를 추출

        const nextInputs = {            
            //스프레드 문법으로 기존의 객체를 복사한다.
            ...inputs,  
            [name]: value,
        }
        setInputs(nextInputs);

    };
    const setErrorMessage = (callback, message, id) => {
        callback(message);
        gsap.from(id, {opacity:1, duration:10, ease:Power3.easeIn});
    }

    const onClickEmailCheck = () => { //이메일 입력칸의 인증 버튼 누름
        const emailStr = inputs.email;
        var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if(!mailformat.test(emailStr)){
            setErrorMessage(setEmailErrorMessage, '유효하지 않은 이메일입니다.', '#emailError');
            return;
        }
        if(true){ //만약 계정이 존재하지 않는다면
            setErrorMessage(setEmailErrorMessage, '존재하지 않는 계정입니다.', '#emailError');
            return;
        }
        setCanEnterEmailCheck(true);

    }
    const onClickEmailCheckCheck = () => { //인증하기 버튼을 누르면
        
    }
    const {email, emailCheck} = inputs;
    
    //각종 입력 에러 메세지 변수
    const [emailErrorMessage, setEmailErrorMessage] = useState('');
    useEffect(() => { //처음에 실행
        gsap.from('.use-animation', {opacity:0, x:50, duration:1, ease:Power3.easeOut, stagger:0.1})
        gsap.from('#back-to-login', {opacity:0, xPercent:-100, duration:1, ease:Power3.easeOut, delay:1})
    }, []);

    useEffect(() => { //input이 바뀔때 실행
        setCanEmailCheckButtonActive(inputs.email !== '');
    }, [inputs])
    
    return (
        <div className='signin-container use-animation'>
            <div className='font-36px font-bold use-animation color-black'>FIND PASSWORD</div>
            <div className='signin-content first-sign-content use-animation'>
                <div className='display-flex justify-content-space-between'><span className='textfield-title font-16px color-gray3 font-medium'>이메일</span> <span id='emailError' className='font-16px color-red font-medium opacity-0'>{emailErrorMessage}</span></div>
                <div className='display-flex '>
                    <input className="checkfield textfield font-24px color-black" name='email' disabled={canEnterEmailCheck ? "disabled" : ""} placeholder='이메일을 입력해주세요' onChange={onChange} value={email}/>
                    <button className='border-radius-10px font-18px color-white background-blue font-medium check-button ' disabled={canEmailCheckButtonActive ? '' : 'disabled'} onClick={onClickEmailCheck}>인증</button>
                </div>
                <div className='signin-content use-animation'>
                    <div className='textfield-title font-16px color-gray3 font-medium'>이메일 인증</div>
                    <input className="textfield font-24px color-black" name='emailCheck' type='password' disabled={canEnterEmailCheck ? "" : "disabled"} placeholder='인증번호를 입력해주세요' onChange={onChange} value={emailCheck}/>
                </div>
                <button className="border-radius-10px background-blue font-24px font-medium color-white login-button use-animation" onClick={onClickEmailCheckCheck}>
                    인증하기
                </button>

            </div>
            <Link id='back-to-login'className='display-flex align-items-center font-no-decoration' to='/login'><img alt='arrow' src={arrow}/><span className='font-24px font-medium color-light-black'>SIGN IN</span></Link>
        </div>
    )
}

export default FindPassword;