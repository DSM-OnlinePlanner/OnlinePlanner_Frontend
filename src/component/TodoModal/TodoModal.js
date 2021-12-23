import { useCallback, useEffect, useMemo, useState } from "react";
import Calender from "../calender";
import { color } from "../style/color";
import * as S from "./Styles";
import apiController from "../../js/ApiController";

const TodoModal = ({ planner, activefunction, reload }) => {
  const [plannerState, setPlannerState] = useState({ ...planner });
  const [isModify, setIsModify] = useState(false);
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
  const {
    content,
    endDate,
    endTime,
    priority,
    startDate,
    startTime,
    title,
    want,
    email,
    expType,
    isFailed,
    isPushed,
    isSuccess,
    plannerId,
  } = plannerState;

  const [tempStart, setTempStart] = useState(new Date(startDate));
  const [tempEnd, setTempEnd] = useState(new Date(endDate));

  useEffect(() => {
    setPlannerState({
      ...plannerState,
      startDate: toStringByFormatting(tempStart),
      endDate: toStringByFormatting(tempEnd),
    });
  }, [tempStart, tempEnd]);

  const [calenderState, setCalenderState] = useState(0);

  const onChangeHandler = (e) => {
    setPlannerState({ ...plannerState, [e.target.name]: e.target.value });
  };

  const setMember = (name, value) => {
    setPlannerState({ ...plannerState, [`${name}`]: value });
  };

  const ChangeResponsibilityToColor = (responsibility, status) => {
    if (status) {
      return color.gray2;
    }
    switch (responsibility) {
      case "ONE":
        return color.red;
      case "TWO":
        return color.orange;
      case "THREE":
        return color.yellow;
      case "FOUR":
        return color.green;
      case "FIVE":
        return color.blue;
      default:
        return color.gray2;
    }
  };
  const onModify = async () => {
    var isfail = false;
    const onError = (error) => {
      console.log(error);
      alert("수정 실패");
      isfail = true;
      return;
    };

    var isChange = false;
    if (planner.title !== title || planner.content !== content) {
      isChange = true;
      await apiController
        .put(`/api/planner/${plannerId}`, {
          title: title,
          content: content,
        })
        .catch(onError);
    }
    if (planner.isPushed !== isPushed) {
      isChange = true;
      await apiController.put(`/api/planner/push/${plannerId}`).catch(onError);
    }
    if (planner.priority !== priority || planner.want !== want) {
      isChange = true;
      await apiController
        .put(`/api/planner/priority/${plannerId}`, null, {
          params: {
            priority: priority,
            want: want,
          },
        })
        .catch(onError);
    }

    if (
      //날짜 시간 동시애 바뀔때
      (planner.startDate !== startDate || planner.endDate !== endDate) &&
      (planner.startTime !== startTime || planner.endTime !== endTime)
    ) {
      isChange = true;
      await apiController
        .put(`/api/planner/time/${plannerId}`, {
          startDate: startDate,
          endDate: endDate,
          startTime: startTime,
          endTime: endTime,
        })
        .catch(onError);
    } else if (planner.startDate !== startDate || planner.endDate !== endDate) {
      //날짜만 바뀔때
      isChange = true;
      await apiController
        .put(`/api/planner/date/${plannerId}`, {
          startDate: startDate,
          endDate: endDate,
        })
        .catch(onError);
    } else if (planner.startTime !== startTime || planner.endTime !== endTime) {
      //시간만 바뀔때
      isChange = true;
      await apiController
        .put(`/api/planner/time/${plannerId}`, {
          startTime: startTime,
          endTime: endTime,
        })
        .catch(onError);
    }

    if (isChange && !isfail) {
      alert("수정 성공");
      reload();
    }
  };

  const onDelete = async () => {
    await apiController
      .delete(`/api/planner/${plannerId}`)
      .then((response) => {
        alert("삭제 성공");
        activefunction(false);
        reload();
      })
      .catch((error) => {
        console.log(error);
        alert("삭제 실패");
      });
  };

  const onFail = async () => {
    await apiController
      .put(`/api/planner/failed/${plannerId}`)
      .then((response) => {
        alert("실패!");
        reload();
        activefunction(false);
      })
      .catch((error) => {
        console.log(error);
        alert("에러");
      });
  };

  const onSuccess = async () => {
    await apiController
      .put(`/api/planner/check/${plannerId}`)
      .then((response) => {
        alert("성공!");
        reload();
        activefunction(false);
      })
      .catch((error) => {
        console.log(error);
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
            {!isSuccess && !isFailed && (
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
            )}
          </S.Title>
          <S.InfoGrid>
            <S.Subtitle>기간 </S.Subtitle>
            <S.SubtitleContent>
              <S.DateLabel
                isModify={isModify}
                onClick={() => {
                  if (isModify) setCalenderState(calenderState === 1 ? 0 : 1);
                }}
              >
                {startDate}
              </S.DateLabel>
              <S.CalenderStyled
                nowDate={tempStart}
                setNowdate={setTempStart}
                isCalenderOn={calenderState === 1}
              />
              <S.Temp>~</S.Temp>
              <S.DateLabel
                isModify={isModify}
                onClick={() => {
                  if (isModify) setCalenderState(calenderState === 2 ? 0 : 2);
                }}
              >
                {endDate}
              </S.DateLabel>
              <S.CalenderStyled
                nowDate={tempEnd}
                setNowdate={setTempEnd}
                isCalenderOn={calenderState === 2}
              />
            </S.SubtitleContent>
            <S.Subtitle>시간 </S.Subtitle>
            <S.SubtitleContent>
              <S.InputTime
                type="time"
                name="startTime"
                step="900"
                required={true}
                disabled={!isModify}
                value={startTime}
                onChange={onChangeHandler}
              />
              <span>~</span>
              <S.InputTime
                type="time"
                name="endTime"
                step="900"
                required={true}
                disabled={!isModify}
                value={endTime}
                onChange={onChangeHandler}
              />
            </S.SubtitleContent>
            <S.Subtitle>우선도</S.Subtitle>
            <S.SubtitleContent>
              {!isModify ? (
                <S.Circle
                  color={ChangeResponsibilityToColor(want)}
                  bool={true}
                />
              ) : (
                <S.CircleContainer>
                  {["ONE", "TWO", "THREE", "FOUR", "FIVE"].map((value) => {
                    return (
                      <S.Circle
                        bool={want === value}
                        color={ChangeResponsibilityToColor(value)}
                        onClick={() => {
                          setMember("want", value);
                        }}
                      ></S.Circle>
                    );
                  })}
                </S.CircleContainer>
              )}
            </S.SubtitleContent>
            <S.Subtitle>중요도</S.Subtitle>
            <S.SubtitleContent>
              {!isModify ? (
                priority
              ) : (
                <S.CircleContainer>
                  {["A", "B", "C", "D", "E"].map((value) => {
                    return (
                      <S.PriorityDiv
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
            <S.Subtitle>성공여부</S.Subtitle>
            <S.SubtitleContent>
              {isSuccess ? "완료" : ""}
              {isFailed ? "실패" : ""}
              {!isSuccess && !isFailed ? "진행중" : ""}
            </S.SubtitleContent>
            <S.Subtitle>알림</S.Subtitle>
            <S.SubtitleContent
              onClick={() => {
                if (isModify) setMember("isPushed", !isPushed);
              }}
            >
              <S.Cursor>{isPushed ? "켜짐" : "꺼짐"}</S.Cursor>
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
            {!isSuccess && !isFailed && !isModify && (
              <>
                <S.Button
                  color={color.red}
                  onClick={() => {
                    setPlannerState({ ...plannerState, isFailed: true });
                    onFail();
                  }}
                >
                  실패
                </S.Button>
                <S.Button
                  color={color.blue}
                  onClick={() => {
                    setPlannerState({ ...plannerState, isSuccess: true });
                    onSuccess();
                  }}
                >
                  성공
                </S.Button>
              </>
            )}
            {isModify && (
              <S.Button
                color={color.red}
                onClick={() => {
                  onDelete();
                }}
              >
                삭제
              </S.Button>
            )}
          </S.ButtonContainer>
        </S.ModalOuter>
      </S.ModalContainer>
    </>
  );
};

export default TodoModal;
