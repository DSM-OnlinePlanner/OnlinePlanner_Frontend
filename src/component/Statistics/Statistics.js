import * as G from '../style/globalStyle';
import * as S from './Styles';

const Statistics = () => {
    return(
        <>
            <G.SectionTitle>통계</G.SectionTitle>
            <div>
                <S.Container>
                    <S.Title>할 일 완료 그래프 <S.Subtitle>할 일 완료 개수 변화를 나타냅니다.</S.Subtitle></S.Title>
                    <S.GraphContainer>
                        <S.GraphInner>
                            <S.NumContainer>
                                <span>10</span>
                                <span>5</span>
                                <span>0</span>
                            </S.NumContainer>
                            <S.StickContainers>
                                <S.StickContainer>
                                    <S.Stick height='30%'/>
                                    <S.Stick height='50%'/>
                                    <S.Stick height='10%'/>
                                    <S.Stick height='40%'/>
                                    <S.Stick height='70%'/>
                                    <S.Stick height='90%'/>
                                    <S.Stick height='100%'/>
                                </S.StickContainer>
                                <S.StickContainer>
                                    <S.StickSecond height='70%'/>
                                    <S.StickSecond height='30%'/>
                                    <S.StickSecond height='40%'/>
                                    <S.StickSecond height='100%'/>
                                    <S.StickSecond height='90%'/>
                                    <S.StickSecond height='50%'/>
                                    <S.StickSecond height='10%'/>
                                </S.StickContainer>
                            </S.StickContainers>
                        </S.GraphInner>
                        <S.DayContainer>
                            <span>1일</span>
                            <span>2일</span>
                            <span>3일</span>
                            <span>4일</span>
                            <span>5일</span>
                            <span>6일</span>
                            <span>7일</span>
                        </S.DayContainer>
                    </S.GraphContainer>
                </S.Container>
                <S.Container>
                    <S.Title>할 일 그래프 <S.Subtitle>할 일 개수 변화를 나타냅니다.</S.Subtitle></S.Title>
                    <S.GraphContainer>
                        <S.GraphInner>
                            <S.NumContainer>
                                <span>10</span>
                                <span>5</span>
                                <span>0</span>
                            </S.NumContainer>
                            <S.StickContainers>
                                <S.StickContainer>
                                    <S.Stick height='30%'/>
                                    <S.Stick height='50%'/>
                                    <S.Stick height='10%'/>
                                    <S.Stick height='40%'/>
                                    <S.Stick height='70%'/>
                                    <S.Stick height='90%'/>
                                    <S.Stick height='100%'/>
                                </S.StickContainer>
                                <S.StickContainer>
                                    <S.StickSecond height='70%'/>
                                    <S.StickSecond height='30%'/>
                                    <S.StickSecond height='40%'/>
                                    <S.StickSecond height='100%'/>
                                    <S.StickSecond height='90%'/>
                                    <S.StickSecond height='50%'/>
                                    <S.StickSecond height='10%'/>
                                </S.StickContainer>
                            </S.StickContainers>
                        </S.GraphInner>
                        <S.DayContainer>
                            <span>1일</span>
                            <span>2일</span>
                            <span>3일</span>
                            <span>4일</span>
                            <span>5일</span>
                            <span>6일</span>
                            <span>7일</span>
                        </S.DayContainer>
                    </S.GraphContainer>
                </S.Container>
            </div>
        </>
    );
}

export default Statistics;