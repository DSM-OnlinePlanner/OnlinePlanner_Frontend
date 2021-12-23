import styled from "styled-components";
import { color } from "../style/color";
export const RoutineContainer = styled.div`
  width: 100%;
  height: 608px;
  background-color: ${color.white};
  border-radius: 10px;
  padding: 16px;
  box-sizing: border-box;
`;

export const RoutineAdd = styled.div`
  background-color: ${color.gray1};
  display: flex;
  justify-content: center;
  align-items: center;
  height: 79px;
  border-radius: 10px;
  user-select: none;
  cursor: pointer;
  transition: filter 0.15s ease-in-out;
  :hover {
    filter: brightness(0.9);
  }
`;

export const InnerTitle = styled.div`
  font-size: 18px;
  font-weight: 500;
  color: ${color.black};
  margin-bottom: 16px;
  display: flex;
`;

export const InnerTitleComplete = styled.div`
  font-size: 18px;
  font-weight: 500;
  color: ${color.black};
  margin-bottom: 16px;
  display: flex;
  margin-top: 20px;
`;

export const InnerCount = styled.div`
  font-size: 18px;
  font-weight: 500;
  color: ${color.blue};
  margin-left: 8px;
`;
