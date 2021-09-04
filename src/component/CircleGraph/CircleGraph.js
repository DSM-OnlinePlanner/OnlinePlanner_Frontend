import * as G from '../style/globalStyle';
import * as S from '../CircleGraph/Styles';
import { color } from '../style/color';
const CircleGraph = () => {

    return (
        <>
        
        <G.SectionTitle>&nbsp;</G.SectionTitle>
        <S.Container>
            <S.Header>
                <S.Title>완료율 그래프<S.Subtitle>완료한 할 일을 나타냅니다.</S.Subtitle></S.Title>
            </S.Header>
            <S.GraphContainer>
                <svg>
                    <S.GraphBack cx='50%' cy='50%' r='107'></S.GraphBack>
                    <S.GraphBlue cx='50%' cy='50%' r='107'></S.GraphBlue>
                    <S.GraphYellow cx='50%' cy='50%' r='107'></S.GraphYellow>
                </svg>
                <S.GraphInfoContainer>
                    <S.GraphPercent color={color.blue}>75%</S.GraphPercent>
                    <S.GraphTitle>이번주 완료율</S.GraphTitle>
                </S.GraphInfoContainer>
                <S.GraphNameConatiner>
                    <S.GraphName color={color.blue}>이번주 완료율</S.GraphName>
                    <S.GraphName color={color.yellow}>이번달 완료율</S.GraphName>
                </S.GraphNameConatiner>
            </S.GraphContainer>
        </S.Container>
        </>
    );
}

export default CircleGraph;