import { useCallback, useEffect, useMemo, useState } from "react";
import Calender from "../calender";
import { color } from "../style/color";
import * as S from "./Styles";
import apiController from "../../js/ApiController";

const RoutineModal = ({ routine, activefunction, reload }) => {
  const get2Place = (value) => {
    if (value < 10) {
      return "0" + value;
    }
    return "" + value;
  };
  const isSameDOW = (arr) => {
    var week = ["일", "월", "화", "수", "목", "금", "토"];
    var DOW = week[new Date().getDay()];
    return dayOfWeeks.includes(DOW);
  };
  const timeToTimeString = (time) => {
    return time.split(":")[0] + ":00:00";
  };

  const [isModify, setIsModify] = useState(false);
  const [routineState, setRoutineState] = useState({
    ...routine,
    dayOfWeeks: JSON.parse(JSON.stringify(routine.dayOfWeeks)),
  });
  const {
    title,
    content,
    dayOfWeeks,
    endTime,
    isFailed,
    isPushed,
    isSuccess,
    priority,
    routineId,
    startTime,
  } = routineState;

  const onChangeHandler = (e) => {
    setRoutineState({ ...routineState, [e.target.name]: e.target.value });
  };

  const setMember = (name, value) => {
    setRoutineState({ ...routineState, [name]: value });
  };

  const onModify = async () => {
    var isfail = false;
    var isChange = false;
    const onError = (error) => {
      console.log(error);
      isfail = true;
    };

    const param = {
      routineId: routineId,
    };

    if (routine.title !== title || routine.content !== content) {
      //타이틀 또는 콘텐츠가 바뀜
      isChange = true;
      await apiController
        .put(
          `/api/routine/${routineId}`,
          {
            //body
            title: title,
            content: content,
          },
          {
            //params
            params: param,
          }
        )
        .catch(onError);
    }

    if (routine.dayOfWeeks !== dayOfWeeks) {
      isChange = true;
      await apiController
        .put(
          `/api/routine/week/${routineId}`,
          {
            //body
            dayOfWeeks: dayOfWeeks,
          },
          {
            //params
            params: param,
          }
        )
        .catch(onError);
    }
    if (routine.startTime !== startTime || routine.endTime !== endTime) {
      isChange = true;
      await apiController
        .put(
          `/api/routine/time/${routineId}`,
          {
            startTime: timeToTimeString(startTime),
            endTime: timeToTimeString(endTime),
          },
          {
            params: param,
          }
        )
        .catch(onError);
    }
    if (routine.isPushed !== isPushed) {
      isChange = true;
      await apiController
        .put(`/api/routine/pushed/${routineId}`)
        .catch(onError);
    }
    if (routine.priority !== priority) {
      isChange = true;
      await apiController
        .put(
          `/api/routine/priority/${routineId}`,
          {
            priority: priority,
          },
          {
            params: param,
          }
        )
        .catch(onError);
    }

    if (isfail) {
      alert("수정 실패");
    } else if (isChange) {
      alert("수정 성공");
      reload();
    }
  };
  const onFail = () => {
    apiController
      .put(`/api/routine/failed/${routineId}`)
      .then(() => {
        alert("실패!");
        reload();
        activefunction(false);
      })
      .catch(() => {
        alert("에러");
      });
  };
  const onSuccess = () => {
    apiController
      .put(`/api/routine/check/${routineId}`)
      .then(() => {
        alert("성공!");
        reload();
        activefunction(false);
      })
      .catch(() => {
        alert("에러");
      });
  };
  const onDelete = () => {
    apiController
      .delete(`/api/routine/${routineId}`)
      .then(() => {
        alert("삭제되었습니다");
        reload();
        activefunction(false);
      })
      .catch(() => {
        alert("에러");
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
            <S.Modify
              onClick={() => {
                if (isModify) {
                  onModify();
                }
                setIsModify(!isModify);
              }}
            >
              {!isModify ? "수정" : "완료"}
            </S.Modify>
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
          {!isSuccess && !isFailed && !isModify && isSameDOW(dayOfWeeks) ? (
            <S.ButtonContainer>
              <S.Button
                color={color.red}
                onClick={() => {
                  setRoutineState({ ...routineState, isFailed: true });
                  setIsModify(false);
                  onFail();
                }}
              >
                실패
              </S.Button>
              <S.Button
                color={color.blue}
                onClick={() => {
                  setRoutineState({ ...routineState, isSuccess: true });
                  setIsModify(false);
                  onSuccess();
                }}
              >
                성공
              </S.Button>
            </S.ButtonContainer>
          ) : (
            <S.ButtonContainer>
              <S.Button
                color={color.red}
                onClick={() => {
                  onDelete();
                }}
              >
                삭제
              </S.Button>
            </S.ButtonContainer>
          )}
        </S.ModalOuter>
      </S.ModalContainer>
    </>
  );
};

export default RoutineModal;
