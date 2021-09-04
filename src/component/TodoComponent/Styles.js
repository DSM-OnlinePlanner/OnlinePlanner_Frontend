import styled from "styled-components";
import { color } from "../style/color";


export const TodoContainer = styled.div`
    margin-bottom: 8px;
    user-select: none;
    border-radius: 10px;
    background-color: ${props => props.color};
    color: ${color.white};
    :hover{
        filter: brightness(0.9);
    }
    transition: filter 0.15s ease-in-out;
    cursor: pointer;
`;


export const TodoInner = styled.div`
    padding: 16px;
    div span:first-child{
        text-decoration: ${props => props.status ? `line-through` : `none`};
    }
`

export const TodoDiv = styled.div`
    display: flex;
    justify-content: space-between;
    align-content: flex-end;
`;


export const TodoTitle = styled.div`
    margin-bottom: 4px;
    display: flex;
    justify-content: space-between;
    align-content: flex-end;
`;
