import { useState } from "react";
import RoutineModal from "../RoutineModal/RoutineModal";
import { color } from "../style/color";
import * as S from "./Styles";

const RoutinePageComponent = ({ routine, reload }) => {
  const [isActive, setIsActive] = useState(false);
  const {
    title,
    content,
    startTime,
    endTime,
    dayOfWeeks,
    isFailed,
    isSuccess,
  } = routine;

  const timeToString = (time) => {
    return time.substring(0, 5);
  };

  return (
    <>
      <S.RoutineContaier
        isDeco={isFailed || isSuccess}
        color={isFailed ? color.red : color.black}
        onClick={() => {
          setIsActive(true);
        }}
      >
        <S.RoutineContent>
          <S.RoutineTitle>{title}</S.RoutineTitle>
          <S.RoutineText>{content}</S.RoutineText>
        </S.RoutineContent>
        <S.RoutineTimeContent>
          <S.RoutineTime>
            {timeToString(startTime)} ~ {timeToString(endTime)}
          </S.RoutineTime>
          <S.RoutineDate>
            {dayOfWeeks.map((value) => {
              return value + " ";
            })}
          </S.RoutineDate>
        </S.RoutineTimeContent>
      </S.RoutineContaier>
      {isActive && (
        <RoutineModal
          key={routine.routineId}
          reload={reload}
          routine={routine}
          activefunction={setIsActive}
        />
      )}
    </>
  );
};

export default RoutinePageComponent;
