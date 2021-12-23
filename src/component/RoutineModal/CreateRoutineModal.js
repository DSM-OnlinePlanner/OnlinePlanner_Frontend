import axios from "axios";
import { useCallback, useEffect, useMemo, useState } from "react";
import Calender from "../calender";
import { color } from "../style/color";
import * as S from "./Styles";
import apiController from "../../js/ApiController";

const CreateRoutineModal = ({ activefunction, reload }) => {
  const leftPad = (value) => {
    if (value >= 10) {
      return value;
    }
    return `0${value}`;
  };

  const routine = {
    title: "",
    content: "",
    weeks: [],
    startTime: leftPad(new Date().getHours()) + ":00:00",
    endTime: leftPad(new Date().getHours() + 1) + ":00:00",
    priority: "A",
    pushed: false,
  };

  const [isModify, setIsModify] = useState(true);
  const [routineState, setRoutineState] = useState({ ...routine });

  const { title, content, weeks, startTime, endTime, priority, pushed } =
    routineState;

  const onChangeHandler = (e) => {
    setRoutineState({ ...routineState, [e.target.name]: e.target.value });
  };

  const setMember = (name, value) => {
    setRoutineState({ ...routineState, [name]: value });
  };

  const getHourFromTime = (time) => {
    return `${time.split(":")[0]}:00:00`;
  };

  const onPost = () => {
    if (title.length <= 0 || content.length <= 0 || weeks.length <= 0) {
      alert("전부 작성해주세요.");
      return;
    }
    if (startTime.split(":")[0] > endTime.split(":")[0]) {
      alert("시작시간은 종료시간보다 작아야합니다.");
      return;
    }

    const obj = {
      ...routineState,
      startTime: getHourFromTime(startTime),
      endTime: getHourFromTime(endTime),
    };

    apiController
      .post("/api/routine", obj)
      .then((response) => {
        alert("작성되었습니다.");
        reload();
        activefunction(false);
      })
      .catch((error) => {
        console.log(error);
        alert("작성 실패");
      });
  };

  return (
    <>
      <S.ModalContainer>
        <S.ModalBack
          onClick={() => {
            activefunction(false);
          }}
        />
        <S.ModalOuter>
          <S.Title>
            <S.TitleInner>
              <S.Input
                placeholder="제목을 입력해주세요."
                type="text"
                name="title"
                value={title}
                onChange={onChangeHandler}
                disabled={!isModify}
              />
            </S.TitleInner>
          </S.Title>
          <S.InfoGrid>
            <S.Subtitle>시간 </S.Subtitle>
            <S.SubtitleContent>
              <S.InputTime
                type="time"
                name="startTime"
                required={true}
                disabled={!isModify}
                value={startTime}
                onChange={onChangeHandler}
              />
              <span>~</span>
              <S.InputTime
                type="time"
                name="endTime"
                required={true}
                disabled={!isModify}
                value={endTime}
                onChange={onChangeHandler}
              />
            </S.SubtitleContent>
            <S.Subtitle>중요도</S.Subtitle>
            <S.SubtitleContent>
              {!isModify ? (
                priority
              ) : (
                <S.CircleContainer>
                  {["A", "B", "C", "D", "E"].map((value, index) => {
                    return (
                      <S.PriorityDiv
                        key={index}
                        bool={priority === value}
                        onClick={() => {
                          setMember("priority", value);
                        }}
                      >
                        {value}
                      </S.PriorityDiv>
                    );
                  })}
                </S.CircleContainer>
              )}
            </S.SubtitleContent>
            <S.Subtitle>요일</S.Subtitle>
            <S.SubtitleContent>
              {!isModify ? (
                <S.CircleContainer>
                  {weeks.map((value, index) => {
                    return <S.PriorityDiv>{value}</S.PriorityDiv>;
                  })}
                </S.CircleContainer>
              ) : (
                <S.CircleContainer>
                  {["일", "월", "화", "수", "목", "금", "토"].map(
                    (value, index) => {
                      return (
                        <S.PriorityDiv
                          key={index}
                          bool={weeks.includes(value)}
                          onClick={() => {
                            if (weeks.includes(value)) {
                              var i = weeks.findIndex(function (item) {
                                return item === value;
                              });
                              weeks.splice(i, 1);
                            } else {
                              weeks.push(value);
                            }
                            setRoutineState({
                              ...routineState,
                              weeks: weeks,
                            });
                          }}
                        >
                          {value}
                        </S.PriorityDiv>
                      );
                    }
                  )}
                </S.CircleContainer>
              )}
            </S.SubtitleContent>

            <S.Subtitle>알림</S.Subtitle>
            <S.SubtitleContent
              onClick={() => {
                if (isModify) {
                  setRoutineState({ ...routineState, pushed: !pushed });
                }
              }}
            >
              {pushed ? "켜짐" : "꺼짐"}
            </S.SubtitleContent>
            <S.Subtitle>내용</S.Subtitle>
          </S.InfoGrid>

          <S.Content>
            <S.InputContent
              placeholder="내용을 입력해주세요."
              type="text"
              name="content"
              value={content}
              onChange={onChangeHandler}
              disabled={!isModify}
            />
          </S.Content>
          <S.ButtonContainer>
            <S.Button
              color={color.blue}
              onClick={() => {
                onPost();
              }}
            >
              작성
            </S.Button>
          </S.ButtonContainer>
        </S.ModalOuter>
      </S.ModalContainer>
    </>
  );
};

export default CreateRoutineModal;
