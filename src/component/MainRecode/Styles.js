import styled from "styled-components";
import Goal from "../RecodeComponent/Goal/Goal";
import { color } from "../style/color";

export const Container = styled.div`
  width: 100%;
  box-sizing: border-box;
  height: 196px;
  padding: 16px;
  border-radius: 10px;
  background-color: ${color.white};
  overflow: scroll;
`;

export const Add = styled.div`
  background-color: ${color.gray1};
  display: flex;
  border-radius: 10px;
  padding: 16px;
  justify-content: center;
  align-items: center;
  margin-bottom: 16px;
  transition: filter 0.15s ease-in-out;
  user-select: none;
  cursor: pointer;
  :hover {
    filter: brightness(0.9);
  }
`;

export const Containers = styled.div`
  ${Container}:first-child {
    margin-bottom: 20px;
  } ;
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  grid-column-gap: 8px;
  :first-child {
    margin-bottom: 56px;
  }
`;

export const ContainerTitle = styled.div`
  font-size: 18px;
  font-weight: 500;
  color: ${color.black};
  margin-bottom: 24px;
  display: flex;
`;

export const ContainerSubtitle = styled.div`
  font-size: 18px;
  font-weight: 400;
  color: ${color.black};
  display: flex;
  margin-bottom: 8px;
`;

export const Count = styled.div`
  margin-left: 8px;
  color: ${color.blue};
  font-size: 18px;
`;
