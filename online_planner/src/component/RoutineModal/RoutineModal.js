import { useCallback, useEffect, useMemo, useState } from "react";
import Calender from "../calender";
import { color } from "../style/color";
import * as S from "./Styles";

const RoutineModal = ({ routine, activefunction }) => {
  const get2Place = (value) => {
    if (value < 10) {
      return "0" + value;
    }
    return "" + value;
  };
  const timeToTimeString = (time) => {
    return get2Place(time.hour) + ":" + get2Place(time.minute);
  };
  const [isModify, setIsModify] = useState(false);
  const [routineState, setRoutineState] = useState({ ...routine });
  const {
    routineId,
    title,
    content,
    startTime,
    endTime,
    isSuccess,
    isPushed,
    isFailed,
    priority,
    dayOfWeeks,
  } = routineState;
  const [times, setTimes] = useState({
    start: timeToTimeString(startTime),
    end: timeToTimeString(endTime),
  });
  const dateToTimeString = (date) => {
    return get2Place(date.getHours()) + ":" + get2Place(date.getMinutes());
  };
  useEffect(() => {
    var s = new Date();
    const es = new Date();
    const ss = new Date();
    var isChange = false;
    var temp = times["start"].split(":");
    s.setHours(temp[0], temp[1], 0, 0);
    es.setHours(endTime.hour, endTime.minute);
    ss.setHours(startTime.hour, startTime.minute);
    if (s >= es) {
      isChange = true;
      s = ss;
    }

    temp = times["end"].split(":");
    var e = new Date();
    e.setHours(temp[0], temp[1], 0, 0);
    if (e < ss) {
      isChange = true;
      e = es;
    }

    if (isChange) {
      setTimes({
        ...times,
        start: dateToTimeString(s),
        end: dateToTimeString(e),
      });
    }

    const vs = {
      hour: s.getHours(),
      minute: s.getMinutes(),
      second: 0,
      nano: 0,
    };
    const ve = {
      hour: e.getHours(),
      minute: e.getMinutes(),
      second: 0,
      nano: 0,
    };
    setRoutineState({ ...routineState, startTime: vs, endTime: ve });
  }, [times]);

  const onTimeChange = (e) => {
    setTimes({ ...times, [e.target.name]: e.target.value });
  };

  const onChangeHandler = (e) => {
    setRoutineState({ ...routineState, [e.target.name]: e.target.value });
  };

  const setMember = (name, value) => {
    setRoutineState({ ...routineState, [name]: value });
  };

  const getRelativeTime = (time) => {
    return (
      time.getFullYear() + "." + (time.getMonth() + 1) + "." + time.getDate()
    );
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
            {!isSuccess && !isFailed && (
              <S.Modify
                onClick={() => {
                  setIsModify(!isModify);
                }}
              >
                {!isModify ? "수정" : "완료"}
              </S.Modify>
            )}
          </S.Title>
          <S.InfoGrid>
            <S.Subtitle>시간 </S.Subtitle>
            <S.SubtitleContent>
              <S.InputTime
                type="time"
                name="start"
                step="900"
                required={true}
                disabled={!isModify}
                value={times["start"]}
                onChange={onTimeChange}
              />
              <span>~</span>
              <S.InputTime
                type="time"
                name="end"
                step="900"
                required={true}
                disabled={!isModify}
                value={times["end"]}
                onChange={onTimeChange}
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
                  {dayOfWeeks.map((value, index) => {
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
                          bool={dayOfWeeks.includes(value)}
                          onClick={() => {
                            if (dayOfWeeks.includes(value)) {
                              var i = dayOfWeeks.findIndex(function (item) {
                                return item === value;
                              });
                              dayOfWeeks.splice(i, 1);
                            } else {
                              dayOfWeeks.push(value);
                            }
                            setRoutineState({
                              ...routineState,
                              dayOfWeeks: dayOfWeeks,
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

            <S.Subtitle>성공여부</S.Subtitle>
            <S.SubtitleContent>
              {isSuccess ? "완료" : ""}
              {isFailed ? "실패" : ""}
              {!isSuccess && !isFailed ? "진행중" : ""}
            </S.SubtitleContent>
            <S.Subtitle>알림</S.Subtitle>
            <S.SubtitleContent
              onClick={() => {
                if (isModify) {
                  setRoutineState({ ...routineState, isPushed: !isPushed });
                }
              }}
            >
              {isPushed ? "켜짐" : "꺼짐"}
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
          {!isSuccess && !isFailed && (
            <S.ButtonContainer>
              <S.Button
                color={color.red}
                onClick={() => {
                  setRoutineState({ ...routineState, isFailed: true });
                  setIsModify(false);
                }}
              >
                실패
              </S.Button>
              <S.Button
                color={color.blue}
                onClick={() => {
                  setRoutineState({ ...routineState, isSuccess: true });
                  setIsModify(false);
                }}
              >
                성공
              </S.Button>
            </S.ButtonContainer>
          )}
        </S.ModalOuter>
      </S.ModalContainer>
    </>
  );
};

export default RoutineModal;
