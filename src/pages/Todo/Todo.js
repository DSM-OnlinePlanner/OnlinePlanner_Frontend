import ComponentStateEnum from "../../js/componentState.js";
import { useEffect, useState } from "react";
import * as S from "./Styles";
import Calender from "../../component/calender.js";
import TodoComponent from "../../component/TodoComponent/TodoComponent.js";
import Plus from "../../img/plus.svg";
import CreateTodoModal from "../../component/TodoModal/CreateTodoModal.js";
import apiController from "../../js/ApiController";

import {
  getNowDate,
  setNowDate as setNowDateLocalStorage,
} from "../../js/NowDate.js";

function Todo({ setcomponentState }) {
  const [nowDate, setNowDate] = useState(getNowDate());
  const [isCalenderOn, setIsCalenderOn] = useState(false);
  const [todos, setTodos] = useState([]);
  const [todoCounts, setTodoCounts] = useState({
    complete: 0,
    uncomplete: 0,
  });
  const [pages, setPages] = useState(0);
  useEffect(() => {
    console.log(todos);
    var c = 0;
    var n = 0;
    todos.forEach((value) => {
      if (value.isSuccess) {
        c++;
      } else {
        n++;
      }
    });
    setTodoCounts({ ...todoCounts, complete: c, uncomplete: n });
  }, [todos]);

  const getDateString = (date) => {
    var str = "";
    str = date.getMonth() + 1 + "월 " + date.getDate() + "일";
    if (new Date().getFullYear() !== date.getFullYear()) {
      str = date.getFullYear() + "년 " + str;
    }
    return str;
  };

  const get2Place = (value) => {
    if (value < 10) {
      return "0" + value;
    }
    return "" + value;
  };

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
    setNowDateLocalStorage(nowDate);
    reload();
  }, [nowDate]);

  const [maxPage, setMaxPage] = useState(0);
  useEffect(() => {
    setcomponentState(ComponentStateEnum.Todo); //할 일이 마운트 되면 상태를 할 일으로 바꾼다
    apiController
      .get("/api/planner/page")
      .then((response) => {
        const { maxPage } = response.data;
        setMaxPage(maxPage);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    moreLoad();
  }, [pages]);

  const [isModalActive, setIsModalActive] = useState(false);

  const moreLoad = async () => {
    const param = {
      date: dateToString(nowDate),
    };
    var t = JSON.parse(JSON.stringify(todos)); //참조없는 복사

    await apiController
      .get(`/api/planner/${pages}`, { params: param })
      .then((response) => {
        if (response.data.length > 0) {
          t = t.concat(response.data);
          setTodos(t);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const reload = async () => {
    const param = {
      date: dateToString(nowDate),
    };

    await apiController
      .get(`/api/planner/0`, { params: param })
      .then((response) => {
        console.log(response.data);
        setTodos(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <S.Container>
      <S.Title>
        To do <S.Subtitle>할 일을 관리합니다.</S.Subtitle>
      </S.Title>
      <div>
        <S.DayTitle>
          <span>{getDateString(nowDate)} 할 일</span>
          <S.DayCalenderContainer>
            <S.ChangeDate
              onClick={() => {
                setIsCalenderOn(!isCalenderOn);
              }}
            >
              날짜 변경
            </S.ChangeDate>
            <Calender
              nowDate={nowDate}
              setNowdate={setNowDate}
              isCalenderOn={isCalenderOn}
            />
            {maxPage > pages && (
              <S.ChangeDate
                onClick={() => {
                  if (pages < maxPage) setPages(pages + 1);
                }}
              >
                더 가져오기
              </S.ChangeDate>
            )}
          </S.DayCalenderContainer>
        </S.DayTitle>
        <S.TodoContainer>
          <S.ContainerTitle>
            완료되지 않음 <S.Count>{todoCounts.uncomplete}</S.Count>
          </S.ContainerTitle>
          <div>
            <S.TodoGrid>
              <S.TodoAdd
                onClick={() => {
                  setIsModalActive(true);
                }}
              >
                <img alt="plus" src={Plus} />
              </S.TodoAdd>

              {todos.map((value, index) => {
                if (!value.isSuccess) {
                  return (
                    <TodoComponent
                      reload={reload}
                      planner={value}
                      key={index}
                    />
                  );
                }
              })}

              {isModalActive && (
                <CreateTodoModal
                  reload={reload}
                  activefunction={setIsModalActive}
                />
              )}
            </S.TodoGrid>
          </div>
          {todoCounts.complete !== 0 && (
            <>
              <S.ContainerTitle>
                완료됨 <S.Count>{todoCounts.complete}</S.Count>
              </S.ContainerTitle>
              <div>
                <S.TodoGrid>
                  {todos.map((value, index) => {
                    if (value.isSuccess) {
                      return (
                        <TodoComponent
                          reload={reload}
                          planner={value}
                          key={index}
                        />
                      );
                    }
                  })}
                </S.TodoGrid>
              </div>
            </>
          )}
        </S.TodoContainer>
      </div>
    </S.Container>
  );
}

export default Todo;
