import { useState } from "react";
import RoutineModal from "../RoutineModal/RoutineModal";
import * as S from "./Styles";

const RoutinePageComponent = ({ routine }) => {
  const [isActive, setIsActive] = useState(false);
  const { title, content, startTime, endTime, dayOfWeeks } = routine;

  const get2Place = (value) => {
    if (value === 0) return "00";
    else if (value < 10) return "0" + value;
    else return value;
  };

  const timeToString = (time) => {
    return get2Place(time.hour) + ":" + get2Place(time.minute);
  };
  return (
    <>
      <S.RoutineContaier
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
        <RoutineModal routine={routine} activefunction={setIsActive} />
      )}
    </>
  );
};

export default RoutinePageComponent;
