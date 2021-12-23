import "../css/summary.css";
import ComponentStateEnum from "../js/componentState.js";
import { useEffect, useState, useRef } from "react";
import TodoComponent from "../component/TodoComponent/TodoComponent.js";
import Calender from "../component/calender";
import TodayRoutine from "../component/TodayRoutine/TodayRoutine";
import MainCalender from "../component/MainCalender/MainCalender";
import MainRecode from "../component/MainRecode/MainRecode";
import Statistics from "../component/Statistics/Statistics";
import CircleGraph from "../component/CircleGraph/CircleGraph";
import apiController from "../js/ApiController";
import * as S from "../pages/Todo/Styles";
import {
  getNowDate,
  setNowDate as setNowDateLocalStorage,
} from "../js/NowDate";

function Summary(props) {
  const get2Place = (value) => {
    if (value < 10) {
      return "0" + value;
    }
    return "" + value;
  };

  const [todos, setTodos] = useState([]);
  const dateToString = (date) => {
    var d = new Date(date);
    return (
      d.getFullYear() +
      "-" +
      get2Place(d.getMonth() + 1) +
      "-" +
      get2Place(d.getDate())
    );
  };

  useEffect(() => {
    props.setcomponentState(ComponentStateEnum.Summary); //요약이 마운트 되면 상태를 요약으로 바꾼다
  }, []);

  const reloadTodo = async () => {
    const param = {
      date: dateToString(new Date(nowDate)),
    };
    try {
      const response = await apiController.get("/api/planner/0", {
        params: param,
      });
      setTodos(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const [routines, setRoutines] = useState([]);

  const reloadRoutine = async () => {
    try {
      const response = await apiController.get(`/api/routine/0`);
      setRoutines(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const [nowDate, setNowDate] = useState(getNowDate());
  const [isCalenderOn, setIsCalenderOn] = useState(false);
  const [todoCount, setTodoCount] = useState({
    todoComplete: 0,
    todoNotComplete: 0,
  });
  const { todoComplete, todoNotComplete } = todoCount;

  useEffect(() => {
    var c = 0;
    var n = 0;
    todos.forEach((value) => {
      if (value.isSuccess) c++;
      else n++;
    });
    setTodoCount({ todoComplete: c, todoNotComplete: n });
  }, [todos]);

  useEffect(() => {
    reload();
    setNowDateLocalStorage(nowDate);
  }, [nowDate]);

  const reload = () => {
    reloadTodo();
    reloadRecode();
  };
  const circleGraph = useRef();
  const stickGraph = useRef();

  useEffect(() => {
    circleGraph.current.reload();
    stickGraph.current.reload();
  }, [todos, routines]);

  const [memos, setMemos] = useState({
    todayMemo: [],
    weekMemo: [],
    monthMemo: [],
  });

  const [goals, setGoals] = useState({
    weekGoals: [],
    monthGoals: [],
    yearGoals: [],
  });

  const reloadMemo = async () => {
    await apiController
      .get("/api/memo", {
        params: {
          date: toStringByFormatting(nowDate),
        },
      })
      .then((response) => {
        setMemos(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const reloadGoal = async () => {
    await apiController
      .get("/api/goal", {
        params: {
          date: toStringByFormatting(nowDate),
        },
      })
      .then((response) => {
        setGoals(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const reloadRecode = () => {
    reloadGoal();
    reloadMemo();
  };

  const leftPad = (value) => {
    if (value >= 10) {
      return value;
    }
    return `0${value}`;
  };

  const toStringByFormatting = (source, delimiter = "-") => {
    const year = source.getFullYear();
    const month = leftPad(source.getMonth() + 1);
    const day = leftPad(source.getDate());
    return [year, month, day].join(delimiter);
  };
  const dateToHangul = (date) => {
    return `${date.getMonth() + 1}월 ${date.getDate()}일`;
  };
  return (
    <div id="summary-container">
      <div id="title-container">
        <span id="title-title">
          <span className="font-36px color-black font-medium">Summary</span>
          <span className="font-18px color-black font-regular">
            요약된 정보를 보여줍니다.
          </span>
        </span>
        <S.DayCalenderContainer>
          <S.ChangeDate
            onClick={() => {
              setIsCalenderOn(!isCalenderOn);
            }}
          >
            {dateToString(nowDate)}
          </S.ChangeDate>
          <Calender
            nowDate={nowDate}
            setNowdate={setNowDate}
            isCalenderOn={isCalenderOn}
          />
        </S.DayCalenderContainer>
      </div>
      <div id="summary-content">
        <div id="todo">
          <div className="font-24px color-black font-medium">
            {dateToString(nowDate) === dateToString(new Date())
              ? "오늘"
              : dateToHangul(nowDate)}
            &nbsp; 할 일
          </div>
          <div id="todo-outer" className="border-radius-10px background-white">
            <div>
              <div id="todo-header">
                <span className="font-18px color-black font-medium">
                  완료되지 않음
                </span>
                <span className="font-18px color-blue font-medium">
                  {todoNotComplete}
                </span>
              </div>
              <div>
                {
                  // 할일 생성하는 부분
                  todos.map((value, index) => {
                    if (!value.isSuccess) {
                      return (
                        <TodoComponent
                          margin={8}
                          planner={value}
                          key={index}
                          reload={reloadTodo}
                        />
                      );
                    }
                  })
                }
                {todoNotComplete === 0 && (
                  <S.TodoAdd>할 일이 없습니다.</S.TodoAdd>
                )}
              </div>
            </div>
            <div>
              {todoComplete !== 0 && (
                <div id="complete-todo">
                  <span className="font-18px color-black font-medium">
                    완료됨
                  </span>
                  <span className="font-18px color-blue font-medium">
                    {todoComplete}
                  </span>
                </div>
              )}
              {
                // 할일 생성하는 부분
                todos.map((value, index) => {
                  if (value.isSuccess) {
                    return (
                      <TodoComponent
                        margin={8}
                        planner={value}
                        key={index}
                        reload={reloadTodo}
                      />
                    );
                  }
                })
              }
            </div>
          </div>
        </div>
        <div id="routine">
          <TodayRoutine routines={routines} reload={reloadRoutine} />
        </div>
        <div id="calender">
          <MainCalender />
        </div>
        <div id="record">
          <MainRecode
            memos={memos}
            goals={goals}
            reloadGoal={reloadGoal}
            reloadMemo={reloadMemo}
          />
        </div>
        <div id="statistics">
          <Statistics ref={stickGraph} />
        </div>
        <div id="statistics-graph">
          <CircleGraph ref={circleGraph} />
        </div>
      </div>
    </div>
  );
}

export default Summary;
