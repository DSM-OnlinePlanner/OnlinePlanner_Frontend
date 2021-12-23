import * as S from "./Styles";
import * as G from "../style/globalStyle";
import RoutineComponent from "../RoutinePageComponent/RoutinePageComponent";
import { useEffect, useState } from "react";
import RoutinePageComponent from "../RoutinePageComponent/RoutinePageComponent";

const TodayRoutine = ({ routines, reload }) => {
  const [todayCount, setTodayCount] = useState(0);

  const isSameDOW = (arr) => {
    var week = ["일", "월", "화", "수", "목", "금", "토"];
    var DOW = week[new Date().getDay()];
    return arr.includes(DOW);
  };

  useEffect(() => {
    var i = 0;

    routines.forEach((element) => {
      if (isSameDOW(element.dayOfWeeks)) {
        i++;
      }
    });
    setTodayCount(i);
  }, [routines]);
  return (
    <>
      <G.SectionTitle>오늘 루틴</G.SectionTitle>
      <S.RoutineContainer>
        <S.InnerTitle>
          루틴 <S.InnerCount>{todayCount}</S.InnerCount>
        </S.InnerTitle>
        {routines.map((value, index) => {
          if (isSameDOW(value.dayOfWeeks)) {
            return (
              <RoutinePageComponent
                reload={reload}
                key={index}
                routine={value}
              />
            );
          }
        })}
        {routines.length === 0 && <S.RoutineAdd>루틴이 없습니다.</S.RoutineAdd>}
      </S.RoutineContainer>
    </>
  );
};

export default TodayRoutine;
