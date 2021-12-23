import { useImperativeHandle } from "react";
import { useState, useEffect, useRef, useLayoutEffect } from "react";
import { forwardRef } from "react";
import * as G from "../style/globalStyle";
import * as S from "./Styles";
import apiController from "../../js/ApiController";

const Statistics = forwardRef((props, ref) => {
  const lPad = (num) => {
    if (num < 10) {
      return `0${num}`;
    }
    return `${num}`;
  };
  const [data, setData] = useState({
    sevenDatesPlannerNum: [],
    fourTeenDatesPlannerNum: [],
    sevenDatesSuccessNum: [],
    fourTeenDatesSuccessNum: [],
  });
  const [max, setMax] = useState({
    plannerMaxNum: 0,
    successMaxNum: 0,
  });

  const { plannerMaxNum, successMaxNum } = max;

  const reloadStatistics = async () => {
    const response = await apiController.get("/api/statistics/web");

    setData(response.data);
  };

  useImperativeHandle(ref, () => ({
    reload() {
      reloadStatistics();
    },
  }));
  useLayoutEffect(() => {
    reloadStatistics();
  }, []);

  const {
    sevenDatesPlannerNum,
    fourTeenDatesPlannerNum,
    sevenDatesSuccessNum,
    fourTeenDatesSuccessNum,
  } = data;

  useEffect(() => {
    var m = 0;
    var m2 = 0;
    var array = [];

    if (sevenDatesPlannerNum.length > 0) {
      sevenDatesPlannerNum.forEach((element) => {
        array.push(element.succeedNum);
      });

      m = array.reduce((a, b) => {
        return Math.max(a, b);
      });
    }

    array = [];
    if (fourTeenDatesPlannerNum.length > 0) {
      fourTeenDatesPlannerNum.forEach((element) => {
        array.push(element.succeedNum);
      });

      m2 = array.reduce((a, b) => {
        return Math.max(a, b);
      });
    }

    var m3 = 0;
    var m4 = 0;
    array = [];
    if (sevenDatesSuccessNum.length > 0) {
      sevenDatesSuccessNum.forEach((element) => {
        array.push(element.succeedNum);
      });

      m3 = array.reduce((a, b) => {
        return Math.max(a, b);
      });
    }

    array = [];
    if (fourTeenDatesSuccessNum.length > 0) {
      fourTeenDatesSuccessNum.forEach((element) => {
        array.push(element.succeedNum);
      });

      m4 = array.reduce((a, b) => {
        return Math.max(a, b);
      });
    }

    setMax({
      plannerMaxNum: m > m2 ? m : m2,
      successMaxNum: m3 > m4 ? m3 : m4,
    });
  }, [data]);

  const roundNumber = (num, scale) => {
    if (!("" + num).includes("e")) {
      return +(Math.round(num + "e+" + scale) + "e-" + scale);
    } else {
      var arr = ("" + num).split("e");
      var sig = "";
      if (+arr[1] + scale > 0) {
        sig = "+";
      }
      return +(Math.round(+arr[0] + "e" + sig + (+arr[1] + scale)) + "e-" + scale);
    }
  };

  return (
    <>
      <G.SectionTitle>통계</G.SectionTitle>
      <div>
        <S.Container>
          <S.Title>
            할 일 완료 그래프 <S.Subtitle>할 일 완료 개수 변화를 나타냅니다.</S.Subtitle>
          </S.Title>
          <S.GraphContainer>
            <S.GraphInner>
              <S.NumContainer>
                {[successMaxNum, successMaxNum / 2, 0].map((value, index) => {
                  return <span key={index}>{roundNumber(value, 1)}</span>;
                })}
              </S.NumContainer>
              <S.StickContainers>
                <S.StickContainer>
                  {(fourTeenDatesSuccessNum || []).map((value, index) => {
                    const v = (value.succeedNum / successMaxNum) * 100;
                    return <S.Stick key={index} height={`${isNaN(v) ? 0 : v}%`} />;
                  })}
                </S.StickContainer>
                <S.StickContainer>
                  {sevenDatesSuccessNum.map((value, index) => {
                    const v = (value.succeedNum / successMaxNum) * 100;
                    return <S.StickSecond key={index} height={`${isNaN(v) ? 0 : v}%`} />;
                  })}
                </S.StickContainer>
              </S.StickContainers>
            </S.GraphInner>
            <S.DayContainer>
              {fourTeenDatesSuccessNum.map((value, index) => {
                return <span key={index}>{lPad(value.date)}일</span>;
              })}
            </S.DayContainer>
          </S.GraphContainer>
        </S.Container>
        <S.Container>
          <S.Title>
            할 일 그래프 <S.Subtitle>할 일 개수 변화를 나타냅니다.</S.Subtitle>
          </S.Title>
          <S.GraphContainer>
            <S.GraphInner>
              <S.NumContainer>
                {[plannerMaxNum, plannerMaxNum / 2, 0].map((value, index) => {
                  return <span key={index}>{roundNumber(value, 1)}</span>;
                })}
              </S.NumContainer>
              <S.StickContainers>
                <S.StickContainer>
                  {fourTeenDatesPlannerNum.map((value, index) => {
                    const v = (value.succeedNum / plannerMaxNum) * 100;
                    return <S.Stick key={index} height={`${isNaN(v) ? 0 : v}%`} />;
                  })}
                </S.StickContainer>
                <S.StickContainer>
                  {sevenDatesPlannerNum.map((value, index) => {
                    const v = (value.succeedNum / plannerMaxNum) * 100;
                    return <S.StickSecond key={index} height={`${isNaN(v) ? 0 : v}%`} />;
                  })}
                </S.StickContainer>
              </S.StickContainers>
            </S.GraphInner>
            <S.DayContainer>
              {fourTeenDatesPlannerNum.map((value, index) => {
                return <span key={index}>{lPad(value.date)}일</span>;
              })}
            </S.DayContainer>
          </S.GraphContainer>
        </S.Container>
      </div>
    </>
  );
});

export default Statistics;
