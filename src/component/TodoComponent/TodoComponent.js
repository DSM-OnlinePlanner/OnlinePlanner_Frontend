import { useEffect, useMemo, useState } from "react";
import { color } from "../style/color";
import TodoModal from "../TodoModal/TodoModal";
import * as S from "./Styles";

function TodoComponent({ planner, reload, margin }) {
  const [isModalActive, setIsModalActive] = useState(false);
  const plannerMemo = useMemo(() => {
    return { ...planner };
  }, [planner]);
  const {
    content,
    endDate,
    endTime,
    priority,
    startDate,
    startTime,
    title,
    want,
    email,
    expType,
    isFailed,
    isPushed,
    isSuccess,
    plannerId,
  } = plannerMemo;

  const getRelativeTime = (date, time) => {
    var d = new Date(date);
    if (
      //오늘임
      new Date().getFullYear() === d.getFullYear() &&
      new Date().getMonth() === d.getMonth() &&
      new Date().getDate() === d.getDate()
    ) {
      return time.substring(0, 5);
    } else {
      return date.substring(5);
    }
  };

  const ChangeResponsibilityToColor = (
    responsibility,
    status,
    failed = false
  ) => {
    if (failed) {
      return color.gray2;
    }
    if (status) {
      return color.gray2;
    }
    switch (responsibility) {
      case 1:
        return color.red;
      case 2:
        return color.orange;
      case 3:
        return color.yellow;
      case 4:
        return color.green;
      case 5:
        return color.blue;
      default:
        return color.gray2;
    }
  };
  const wantnum = {
    ONE: 1,
    TWO: 2,
    THREE: 3,
    FOUR: 4,
    FIVE: 5,
  };

  return (
    <>
      <S.TodoContainer
        color={ChangeResponsibilityToColor(wantnum[want], isSuccess, isFailed)}
        margin={margin}
        onClick={() => {
          setIsModalActive(true);
        }}
      >
        <S.TodoInner status={isSuccess}>
          <S.TodoTitle>
            <S.Overflow>{title}</S.Overflow>
            <span>중요도 : {priority}</span>
          </S.TodoTitle>
          <S.TodoDiv>
            <S.Overflow>{content}</S.Overflow>{" "}
            <div>
              {getRelativeTime(startDate, startTime) +
                " ~ " +
                getRelativeTime(endDate, endTime)}
            </div>
          </S.TodoDiv>
        </S.TodoInner>
      </S.TodoContainer>
      {isModalActive && (
        <TodoModal
          reload={reload}
          planner={planner}
          activefunction={setIsModalActive}
        />
      )}
    </>
    // <div id="todo-component-container" className={("responsibility" + responsibility) + " todo-container border-radius-10px " + (status ? 'complete' : '')}>
    //     <div className='todo-inner color-white font-regular'>
    //         <div className="todo-title">
    //             <span className="font-18px font-medium">{title}</span> <span className='font-16px'>{"중요도 : " + importance}</span>
    //         </div>
    //         <div>
    //             <span>{content}</span> <span>{getTimeFromStartEndTime(startTime, endTime)}</span>
    //         </div>
    //     </div>
    // </div>
  );
}

export default TodoComponent;
