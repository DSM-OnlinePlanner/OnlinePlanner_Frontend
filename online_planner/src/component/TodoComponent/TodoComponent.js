import { useState } from "react";
import { Planner } from "../../model/planner";
import { color } from "../style/color";
import TodoModal from "../TodoModal/TodoModal";
import * as S from "./Styles";

function TodoComponent(props) {
  const planner = props.planner;
  const [isModalActive, setIsModalActive] = useState(false);
  const get2Place = (value) => {
    if (value === 0) return "00";
    else if (value < 10) return "0" + value;
    else return value;
  };
  const getRelativeTime = (time) => {
    var str = "";
    const nowTime = new Date();
    if (
      nowTime.getFullYear() === time.getFullYear() &&
      nowTime.getMonth() === time.getMonth()
    ) {
      //오늘이면
      if (nowTime.getDate() === time.getDate()) {
        str = get2Place(time.getHours()) + ":" + get2Place(time.getMinutes());
      }
      //어제면
      else if (nowTime.getDate() - time.getDate() === 1) {
        str = "어제";
      }
      //내일이면
      else if (nowTime.getDate() - time.getDate() === -1) {
        str = "내일";
      }
      //어제, 내일도 아니면
      else {
        str = time.getMonth() + 1 + "." + time.getDate();
      }
    }
    //어제, 내일도 아니면
    else {
      str = time.getMonth() + 1 + "." + time.getDate();
    }
    return str;
  };

  const getTimeFromStartEndTime = (startTime, endTime) => {
    var str = getRelativeTime(startTime) + " ~ " + getRelativeTime(endTime);
    return str;
  };

  const ChangeResponsibilityToColor = (responsibility, status) => {
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

  return (
    <>
      <S.TodoContainer
        color={ChangeResponsibilityToColor(planner.want, planner.success)}
        onClick={() => {
          setIsModalActive(true);
        }}
      >
        <S.TodoInner status={planner.success}>
          <S.TodoTitle>
            <span>{planner.title}</span>
            <span>중요도 : {planner.priority}</span>
          </S.TodoTitle>
          <S.TodoDiv>
            <span>{planner.content}</span>{" "}
            <span>
              {getTimeFromStartEndTime(planner.startDate, planner.endDate)}
            </span>
          </S.TodoDiv>
        </S.TodoInner>
      </S.TodoContainer>
      {isModalActive && (
        <TodoModal
          key={props.key}
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
