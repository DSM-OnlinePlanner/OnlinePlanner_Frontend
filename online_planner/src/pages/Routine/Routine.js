import ComponentStateEnum from "../../js/componentState.js";
import { useEffect, useState } from "react";
import * as S from "./Styles";
import RoutinePageComponent from "../../component/RoutinePageComponent/RoutinePageComponent";
import Plus from "../../img/plus.svg";
import CreateRoutineModal from "../../component/RoutineModal/CreateRoutineModal.js";

function Routine(props) {
  const testRoutine = {
    routineId: 0,
    title: "string",
    content: "string",
    startTime: {
      hour: 12,
      minute: 0,
      second: 0,
      nano: 0,
    },
    endTime: {
      hour: 13,
      minute: 0,
      second: 0,
      nano: 0,
    },
    isSuccess: false,
    isPushed: false,
    isFailed: false,
    priority: "A",
    dayOfWeeks: ["월", "화", "수"],
  };

  useEffect(() => {
    props.setcomponentState(ComponentStateEnum.Routine); //루틴이 마운트 되면 상태를 루틴으로 바꾼다
  }, []);
  const [isModal, setIsModal] = useState(false);
  return (
    <>
      <S.Container>
        <S.Title>
          Rountine <S.Subtitle>루틴을 관리합니다.</S.Subtitle>
        </S.Title>
        <div>
          <S.ContentTitle>루틴 관리</S.ContentTitle>
          <S.RoutineContainer>
            <S.ContainerTitle>
              루틴 <S.Count>10</S.Count>
            </S.ContainerTitle>
            <S.RoutineGrid>
              <RoutinePageComponent routine={testRoutine} />
              <RoutinePageComponent routine={testRoutine} />
              <RoutinePageComponent routine={testRoutine} />
              <RoutinePageComponent routine={testRoutine} />
              <S.RoutineAdd
                onClick={() => {
                  setIsModal(true);
                }}
              >
                <img alt="add" src={Plus}></img>
              </S.RoutineAdd>
            </S.RoutineGrid>
          </S.RoutineContainer>
        </div>
      </S.Container>
      {isModal && <CreateRoutineModal activefunction={setIsModal} />}
    </>
  );
}

export default Routine;
