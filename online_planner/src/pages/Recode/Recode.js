import ComponentStateEnum from '../../js/componentState.js';
import {useEffect} from 'react';
import * as S from './Styles';
import Memo from '../../component/RecodeComponent/Memo/Memo';

function Routine(props){
    useEffect(() => {
        props.setcomponentState(ComponentStateEnum.Recode); //루틴이 마운트 되면 상태를 루틴으로 바꾼다
    }, []);

    return(
        <>
            <S.Container>
                <S.Title>Recode <S.Subtitle>기록을 관리합니다.</S.Subtitle></S.Title>
                <div>
                    <S.Containers>
                        <div>
                            <S.ContentTitle>메모</S.ContentTitle>
                            <S.ContentContainer>
                                <S.ContainerTitle>오늘 메모 <S.Count>10</S.Count></S.ContainerTitle>
                                <S.Grid>
                                    <Memo text={'qwekqjwklejqkljweklqjwklejqklwejlqkjklwejlqkjelk'}/>
                                    <Memo/>
                                    <Memo/>
                                    <Memo/>
                                </S.Grid>
                                <S.ContainerTitle>이번주 메모 <S.Count>10</S.Count></S.ContainerTitle>
                                <S.Grid>
                                    <Memo/>
                                    <Memo/>
                                    <Memo/>
                                    <Memo/>
                                </S.Grid>
                                <S.ContainerTitle>이번달 메모 <S.Count>10</S.Count></S.ContainerTitle>
                                <S.Grid>
                                    <Memo/>
                                    <Memo/>
                                    <Memo/>
                                    <Memo/>
                                </S.Grid>
                            </S.ContentContainer>
                        </div>
                        <div>
                            <S.ContentTitle>목표</S.ContentTitle>
                            <S.ContentContainer>
                                <S.ContainerTitle>이번주 목표 <S.Count>10</S.Count></S.ContainerTitle>
                                <S.ContainerTitle>이번달 목표 <S.Count>10</S.Count></S.ContainerTitle>
                                <S.ContainerTitle>이번년도 목표 <S.Count>10</S.Count></S.ContainerTitle>
                            </S.ContentContainer>
                        </div>
                    </S.Containers>
                </div>
            </S.Container>
        </>
    );
}

export default Routine;