import styled from "styled-components";
import { color } from "../../component/style/color";

export const Container = styled.div`
    width: 1280px;
    margin: 0 auto;
`;

export const Content = styled.div`
    width: 100%;
    box-sizing: border-box;    
`;


export const DayCalenderContainer = styled.div`
    font-size: 18px;
    font-weight: 500;
    color: ${color.gray3};
    display: flex;
`;

export const ContentTitle = styled.div`
    font-size: 24px;
    font-weight: 500;
    display: flex;
    align-items: flex-end;
`;

export const ChangeDate = styled.div`
    margin-left: 16px;
    cursor: pointer;
    user-select: none;
    &:hover{
        color: ${color.black};
    }
`;

export const RoutineContainer = styled.div`
    background-color: ${color.white};
    border-radius: 10px;
    padding: 16px;
    width: 100%;
    height: 600px;
    margin-top: 10px;
    box-sizing: border-box;
    overflow: scroll;
`;

export const ContainerTitle = styled.div`
    display: flex;
    font-size: 18px;
    color: ${color.black};
    margin-bottom: 16px;
    font-weight: 400;
`;

export const Count = styled.div`
    color: ${color.blue};
    font-size: 18px;
    font-weight: 400;
    margin-left: 8px;
`;

export const Title = styled.div`
    font-size: 36px;
    font-weight: 500;
    color: ${color.black};
    display: flex;
    margin-top: 40px;
    align-items: flex-end;
    margin-bottom: 72px;
`;

export const Subtitle = styled.div`
    font-size: 18px;
    font-weight: 400;
    color: ${color.black};
    margin-left: 16px;
`;

export const RoutineGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-column-gap: 8px;
    :first-child{
        margin-bottom: 56px;
    }
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
    :hover{
        filter: brightness(0.9);
    }
`;

