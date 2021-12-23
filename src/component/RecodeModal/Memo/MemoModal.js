import { useEffect, useState } from "react";
import { color } from "../../style/color";
import * as S from "../Styles";
import apiController from "../../../js/ApiController";

//   content: "";
//   email: "freedom7113@gmail.com";
//   memoAt: "2021-09-05";
//   memoId: 99;
//   memoType: "TODAY";

const MemoModal = ({ memoObj, activefunction, reload }) => {
  const [memoState, setMemoState] = useState({ ...memoObj });
  const { memoId, content, memoType, memoAt, email } = memoState;
  const [isModify, setIsModify] = useState(false);

  const onChangeHandler = (e) => {
    setMemoState({ ...memoState, [e.target.name]: e.target.value });
  };

  const onModify = async () => {
    if (memoObj.content === content) {
      return;
    }
    await apiController
      .put(`/api/memo/${memoId}`, {
        updateMemo: content,
      })
      .then((response) => {
        alert("수정 완료");
        activefunction(true);
        reload();
      })
      .catch((error) => {
        console.log(error);
        alert("127자 이하로 입력해주세요.");
      });
  };

  const onDelete = async () => {
    await apiController
      .delete(`/api/memo/${memoId}`)
      .then((response) => {
        alert("삭제 완료");
        activefunction(false);
        reload();
      })
      .catch((error) => {
        console.log(error);
        alert("삭제 실패");
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
        <S.Title>
          메모
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
          <S.Subtitle>종류</S.Subtitle>
          <S.SubtitleContent>
            <S.CircleContainer>
              <S.SubtitleContent>{memoType}</S.SubtitleContent>
            </S.CircleContainer>
          </S.SubtitleContent>
          <S.Subtitle>목표</S.Subtitle>
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
            color={color.red}
            onClick={() => {
              onDelete();
            }}
          >
            삭제
          </S.Button>
        </S.ButtonContainer>
      </S.ModalOuter>
    </S.ModalContainer>
  );
};

export default MemoModal;
