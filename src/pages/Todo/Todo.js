import ComponentStateEnum from '../../js/componentState.js';
import { useEffect, useState} from 'react';
import * as S from './Styles';
import Calender from '../../component/calender.js';
import TodoComponent from '../../component/TodoComponent/TodoComponent.js';
import TodoData from '../../exampleData/TodoData.js';
import Plus from '../../img/plus.svg';
import CreateTodoModal from '../../component/TodoModal/CreateTodoModal.js';
import apiController from '../../js/ApiController'
import { useHistory } from 'react-router-dom';

function Todo(props){
    const [nowDate, setNowDate] = useState(new Date());
    const [isCalenderOn, setIsCalenderOn] = useState(false);
    const history = useHistory();
    const getDateString = (date) => {
        var str = "";
        str = (date.getMonth() + 1) + "월 " + date.getDate() + "일"
        if(new Date().getFullYear() !== date.getFullYear()){
            str = date.getFullYear() + "년 " + str;
        }
        return str;
    }

    const get2Place = (value) => {
        if(value < 10){
            return "0" + value;
        }
        return "" + value;
    }
    
    const dateToString = (date) => {
        var d = new Date(date);
        return d.getFullYear() + '-' + get2Place(d.getMonth() + 1) + "-" + get2Place(d.getDate())
    }
    
    useEffect(() => {
        const param = {
            date: dateToString(new Date())
        }

        console.log(dateToString(new Date()));
        props.setcomponentState(ComponentStateEnum.Todo); //할 일이 마운트 되면 상태를 할 일으로 바꾼다
        apiController
            .get('/api/planner/main', {params: param})
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.log(error);
                history.push('/login');
            })
    }, []);

    const [isModalActive, setIsModalActive] = useState(false);

    return(
        <S.Container>
            <S.Title>To do <S.Subtitle>할 일을 관리합니다.</S.Subtitle></S.Title>
            <div>
                <S.DayTitle>
                    <span>{getDateString(nowDate)} 할 일</span>
                    <S.DayCalenderContainer>
                        <S.ChangeDate onClick={() => {setIsCalenderOn(!isCalenderOn)}}>날짜 변경</S.ChangeDate>
                        <Calender nowDate={nowDate} setNowDate={setNowDate} isCalenderOn={isCalenderOn}/>
                    </S.DayCalenderContainer>
                </S.DayTitle>
                <S.TodoContainer>
                    <S.ContainerTitle>완료되지 않음 <S.Count>10</S.Count></S.ContainerTitle>
                    <div>
                        <S.TodoGrid>
                            {
                                
                            }
                            <S.TodoAdd onClick={() => {setIsModalActive(true)}}>
                                <img alt='plus' src={Plus} />
                            </S.TodoAdd>
                            {isModalActive && <CreateTodoModal activefunction={setIsModalActive}/>}
                        </S.TodoGrid>
                    </div>
                    <S.ContainerTitle>완료됨 <S.Count>10</S.Count></S.ContainerTitle>
                    <div>
                        <S.TodoGrid>
                            {
                                
                            }
                        </S.TodoGrid>
                    </div>
                </S.TodoContainer>
            </div>
        </S.Container>
    );
}

export default Todo;