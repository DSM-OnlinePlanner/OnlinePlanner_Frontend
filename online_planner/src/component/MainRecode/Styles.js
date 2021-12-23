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

export const Containers = styled.div`
    ${Container}:first-child{
        margin-bottom: 20px;
    };
`;

export const ContainerTitle = styled.div`
    font-size: 18px;
    font-weight: 500;
    color: ${color.black};
    margin-bottom: 24px;
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