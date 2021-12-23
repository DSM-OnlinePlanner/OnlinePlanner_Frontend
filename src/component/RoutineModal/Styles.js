import styled, { css } from "styled-components";
import { color } from "../style/color";
import TextareaAutosize from "react-textarea-autosize";

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

export const Title = styled.div`
  font-size: 24px;
  font-weight: 500;
  color: ${color.black};
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  box-sizing: border-box;
  width: 100%;
`;

export const Modify = styled.div`
  font-size: 18px;
  font-weight: 400;
  color: ${color.gray3};
  transition: color 0.15s ease-in-out;
  cursor: pointer;
  user-select: none;
  :hover {
    color: ${color.blue};
  }
`;

export const TitleSub = styled.div`
  font-size: 18px;
  font-weight: 500;
  color: ${color.gray3};
  margin-left: 16px;
`;
export const Subtitle = styled.div`
  font-size: 18px;
  font-weight: 500;
  color: ${color.black};
  align-self: center;
`;

export const SubtitleContent = styled.div`
  font-size: 18px;
  font-weight: 400;
  color: ${color.gray3};
`;

export const DateLabel = styled.span`
  margin-right: 8px;
  transition: color 0.25s ease-in-out;
  cursor: ${(props) => (props.isModify ? "pointer" : "unset")};
  :hover {
    ${(props) => (props.isModify ? `color: ${color.black}` : "")}
  }
`;

export const Temp = styled.span`
  margin-right: 8px;
`;

export const TitleInner = styled.div`
  display: flex;
  align-items: flex-end;
  width: 90%;
  box-sizing: border-box;
`;

export const InfoGrid = styled.div`
  margin-top: 24px;
  display: grid;
  grid-row-gap: 16px;
  grid-template-columns: 0.15fr 0.85fr;
`;

export const CircleContainer = styled.div`
  display: flex;
  div {
    margin-right: 8px;
  }
`;

export const PriorityDiv = styled.div`
  color: ${(props) => (props.bool ? color.blue : color.gray3)};
  cursor: ${(props) => (props.bool ? "unset" : "pointer")};
`;

export const Circle = styled.div`
  width: 28px;
  height: 28px;
  background-color: ${(props) => props.color};
  border-radius: 50%;
  align-self: center;
  filter: opacity(1);
  filter: ${(props) => (props.bool ? "opacity(1)" : "opacity(0.2)")};
  cursor: ${(props) => (props.bool ? "unset" : "pointer")};
`;

export const Content = styled.div`
  width: 100%;
  background-color: ${color.gray1};
  border-radius: 10px;
  min-height: 100px;
  color: ${color.black};
  padding: 16px;
  box-sizing: border-box;
  margin-top: 16px;
  display: flex;
`;

const InputCSS = css`
  border-radius: 10px;
  padding: 8px;
  color: ${color.black};
  background-color: ${color.gray1};
  outline: none;
  border: 0;
  box-sizing: border-box;
  word-break: break-all;
  user-select: none;
  resize: none;
  width: 100%;
  &:disabled {
    background-color: transparent;
  }
`;

export const Input = styled(TextareaAutosize)`
  ${InputCSS};
  font-size: 24px;
  font-weight: 500;
  box-sizing: border-box;
  margin-right: 16px;
  transform: translateX(-8px);
`;

export const InputContent = styled(TextareaAutosize)`
  ${InputCSS};
  font-size: 18px;
  box-sizing: border-box;
`;

export const InputTime = styled.input`
  border: 0;
  font-size: 18px;
  padding: 4px;
  border-radius: 10px;
  color: ${color.black};
  background-color: ${color.gray1};
  outline: none;
  :disabled {
    background-color: transparent;
  }
`;

export const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  box-sizing: border-box;
  margin-top: 16px;
  button {
    margin-left: 16px;
  }
`;

export const Button = styled.button`
  background-color: ${(props) => props.color};
  cursor: pointer;
  color: ${color.white};
  font-size: 18px;
  padding: 8px 12px;
  border: 0;
  border-radius: 10px;
  outline: none;

  :active {
    filter: brightness(0.8);
  }
`;
