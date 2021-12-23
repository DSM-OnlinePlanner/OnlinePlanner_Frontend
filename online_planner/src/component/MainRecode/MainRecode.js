import * as G from '../style/globalStyle';
import * as S from './Styles';
import Goal from '../RecodeComponent/Goal/Goal';
import Memo from '../RecodeComponent/Memo/Memo';

const MainRecode = () => {
    return (
    <>
        <G.SectionTitle>기록</G.SectionTitle>
        <S.Containers>
            <S.Container>
                <S.ContainerTitle>목표</S.ContainerTitle>
                <S.ContainerSubtitle>이번주 목표 <S.Count>10</S.Count></S.ContainerSubtitle>
                <div>
                    <Goal/>
                    <Goal/>
                    <Goal/>
                    <Goal/>
                </div>
                <S.ContainerSubtitle>이번달 목표 <S.Count>10</S.Count></S.ContainerSubtitle>
                <div>
                    <Goal/>
                    <Goal/>
                    <Goal/>
                    <Goal/>
                </div>
                <S.ContainerSubtitle>이번년도 목표 <S.Count>10</S.Count></S.ContainerSubtitle>
                <div>
                    <Goal/>
                    <Goal/>
                    <Goal/>
                    <Goal/>
                </div>
            </S.Container>
            <S.Container>
                <S.ContainerTitle>메모</S.ContainerTitle>
                <S.ContainerSubtitle>오늘 메모 <S.Count>10</S.Count></S.ContainerSubtitle>
                <div>
                    <Memo/>
                    <Memo/>
                    <Memo/>
                    <Memo/>
                </div>
                <S.ContainerSubtitle>이번주 메모 <S.Count>10</S.Count></S.ContainerSubtitle>
                <div>
                    <Memo/>
                    <Memo/>
                    <Memo/>
                    <Memo/>
                </div>
                <S.ContainerSubtitle>이번달 메모 <S.Count>10</S.Count></S.ContainerSubtitle>
                <div>
                    <Memo/>
                    <Memo/>
                    <Memo/>
                    <Memo/>
                </div>
            </S.Container>
        </S.Containers>
    </>
    );

}

export default MainRecode;