import '../css/signBackground.css';
import whiteLogo from '../img/whitelogo.svg';

function SignBackground(){

    return(
        <div id='sign-background'>
            <div id='background-container'>
                <div id='logo-title'>
                    <img alt='logo' src={whiteLogo}/>
                    <span className="font-36px color-white font-medium">Online Planner</span>
                </div>
                <div id='content' className="color-white">
                    <div className="font-36px font-bold">Online Planner에 오신걸 환영합니다!</div>
                    <div className='font-24px font-medium'>모바일 어플리케이션과 웹으로 오늘의 일정을 관리하세요.</div>
                    <ul className='font-24px font-regular color-white'>
                        <li>
                            오늘 일정 관리
                        </li>
                        <li>
                            매주 루틴 관리
                        </li>
                        <li>
                            메모 기록
                        </li>
                        <li>
                            목표 설정
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default SignBackground;