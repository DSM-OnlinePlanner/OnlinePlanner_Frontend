import styled from "styled-components";
import { color } from "../style/color";

export const Container = styled.div`
    width: 100%;
    height: 197px;
    box-sizing: border-box;
    padding: 16px;
    border-radius: 10px;
    background-color: ${color.white};
    display: flex;
    flex-direction: column;
    &:first-child{
        margin-bottom: 20px;
    }
`;

export const Title = styled.div`
    color: ${color.black};
    font-size: 18px;
    font-weight: 500;
    display: flex;
    align-items: flex-end;
    margin-bottom: 24px;
`;

export const Subtitle = styled.div`
    margin-left: 8px;
    color: ${color.gray3};
    font-size: 14px;
    font-weight: 300;
`;

export const GraphContainer = styled.div`
    width: 100%;
    box-sizing: border-box;
    height: 100%;
    display: flex;
    flex-direction: column;
`;


export const StickContainer = styled.div`
    width: 100%;
    box-sizing: border-box;
    height: 100%;
    align-self: flex-end;
    display: flex;
    justify-content: space-around;
    &:first-child{
        transform: translateY(0%);
    }
    &:last-child{
        transform: translateY(-100%);
    }
`;

export const GraphInner = styled.div`
    display: flex;
    flex-direction: row;
    height: 100%;
    width: 100%;
    position: relative;
`;

export const DayContainer = styled.div`
    height: 25px;
    width: 100%;
    box-sizing: border-box;
    padding: 4px 0px 0px 5%;
    display: flex;
    justify-content: space-around;
    font-size: 14px;
    color: ${color.gray3};
`;

export const NumContainer = styled.div`
    width:5%;
    height: 100%;
    font-size: 14px;
    color: ${color.gray3};
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    text-align: right;
    span:nth-child(0)::after{
        top: 0%;
    }
    span:nth-child(1)::after{
        top: 50%;
    }
    span:nth-child(2)::after{
        top: 100%;
    }
    span::after{
        content: "";
        height: 1px;
        left: calc((5%) + (4px));
        width: 93%;
        position: absolute;
        background-color: ${color.gray2};
        top: 0px;
    }
`;

export const StickContainers = styled.div`
    width: 100%;
    height: 100%;
`;

export const StickSecond = styled.span`
    position: relative;
    align-self: flex-end;
    width: 20px;
    height: ${props => props.height};
    border-radius: 5px 5px 0px 0px;
    background-color: ${color.yellow};
`;

export const Stick = styled.div`
    position: relative;
    align-self: flex-end;
    width: 20px;
    height: ${props => props.height};
    border-radius: 5px 5px 0px 0px;
    background-color: ${color.blue};
`;