import { useState } from "react";
import RoutineModal from "../RoutineModal/RoutineModal";
import * as S from "./Styles";

const RoutineComponent = (props) => {
  const [isModalActive, setIsModalActive] = useState(false);
  const routine = props.routine;
  const { title, content, startTime, endTime, isSuccess, isFailed, priority } =
    routine;
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
          setIsModalActive(true);
        }}
      >
        <S.RoutineContent>
          <S.RoutineTitle>{title}</S.RoutineTitle>
          <S.RoutineText>{content}</S.RoutineText>
        </S.RoutineContent>
        <S.RoutineContent>
          <S.RoutineText>
            {timeToString(startTime)} ~ {timeToString(endTime)}
          </S.RoutineText>
        </S.RoutineContent>
      </S.RoutineContaier>
      {isModalActive && (
        <RoutineModal
          key={props.key}
          routine={routine}
          activefunction={setIsModalActive}
        />
      )}
    </>
  );
};

export default RoutineComponent;
