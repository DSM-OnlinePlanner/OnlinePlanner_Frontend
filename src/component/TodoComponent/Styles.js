import styled from "styled-components";
import { color } from "../style/color";

export const TodoContainer = styled.div`
  user-select: none;
  border-radius: 10px;
  background-color: ${(props) => props.color};
  color: ${color.white};
  margin-bottom: ${(props) => props.margin}px;
  :hover {
    filter: brightness(0.9);
  }
  transition: filter 0.15s ease-in-out;
  cursor: pointer;
  width: 100%;
  box-sizing: border-box;
`;

export const TodoInner = styled.div`
  padding: 16px;
  div span:first-child {
    text-decoration: ${(props) => (props.status ? `line-through` : `none`)};
  }
`;

export const Overflow = styled.div`
  width: 60%;
  display: block; /* Change it as per your requirement. */
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const TodoDiv = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 18px;
  align-content: flex-end;
`;
export const LineBreak = styled.span`
  line-break: ellipsis;
`;

export const TodoTitle = styled.div`
  margin-bottom: 4px;
  font-size: 18px;
  display: flex;
  justify-content: space-between;
  align-content: flex-end;
  span:first-child {
    font-size: 18px;
    font-weight: 500;
  }
`;
export const Title = styled.span`
  
`;
