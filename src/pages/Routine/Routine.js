import ComponentStateEnum from '../../js/componentState.js';
import {useEffect} from 'react';
import * as S from './Styles';
import RoutinePageComponent from '../../component/RoutinePageComponent/RoutinePageComponent';
import Plus from '../../img/plus.svg';

function Routine(props){
    useEffect(() => {
        props.setcomponentState(ComponentStateEnum.Routine); //루틴이 마운트 되면 상태를 루틴으로 바꾼다
    }, []);

    return(
        <S.Container>
            <S.Title>Rountine <S.Subtitle>루틴을 관리합니다.</S.Subtitle></S.Title>
            <div>
                <S.ContentTitle>루틴 관리</S.ContentTitle>
                <S.RoutineContainer>
                    <S.ContainerTitle>루틴 <S.Count>10</S.Count></S.ContainerTitle>
                    <S.RoutineGrid>
                        <RoutinePageComponent/>
                        <RoutinePageComponent/>
                        <RoutinePageComponent/>
                        <RoutinePageComponent/>
                        <S.RoutineAdd>
                            <img alt ='add' src={Plus}></img>
                        </S.RoutineAdd>
                    </S.RoutineGrid>
                </S.RoutineContainer>
            </div>
        </S.Container>
    );
}

export default Routine;