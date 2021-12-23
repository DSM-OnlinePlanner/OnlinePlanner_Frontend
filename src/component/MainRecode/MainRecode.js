import * as G from "../style/globalStyle";
import * as S from "./Styles";
import Goal from "../RecodeComponent/Goal/Goal";
import Memo from "../RecodeComponent/Memo/Memo";
import {
  getNowDate,
  setNowDate as setNowDateLocalStorage,
} from "../../js/NowDate.js";
import { useEffect, useState } from "react";
import apiController from "../../js/ApiController";

const MainRecode = ({ memos, goals, reloadGoal, reloadMemo }) => {
  const { todayMemo, weekMemo, monthMemo } = memos;
  const { weekGoals, monthGoals, yearGoals } = goals;

  const [nowDate, setNowDate] = useState(getNowDate());

  return (
    <>
      <G.SectionTitle>기록</G.SectionTitle>
      <S.Containers>
        <S.Container>
          <S.ContainerTitle>목표</S.ContainerTitle>
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
        </S.Container>
        <S.Container>
          <S.ContainerTitle>메모</S.ContainerTitle>
          {todayMemo.length > 0 && (
            <>
              <S.ContainerTitle>
                오늘 메모 <S.Count>{todayMemo.length}</S.Count>
              </S.ContainerTitle>
              <S.Grid>
                {todayMemo.map((value, index) => {
                  return (
                    <Memo memoObj={value} key={index} reload={reloadMemo} />
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
                    <Memo memoObj={value} key={index} reload={reloadMemo} />
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
                    <Memo memoObj={value} key={index} reload={reloadMemo} />
                  );
                })}
              </S.Grid>
            </>
          )}
          {todayMemo.length === 0 &&
            weekMemo.length === 0 &&
            monthMemo.length === 0 && <S.Add>메모가 없습니다.</S.Add>}
        </S.Container>
      </S.Containers>
    </>
  );
};

export default MainRecode;
