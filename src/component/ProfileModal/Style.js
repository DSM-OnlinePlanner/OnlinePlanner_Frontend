import styled from "styled-components";
import { color } from "../style/color";
export const ModalContainer = styled.div`
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100vw;
  height: 100vh;
  z-index: 100;
  position: fixed;
`;

export const ModalBack = styled.div`
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100vw;
  height: 100vh;
  background-color: ${color.alphaBlack};
`;

export const ModalOuter = styled.div`
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 600px;
  background-color: ${color.white};
  border-radius: 10px;
  padding: 24px;
  box-sizing: border-box;
`;

export const ProfileImage = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  object-fit: cover;
  object-position: center;
  margin-right: 12px;
`;

export const InfoContainer = styled.div`
  display: flex;
  align-items: flex-end;
`;

export const Name = styled.div`
  font-size: 24px;
  font-weight: 500;
  color: ${color.black};
  margin-right: 12px;
`;

export const Level = styled.div`
  font-size: 18px;
  font-weight: 400;
  color: ${color.blue};
`;

export const ProfileInfo = styled.div`
  display: flex;
  align-items: center;
`;

export const ProfileContainer = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  width: 100%;
  box-sizing: border-box;
`;

export const Line = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${color.gray3};
  margin: 12px 0px;
  box-sizing: border-box;
`;

export const UserDelete = styled.div`
  color: ${color.red};
  font-size: 18px;
  font-weight: 400;
  user-select: none;
  cursor: pointer;
`;

export const MemuContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin-bottom: 24px;
`;

export const Menu = styled.div`
  display: flex;
  padding: 4px 0px;
  justify-content: center;
  user-select: none;
  font-size: 18px;
  color: ${(props) => props.color};
  cursor: pointer;
  position: relative;
  ::after {
    width: 100%;
    position: absolute;
    top: calc((100%) + (8px));
    height: 1px;
    content: "";
    background-color: ${(props) => props.color};
  }
`;

export const AchieveContainer = styled.div`
  overflow: scroll;
  height: 400px;
  width: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  grid-template-columns: repeat(1, 1fr);
`;

export const Achieve = styled.div`
  font-size: 18px;
  color: ${color.black};
  display: flex;
  column-gap: 16px;
  align-items: center;
  padding: 6px 0px;
`;

export const AchieveImage = styled.img`
  width: 34px;
  height: 34px;
`;
