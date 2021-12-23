import { useState } from "react";
import { color } from "../../style/color";
import * as S from "../Styles";
import apiController from "../../../js/ApiController";

const GoalModal = ({ goalObj, activefunction, reload }) => {
  const [goalState, setGoalState] = useState({ ...goalObj });
  const { goalId, goal, goalType, goalDate, achieve } = goalState;
  const [isModify, setIsModify] = useState(false);

  const onChangeHandler = (e) => {
    setGoalState({ ...goalState, [e.target.name]: e.target.value });
  };
  const setMember = (name, value) => {
    setGoalState({ ...goalState, [`${name}`]: value });
  };

  const onModify = async () => {
    if (goal === goalObj["goal"]) {
      return;
    }
    try {
      await apiController.put(`/api/goal/${goalId}`, { updateGoal: goal });

      alert("수정 성공");
      reload();
    } catch (error) {
      alert("수정 실패");
    }
  };

  const onDelete = async () => {
    try {
      const response = await apiController.delete(`/api/goal/${goalId}`);

      alert("삭제 성공");
      activefunction(false);
      reload();
    } catch (error) {
      alert("삭제 실패");
    }
  };

  const onSuccess = async () => {
    try {
      await apiController.put(`/api/goal/achieve/${goalId}`);

      alert("성공!");
      activefunction(false);
      reload();
    } catch (error) {
      alert("에러");
    }
  };
  return (
    <S.ModalContainer>
      <S.ModalBack
        onClick={() => {
          activefunction(false);
        }}
      ></S.ModalBack>
      <S.ModalOuter>
        <S.Title>
          목표
          {!achieve && (
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
          <S.Subtitle>종류</S.Subtitle>
          <S.SubtitleContent>
            <S.CircleContainer>
              <S.PriorityDiv>{goalType}</S.PriorityDiv>
            </S.CircleContainer>
          </S.SubtitleContent>
          <S.Subtitle>목표</S.Subtitle>
        </S.InfoGrid>
        <S.Content>
          <S.InputContent
            placeholder="내용을 입력해주세요."
            type="text"
            name="goal"
            value={goal}
            onChange={onChangeHandler}
            disabled={!isModify}
          />
        </S.Content>
        <S.ButtonContainer>
          {isModify || achieve ? (
            <S.Button
              color={color.red}
              onClick={() => {
                onDelete();
              }}
            >
              삭제
            </S.Button>
          ) : (
            <S.Button
              color={color.blue}
              onClick={() => {
                onSuccess();
              }}
            >
              성공
            </S.Button>
          )}
        </S.ButtonContainer>
      </S.ModalOuter>
    </S.ModalContainer>
  );
};

export default GoalModal;
