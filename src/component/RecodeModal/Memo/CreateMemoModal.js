import { useState } from "react";
import { color } from "../../style/color";
import apiController from "../../../js/ApiController";
import * as S from "../Styles";

const CreateMemoModal = ({ activefunction, reload }) => {
  const MemoType = ["TODAY", "WEEK", "MONTH"];
  const memoObj = {
    memo: "",
    memoType: MemoType[0],
  };

  const [memoState, setMemoState] = useState({ ...memoObj });

  const onChangeHandler = (e) => {
    setMemoState({ ...memoState, [e.target.name]: e.target.value });
  };

  const { memo, memoType } = memoState;
  const [isModify, setIsModify] = useState(true);

  const setMember = (name, value) => {
    setMemoState({ ...memoState, [`${name}`]: value });
  };

  const onPost = async () => {
    if (memo.length <= 0) {
      alert("내용을 입력해주세요.");
      return;
    }
    await apiController
      .post("/api/memo", memoState)
      .then((response) => {
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
        <S.Title>메모</S.Title>
        <S.InfoGrid>
          <S.Subtitle>종류</S.Subtitle>
          <S.SubtitleContent>
            <S.CircleContainer>
              {MemoType.map((value, index) => {
                return (
                  <S.PriorityDiv
                    key={index}
                    bool={memoType === value}
                    onClick={() => {
                      setMember("memoType", value);
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
            name="memo"
            value={memo}
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

export default CreateMemoModal;
