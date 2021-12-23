import styled from "styled-components";
import { color } from "../style/color";

export const CalenderContainer = styled.div`
  width: 100%;
  height: 608px;
  background-color: ${color.white};
  border-radius: 10px;
  display: flex;
  flex-direction: column;
`;

export const CalenderHeader = styled.div`
  width: 100%;
  height: 51px;
  padding: 16px 16px 8px 16px;
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
`;

export const MonthButton = styled.img`
  user-select: none;
  cursor: pointer;
  width: 24px;
  height: 24px;
  :first-child {
    margin-right: 16px;
  }
`;

export const DateTitle = styled.div`
  font-size: 18px;
  font-weight: 400;
  color: ${color.black};
`;

//DOW = Day Of the Week

export const DOWContainer = styled.div`
  width: 100%;
  height: 31px;
  box-sizing: border-box;
  padding: 2px 0px;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
`;

export const DOWCell = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${color.black};
  :first-child {
    color: ${color.red};
  }
  :last-child {
    color: ${color.blue};
  }
`;

export const DayContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: repeat(6, 1fr);
  height: 100%;
`;

export const DayCell = styled.div`
  padding: 8px;
  display: flex;
  flex-direction: column;
`;

export const DayTitle = styled.div`
  margin-bottom: 6px;
  align-self: center;
  color: ${(props) => props.color};
`;

export const DayTodoContainer = styled.div`
  width: 100%;
  height: 100%;
  box-sizing: border-box;
`;

export const DayTodos = styled.div`
  width: 100%;
  height: 8px;
  border-radius: 4px;
  box-sizing: border-box;
  margin-bottom: 2px;
  background-color: ${(props) => props.color};
`;
