import * as G from "../style/globalStyle";
import * as S from "../CircleGraph/Styles";
import { color } from "../style/color";
import apiController from "../../js/ApiController";
import { useState, useEffect, useRef } from "react";
import { useImperativeHandle } from "react";
import { forwardRef } from "react";

const CircleGraph = forwardRef((props, ref) => {
  const [statistics, setStatistics] = useState({
    maxWeek: 0,
    weekSucceed: 0,
    maxMonth: 0,
    monthSucceed: 0,
    pointResponses: [],
  });

  const { maxWeek, weekSucceed, maxMonth, monthSucceed } = statistics;
  const [percent, setPrecent] = useState(0);
  const [isWeek, setIsWeek] = useState(true);

  const reloadStatistics = async () => {
    const response = await apiController.get("/api/statistics");

    setStatistics(response.data);
  };
  useImperativeHandle(ref, () => ({
    reload() {
      reloadStatistics();
    },
  }));

  useEffect(() => {
    reloadStatistics();
  }, []);
  const yGraph = useRef();
  const bGraph = useRef();
  const yGraphOutter = useRef();
  const bGraphOutter = useRef();

  useEffect(() => {
    var wp = (weekSucceed / maxWeek) * 100;
    var mp = (monthSucceed / maxMonth) * 100;

    if (isWeek && weekSucceed > 0) {
      setPrecent(Math.round(wp));
    } else {
      setPrecent(Math.round(mp));
    }

    if (wp <= mp) {
      yGraphOutter.current.style.zIndex = 3;
      bGraphOutter.current.style.zIndex = 4;
    } else {
      yGraphOutter.current.style.zIndex = 4;
      bGraphOutter.current.style.zIndex = 3;
    }

    var maxdash = 672;
    yGraph.current.style.strokeDashoffset = `${Math.round(
      maxdash - maxdash * (mp / 100)
    )}px`;

    bGraph.current.style.strokeDashoffset = `${Math.round(
      maxdash - maxdash * (wp / 100)
    )}px`;
  }, [statistics]);

  return (
    <>
      <G.SectionTitle>&nbsp;</G.SectionTitle>
      <S.Container>
        <S.Header>
          <S.Title>
            완료율 그래프<S.Subtitle>완료한 할 일을 나타냅니다.</S.Subtitle>
          </S.Title>
        </S.Header>
        <S.GraphContainer>
          <S.Svg>
            <S.GraphBack cx="50%" cy="50%" r="107" />
          </S.Svg>
          <S.Svg ref={bGraphOutter}>
            <S.GraphBlue
              onMouseEnter={(event) => {
                event.stopPropagation();
                setIsWeek(true);
                var wp = (weekSucceed / maxWeek) * 100;
                setPrecent(Math.round(wp));
              }}
              cx="50%"
              cy="50%"
              r="107"
              ref={bGraph}
            />
          </S.Svg>
          <S.Svg ref={yGraphOutter}>
            <S.GraphYellow
              onMouseEnter={(event) => {
                event.stopPropagation();
                setIsWeek(false);
                var mp = (monthSucceed / maxMonth) * 100;
                setPrecent(Math.round(mp));
              }}
              cx="50%"
              cy="50%"
              r="107"
              ref={yGraph}
            />
          </S.Svg>
          <S.GraphInfoContainer>
            <S.GraphPercent color={isWeek ? color.blue : color.yellow}>
              {isNaN(percent) ? 0 : percent} %
            </S.GraphPercent>
            <S.GraphTitle>{isWeek ? "이번주" : "이번달"} 완료율</S.GraphTitle>
          </S.GraphInfoContainer>
          <S.GraphNameConatiner>
            <S.GraphName color={color.blue}>이번주 완료율</S.GraphName>
            <S.GraphName color={color.yellow}>이번달 완료율</S.GraphName>
          </S.GraphNameConatiner>
        </S.GraphContainer>
      </S.Container>
    </>
  );
});

export default CircleGraph;
