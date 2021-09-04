import * as S from './Styles'
import * as G from '../style/globalStyle';
import RoutineComponent from '../Routine/RoutineComponent';

const TodayRoutine = () => {

    return (
        <>
            <G.SectionTitle>오늘 루틴</G.SectionTitle>
            <S.RoutineContainer>
                <S.InnerTitle>완료되지 않음 <S.InnerCount>10</S.InnerCount></S.InnerTitle>
                <RoutineComponent></RoutineComponent>
                <RoutineComponent></RoutineComponent>
                <RoutineComponent></RoutineComponent>
                <RoutineComponent></RoutineComponent>
                <S.InnerTitleComplete>완료됨 <S.InnerCount>10</S.InnerCount></S.InnerTitleComplete>
            </S.RoutineContainer>
        </>
    );
}

export default TodayRoutine;