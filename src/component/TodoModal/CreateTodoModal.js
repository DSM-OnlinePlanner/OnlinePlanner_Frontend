import axios from "axios";
import { useCallback, useEffect, useMemo, useState } from "react";
import Calender from "../calender";
import { color } from "../style/color";
import * as S from "./Styles";
import apiController from "../../js/ApiController";
import { getNowDate } from "../../js/NowDate";

const CreateTodoModal = ({ activefunction, reload }) => {
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

  const planner = {
    title: "",
    content: "",
    priority: "A",
    want: 1,
    startDate: toStringByFormatting(getNowDate()),
    endDate: toStringByFormatting(getNowDate()),
    startTime: leftPad(new Date().getHours()) + ":00:00",
    endTime: leftPad(new Date().getHours() + 1) + ":00:00",
    isPushed: false,
  };

  const [plannerState, setPlannerState] = useState({ ...planner });
  const [isModify, setIsModify] = useState(true);

  const {
    title,
    content,
    priority,
    want,
    startDate,
    endDate,
    startTime,
    endTime,
    isPushed,
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
  const getHourFromTime = (time) => {
    return `${time.split(":")[0]}:00:00`;
  };
  const onPost = () => {
    const w = ["ONE", "TWO", "THREE", "FOUR", "FIVE"];
    if (new Date(startDate) > new Date(endDate)) {
      alert("시작날짜는 종료날짜보다 작아야합니다.");
      return;
    } else if (startTime.split(":")[0] > endTime.split(":")[0]) {
      alert("시작시간은 종료시간보다 작아야합니다.");
      return;
    } else if (title.length <= 0 || content.length <= 0) {
      alert("내용을 입력해주세요.");
      return;
    }

    const obj = {
      ...plannerState,
      want: w[want - 1],
    };

    apiController
      .post("/api/planner", {
        ...obj,
        startTime: getHourFromTime(startTime),
        endTime: getHourFromTime(endTime),
      })
      .then((response) => {
        alert("작성되었습니다.");
        activefunction(false);
        reload();
      })
      .catch((error) => {
        console.log(error);
        alert("작성 실패");
      });
  };

  const ChangeWantToColor = (want, status) => {
    if (status) {
      return color.gray2;
    }
    switch (want) {
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
            {/* {(!success && !failed) && <S.Modify onClick={() => {setIsModify(!isModify)}}>{!isModify ? "수정" : "완료"}</S.Modify>} */}
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
              <Calender
                nowDate={new Date(tempStart)}
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
              <Calender
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
            <S.Subtitle>우선도</S.Subtitle>
            <S.SubtitleContent>
              {!isModify ? (
                <S.Circle color={ChangeWantToColor(want, false)} bool={true} />
              ) : (
                <S.CircleContainer>
                  {[1, 2, 3, 4, 5].map((value, index) => {
                    return (
                      <S.Circle
                        key={index}
                        bool={want === value}
                        color={ChangeWantToColor(value, false)}
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
            <S.Subtitle>알림</S.Subtitle>
            <S.SubtitleContent
              onClick={() => {
                setMember("isPushed", !isPushed);
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

export default CreateTodoModal;
