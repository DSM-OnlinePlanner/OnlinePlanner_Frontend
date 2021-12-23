import ComponentStateEnum from "../../js/componentState.js";
import { useEffect, useState } from "react";
import * as S from "./Styles";
import Memo from "../../component/RecodeComponent/Memo/Memo";
import Plus from "../../img/plus.svg";
import CreateGoalModal from "../../component/RecodeModal/Goal/CreateGoalModal.js";
import CreateMemoModal from "../../component/RecodeModal/Memo/CreateMemoModal.js";
import apiController from "../../js/ApiController";
import * as G from "../Todo/Styles";

import {
  getNowDate,
  setNowDate as setNowDateLocalStorage,
} from "../../js/NowDate";
import Calender from "../../component/calender.js";
import Goal from "../../component/RecodeComponent/Goal/Goal.js";

const Routine = ({ setcomponentState }) => {
  useEffect(() => {
    setcomponentState(ComponentStateEnum.Recode); //루틴이 마운트 되면 상태를 루틴으로 바꾼다
  }, []);
  const [memoModal, setMemoModal] = useState(false);
  const [goalModal, setGoalModal] = useState(false);
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

  const { todayMemo, weekMemo, monthMemo } = memos;

  const { weekGoals, monthGoals, yearGoals } = goals;

  const [nowDate, setNowDate] = useState(getNowDate());
  const [isCalenderOn, setIsCalenderOn] = useState(false);

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

  useEffect(() => {
    setNowDateLocalStorage(nowDate);
    reloadMemo();
    reloadGoal();
  }, [nowDate]);

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

  return (
    <>
      <S.Container>
        <S.Title>
          Recode
          <S.Subtitle>
            기록을 관리합니다.
            <G.DayCalenderContainer>
              <G.ChangeDate
                onClick={() => {
                  setIsCalenderOn(!isCalenderOn);
                }}
              >
                {dateToString(nowDate)}
              </G.ChangeDate>
              <Calender
                nowDate={nowDate}
                setNowdate={setNowDate}
                isCalenderOn={isCalenderOn}
              />
            </G.DayCalenderContainer>
          </S.Subtitle>
        </S.Title>
        <div>
          <S.Containers>
            <div>
              <S.ContentTitle>메모</S.ContentTitle>
              <S.ContentContainer>
                <S.Add
                  onClick={() => {
                    setMemoModal(true);
                  }}
                >
                  <img alt="add" src={Plus} width="16" />
                </S.Add>
                {memoModal && (
                  <CreateMemoModal
                    reload={reloadMemo}
                    activefunction={setMemoModal}
                  />
                )}
                {todayMemo.length > 0 && (
                  <>
                    <S.ContainerTitle>
                      오늘 메모 <S.Count>{todayMemo.length}</S.Count>
                    </S.ContainerTitle>
                    <S.Grid>
                      {todayMemo.map((value, index) => {
                        return (
                          <Memo
                            memoObj={value}
                            key={index}
                            reload={reloadMemo}
                          />
                        );
                      })}
                    </S.Grid>
                  </>
                )}
                {weekMemo.length > 0 && (
                  <>
                    <S.ContainerTitle>
                      이번주 메모 <S.Count>{weekMemo.length}</S.Count>
                    </S.ContainerTitle>
                    <S.Grid>
                      {weekMemo.map((value, index) => {
                        return (
                          <Memo
                            memoObj={value}
                            key={index}
                            reload={reloadMemo}
                          />
                        );
                      })}
                    </S.Grid>
                  </>
                )}
                {monthMemo.length > 0 && (
                  <>
                    <S.ContainerTitle>
                      이번달 메모 <S.Count>{monthMemo.length}</S.Count>
                    </S.ContainerTitle>
                    <S.Grid>
                      {monthMemo.map((value, index) => {
                        return (
                          <Memo
                            memoObj={value}
                            key={index}
                            reload={reloadMemo}
                          />
                        );
                      })}
                    </S.Grid>
                  </>
                )}
                {todayMemo.length === 0 &&
                  weekMemo.length === 0 &&
                  monthMemo.length === 0 && <S.Add>메모가 없습니다.</S.Add>}
              </S.ContentContainer>
            </div>
            <div>
              <S.ContentTitle>목표</S.ContentTitle>
              <S.ContentContainer>
                <S.Add
                  onClick={() => {
                    setGoalModal(true);
                  }}
                >
                  <img alt="add" src={Plus} width="16" />
                </S.Add>
                {goalModal && (
                  <CreateGoalModal
                    reload={reloadGoal}
                    activefunction={setGoalModal}
                  />
                )}
                {weekGoals.length > 0 && (
                  <>
                    <S.ContainerTitle>
                      이번주 목표 <S.Count>{weekGoals.length}</S.Count>
                    </S.ContainerTitle>
                    <S.Grid>
                      {weekGoals.map((value, index) => {
                        return <Goal reload={reloadGoal} goalObj={value} />;
                      })}
                    </S.Grid>
                  </>
                )}
                {monthGoals.length > 0 && (
                  <>
                    <S.ContainerTitle>
                      이번달 목표 <S.Count>{monthGoals.length}</S.Count>
                    </S.ContainerTitle>
                    <S.Grid>
                      {monthGoals.map((value, index) => {
                        return <Goal reload={reloadGoal} goalObj={value} />;
                      })}
                    </S.Grid>
                  </>
                )}
                {yearGoals.length > 0 && (
                  <>
                    <S.ContainerTitle>
                      이번년도 목표 <S.Count>{yearGoals.length}</S.Count>
                    </S.ContainerTitle>
                    <S.Grid>
                      {yearGoals.map((value, index) => {
                        return <Goal reload={reloadGoal} goalObj={value} />;
                      })}
                    </S.Grid>
                  </>
                )}
                {weekGoals.length === 0 &&
                  monthGoals.length === 0 &&
                  yearGoals.length === 0 && <S.Add>목표가 없습니다.</S.Add>}
              </S.ContentContainer>
            </div>
          </S.Containers>
        </div>
      </S.Container>
    </>
  );
};

export default Routine;
