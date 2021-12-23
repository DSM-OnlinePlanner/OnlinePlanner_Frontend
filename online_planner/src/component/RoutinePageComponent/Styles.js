import styled from "styled-components";
import { color } from "../style/color";

export const RoutineContaier = styled.div`
    display: flex;
    border-radius: 10px;
    justify-content: space-between;
    background-color: ${color.gray1};
    color: ${color.black};
    padding: 16px;
    margin-bottom: 8px;
    transition: filter 0.15s ease-in-out;
    user-select: none;
    cursor: pointer;
    :hover{
        filter: brightness(0.9);
    }
`;

export const RoutineTitle = styled.div`
    font-size: 18px;
    font-weight: 500;
    margin-bottom: 4px;
`;

export const RoutineTime = styled.div`
    font-size: 16px;
    font-weight: 400;
    text-align: right;
`;


export const RoutineDate = styled.div`
    font-size: 16px;
    font-weight: 400;
    text-align: right;
`;

export const RoutineText = styled.div`
    font-size: 16px;
    font-weight: 400;
`;

export const RoutineTimeContent = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;

export const RoutineContent = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
`;