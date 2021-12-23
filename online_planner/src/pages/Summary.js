import "../css/summary.css";
import ComponentStateEnum from "../js/componentState.js";
import { useEffect, useState } from "react";
import TodoData from "../exampleData/TodoData.js";
import TodoComponent from "../component/TodoComponent/TodoComponent.js";
import Calender from "../component/calender";
import apiController from "../js/ApiController.js";
import { Planner, Time } from "../model/planner.js";
import TodayRoutine from "../component/TodayRoutine/TodayRoutine";
import MainCalender from "../component/MainCalender/MainCalender";
import MainRecode from "../component/MainRecode/MainRecode";
import Statistics from "../component/Statistics/Statistics";
import CircleGraph from "../component/CircleGraph/CircleGraph";

function Summary(props) {
  useEffect(() => {
    props.setcomponentState(ComponentStateEnum.Summary); //요약이 마운트 되면 상태를 요약으로 바꾼다
    // var p = new Planner("hello", 'world', 'A', 'ONE', new Date(2021, 5, 1), new Date(2021, 7, 1), new Time(new Date(2021, 5, 1, 7)), new Time(new Date(2021, 7, 1, 8)), false);
    // console.log(p.toJson());
    // apiController
    // .post('api/planner', p.toJson())
    // .then((response) => {console.log('success');})
    // .catch((error) => {console.log(error); console.log('failed');});
  }, []);

  const [nowDate, setNowDate] = useState(new Date());
  const [isCalenderOn, setIsCalenderOn] = useState(false);
  const [toDoData, setToDoData] = useState(TodoData);
  const [toDoComplete, setToDoComplete] = useState(0); //할 일 달성 횟수를 다루는 변수
  const [todoNotComplete, setTodoNotComplete] = useState(0);

  return (
    <div id="summary-container">
      <div id="title-container">
        <span id="title-title">
          <span className="font-36px color-black font-medium">Summary</span>
          <span className="font-18px color-black font-regular">
            요약된 정보를 보여줍니다.
          </span>
        </span>
        {/* <Calender nowDate={nowDate} setNowDate={setNowDate} isCalenderOn={isCalenderOn}/> */}
      </div>
      <div id="summary-content">
        <div id="todo">
          <div className="font-24px color-black font-medium">오늘 할 일</div>
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
              {
                // 할일 생성하는 부분
                toDoData.map((item, index) => {
                  if (!item.success) {
                    return <TodoComponent planner={item} />;
                  }
                })
              }
            </div>
            <div>
              <div id="complete-todo">
                <span className="font-18px color-black font-medium">
                  완료됨
                </span>
                <span className="font-18px color-blue font-medium">
                  {toDoComplete}
                </span>
              </div>
              {
                // 할일 생성하는 부분
                toDoData.map((item, index) => {
                  if (item.success) {
                    return <TodoComponent planner={item} />;
                  }
                })
              }
            </div>
          </div>
        </div>
        <div id="routine">
          <TodayRoutine></TodayRoutine>
        </div>
        <div id="calender">
          <MainCalender />
        </div>
        <div id="record">
          <MainRecode />
        </div>
        <div id="statistics">
          <Statistics />
        </div>
        <div id="statistics-graph">
          <CircleGraph />
        </div>
      </div>
    </div>
  );
}

export default Summary;
