import ComponentStateEnum from "../../js/componentState.js";
import { useEffect, useState } from "react";
import * as S from "./Styles";
import RoutinePageComponent from "../../component/RoutinePageComponent/RoutinePageComponent";
import Plus from "../../img/plus.svg";
import CreateRoutineModal from "../../component/RoutineModal/CreateRoutineModal.js";
import apiController from "../../js/ApiController";

function Routine({ setcomponentState }) {
  const [routines, setRoutines] = useState([]);
  const [todayCount, setTodayCount] = useState(0);

  useEffect(() => {
    setcomponentState(ComponentStateEnum.Routine); //루틴이 마운트 되면 상태를 루틴으로 바꾼다
    apiController
      .get("/api/routine/page")
      .then((response) => {
        const { maxPage } = response.data;
        setMaxPage(maxPage);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const isSameDOW = (arr) => {
    var week = ["일", "월", "화", "수", "목", "금", "토"];
    var DOW = week[new Date().getDay()];
    return arr.includes(DOW);
  };

  useEffect(() => {
    var i = 0;
    routines.forEach((element) => {
      if (isSameDOW(element.dayOfWeeks)) {
        i++;
      }
    });
    setTodayCount(i);
  }, [routines]);

  const [pages, setPages] = useState(0);
  const [maxPage, setMaxPage] = useState(0);

  useEffect(() => {
    moreLoad();
  }, [pages]);
  const moreLoad = () => {
    var r = JSON.parse(JSON.stringify(routines)); //참조없는 복사

    apiController
      .get(`/api/routine/${pages}`)
      .then((response) => {
        r = r.concat(response.data);

        setRoutines(r);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const reload = () => {
    apiController
      .get(`/api/routine/0`)
      .then((response) => {
        setRoutines(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const [isModal, setIsModal] = useState(false);

  return (
    <>
      <S.Container>
        <S.Title>
          Rountine <S.Subtitle>루틴을 관리합니다.</S.Subtitle>
        </S.Title>
        <div>
          <S.ContentTitle>
            루틴 관리
            <S.DayCalenderContainer>
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
          </S.ContentTitle>
          <S.RoutineContainer>
            {todayCount > 0 && (
              <>
                <S.ContainerTitle>
                  오늘 루틴 <S.Count>{todayCount}</S.Count>
                </S.ContainerTitle>
                <S.RoutineGrid>
                  {routines.map((value, index) => {
                    if (isSameDOW(value.dayOfWeeks)) {
                      return (
                        <RoutinePageComponent
                          reload={reload}
                          key={index}
                          routine={value}
                        />
                      );
                    }
                  })}
                </S.RoutineGrid>
              </>
            )}
            <S.ContainerTitle>
              루틴 <S.Count>{todayCount}</S.Count>
            </S.ContainerTitle>
            <S.RoutineGrid>
              <S.RoutineAdd
                onClick={() => {
                  setIsModal(true);
                }}
              >
                <img alt="add" src={Plus}></img>
              </S.RoutineAdd>
              {routines.map((value, index) => {
                if (!isSameDOW(value.dayOfWeeks)) {
                  return (
                    <RoutinePageComponent
                      reload={reload}
                      key={index}
                      routine={value}
                    />
                  );
                }
              })}
            </S.RoutineGrid>
          </S.RoutineContainer>
        </div>
      </S.Container>
      {isModal && (
        <CreateRoutineModal reload={reload} activefunction={setIsModal} />
      )}
    </>
  );
}

export default Routine;
