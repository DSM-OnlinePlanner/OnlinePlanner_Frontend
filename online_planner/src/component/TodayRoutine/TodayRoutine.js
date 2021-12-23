import * as S from "./Styles";
import * as G from "../style/globalStyle";
import RoutineComponent from "../Routine/RoutineComponent";

const TodayRoutine = () => {
  const testRoutine = {
    routineId: 0,
    title: "string",
    content: "string",
    startTime: {
      hour: 12,
      minute: 0,
      second: 0,
      nano: 0,
    },
    endTime: {
      hour: 13,
      minute: 0,
      second: 0,
      nano: 0,
    },
    isSuccess: false,
    isPushed: false,
    isFailed: false,
    priority: "A",
    dayOfWeeks: ["월", "화", "수"],
  };
  return (
    <>
      <G.SectionTitle>오늘 루틴</G.SectionTitle>
      <S.RoutineContainer>
        <S.InnerTitle>
          완료되지 않음 <S.InnerCount>10</S.InnerCount>
        </S.InnerTitle>
        <RoutineComponent routine={testRoutine}></RoutineComponent>
        <RoutineComponent routine={testRoutine}></RoutineComponent>
        <RoutineComponent routine={testRoutine}></RoutineComponent>
        <RoutineComponent routine={testRoutine}></RoutineComponent>
        <S.InnerTitleComplete>
          완료됨 <S.InnerCount>10</S.InnerCount>
        </S.InnerTitleComplete>
      </S.RoutineContainer>
    </>
  );
};

export default TodayRoutine;
