import { useState } from "react";
import { color } from "../../style/color";
import * as S from "../Styles";
import apiController from "../../../js/ApiController";

const CreateGoalModal = ({ activefunction, reload }) => {
  const GoalType = ["WEEK", "MONTH", "YEAR"];

  const goalObj = {
    goal: "",
    goalType: GoalType[0],
  };
  const [goalState, setGoalState] = useState({ ...goalObj });

  const onChangeHandler = (e) => {
    setGoalState({ ...goalState, [e.target.name]: e.target.value });
  };

  const { goal, goalType } = goalState;
  const [isModify, setIsModify] = useState(true);

  const setMember = (name, value) => {
    setGoalState({ ...goalState, [`${name}`]: value });
  };

  const onPost = async () => {
    if (goal.length <= 0) {
      alert("내용을 입력해주세요.");
      return;
    }
    await apiController
      .post("/api/goal", goalState)
      .then((response) => {
        reload();
        alert("작성 완료");
        reload();
        activefunction(false);
      })
      .catch((error) => {
        console.log(error);
        alert("작성 실패");
      });
  };

  return (
    <S.ModalContainer>
      <S.ModalBack
        onClick={() => {
          activefunction(false);
        }}
      ></S.ModalBack>
      <S.ModalOuter>
        <S.Title>목표</S.Title>
        <S.InfoGrid>
          <S.Subtitle>종류</S.Subtitle>
          <S.SubtitleContent>
            <S.CircleContainer>
              {GoalType.map((value, index) => {
                return (
                  <S.PriorityDiv
                    key={index}
                    bool={goalType === value}
                    onClick={() => {
                      setMember("goalType", value);
                    }}
                  >
                    {value}
                  </S.PriorityDiv>
                );
              })}
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
  );
};

export default CreateGoalModal;
