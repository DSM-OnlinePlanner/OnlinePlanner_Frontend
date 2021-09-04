import * as S from './Styles';

const RoutineComponent = () => {
    return (
        <S.RoutineContaier>
            <S.RoutineContent>
                <S.RoutineTitle>디자인 공부하기</S.RoutineTitle>
                <S.RoutineText>유튜브 동영상 강의로 공부하기</S.RoutineText>
            </S.RoutineContent>
            <S.RoutineTimeContent>
                <S.RoutineTime>12:00 ~ 13:00</S.RoutineTime>
                <S.RoutineDate>일 월 화 수 목 금 토</S.RoutineDate>
            </S.RoutineTimeContent>
        </S.RoutineContaier>
    );
}

export default RoutineComponent;