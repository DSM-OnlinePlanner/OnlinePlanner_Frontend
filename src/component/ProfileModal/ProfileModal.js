import * as S from "./Style";
import profileImg from "../../img/1f914.png";
import { useState } from "react";
import { color } from "../style/color";
import { useEffect } from "react";
import { useLayoutEffect } from "react";
import apiController from "../../js/ApiController";
import Check from "../../img/check.svg";
import LevelIcon from "../../img/level.svg";
import { ClearToken } from "../../js/Token";

const ProfileModal = ({ activeFunction }) => {
  const [isComplete, setIsComplete] = useState(true);
  const [achieve, setAchieve] = useState([]);

  useLayoutEffect(() => {
    apiController
      .get("/api/achieve", { params: { isSucceed: isComplete } })
      .then((response) => {
        setAchieve(response.data);
      });

    getUserInfo();
  }, [isComplete]);

  const haveLV = (string) => {
    return string.includes("LV");
  };

  const achieveToString = (achieve) => {
    var status = achieve.split("_")[0];
    var data = achieve.split("_")[1];

    if (status === "LV") {
      return `레벨 ${data} 달성하기`;
    } else if (status === "PLANNER") {
      return `할일 ${data}개 작성하기`;
    } else if (status === "ROUTINE") {
      return `루틴 ${data}개 작성하기`;
    } else if (status === "SUCCEED") {
      var num = achieve.split("_")[2];
      if (num === undefined) {
        if (data === "PLANNER") {
          return `할일 완료하기`;
        } else if (data === "ROUTINE") {
          return `루틴 완료하기`;
        }
        return `할일 완료하기`;
      } else if (data === "PLANNER") {
        return `할일 ${num}개 완료하기`;
      } else if (data === "ROUTINE") {
        return `루틴 ${num}개 완료하기`;
      }
    } else if (status === "FIRST") {
      if (data === "PLANNER") {
        return "첫 플래너 생성";
      } else if (data === "ROUTINE") {
        return "첫 루틴 생성";
      } else if (data === "GOAL") {
        return "첫 목표 생성";
      } else if (data === "MEMO") {
        return "첫 메모 생성";
      }
    } else {
      return achieve;
    }
  };
  const onDelete = async () => {
    if (window.confirm("계정 탈퇴를 하시겠습니까?")) {
      var email = prompt("탈퇴를 위해 이메일을 입력해주세요.", "이메일");
      var password = prompt("탈퇴를 위해 비밀번호를 입력해주세요.", "비밀번호");

      if (window.confirm("탈퇴하시겠습니까?")) {
        try {
          const response = await apiController.delete(
            "/api/user/account",
            null,
            { email: email, password: password }
          );

          alert("탈퇴 성공");
          ClearToken();
          window.location.href = "/login";
        } catch (error) {
          alert("탈퇴 실패. 다시 시도해주세요.");
        }
      }
    } else {
    }
  };

  const [user, setUser] = useState({
    nickName: "loading",
    userLevel: 0,
    exp: 0,
    maxExp: 0,
    tier: "loading",
  });

  const getUserInfo = async () => {
    const response = await apiController.get("/api/user");

    setUser(response.data);
  };

  const { nickName, userLevel, exp, maxExp, tier } = user;

  return (
    <>
      <S.ModalContainer>
        <S.ModalBack
          onClick={() => {
            activeFunction(false);
          }}
        />
        <S.ModalOuter>
          <S.ProfileContainer>
            <S.ProfileInfo>
              <S.ProfileImage alt="profile img" src={profileImg} />
              <S.InfoContainer>
                <S.Name>{nickName}</S.Name>
                <S.Level>{userLevel}LV</S.Level>
              </S.InfoContainer>
            </S.ProfileInfo>
            <S.UserDelete
              onClick={() => {
                onDelete();
              }}
            >
              계정 탈퇴
            </S.UserDelete>
          </S.ProfileContainer>
          <S.Line />
          <S.MemuContainer>
            <S.Menu
              onClick={() => {
                setIsComplete(true);
              }}
              color={isComplete ? color.blue : color.gray3}
            >
              달성한 업적
            </S.Menu>
            <S.Menu
              color={!isComplete ? color.blue : color.gray3}
              onClick={() => {
                setIsComplete(false);
              }}
            >
              남은 업적
            </S.Menu>
          </S.MemuContainer>
          <S.AchieveContainer>
            {achieve.map((value, index) => {
              return (
                <S.Achieve key={index}>
                  <S.AchieveImage
                    alt="icon"
                    src={haveLV(value["achieve"]) ? LevelIcon : Check}
                  />
                  {achieveToString(value["achieve"])}
                </S.Achieve>
              );
            })}
          </S.AchieveContainer>
        </S.ModalOuter>
      </S.ModalContainer>
    </>
  );
};

export default ProfileModal;
