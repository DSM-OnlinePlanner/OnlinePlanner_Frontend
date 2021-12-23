import styled, { css } from "styled-components";
import { color } from "../style/color";

export const Container = styled.div`
  width: 100%;
  box-sizing: border-box;
  height: 413px;
  display: flex;
  flex-direction: column;
  align-content: center;
  background-color: ${color.white};
  border-radius: 10px;
  margin-bottom: 120px;
`;

export const Header = styled.div`
  padding: 16px;
  width: 100%;
  box-sizing: border-box;
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
  height: 100%;
  box-sizing: border-box;
  position: relative;
  svg {
    position: absolute;
    transform: translateX(-100%);
    width: 100%;
    height: 80%;
  }
  svg:first-child {
    transform: translateX(0%);
    position: relative;
  }
`;

const Graph = css`
  fill: none;
  stroke-width: 10;
  transform: rotate(-90deg);
  transform-origin: center;
  position: relative;
  transition: stroke-dashoffset 0.25s ease-out;
`;

export const GraphBack = styled.circle`
  ${Graph};
  stroke: ${color.gray2};
`;

export const GraphBlue = styled.circle`
  ${Graph};
  stroke: ${color.blue};
  stroke-dasharray: 672;
  stroke-dashoffset: 672;
`;

export const GraphYellow = styled.circle`
  ${Graph};
  stroke: ${color.yellow};
  stroke-dasharray: 672;
  stroke-dashoffset: 672;
`;

export const GraphInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-content: center;
  text-align: center;
  justify-content: center;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -100%);
`;

export const Svg = styled.svg`
  pointer-events: none;
  circle {
    pointer-events: initial;
  }
`;

export const GraphPercent = styled.div`
  font-size: 36px;
  font-weight: 400;
  color: ${(props) => props.color};
`;

export const GraphTitle = styled.div`
  font-size: 18px;
  font-weight: 400;
  color: ${color.gray3};
`;

export const GraphNameConatiner = styled.div`
  display: flex;
  justify-content: center;
`;

export const GraphName = styled.div`
  color: ${color.black};
  font-size: 18px;
  font-weight: 400;
  display: flex;
  align-items: center;
  :first-child {
    margin-right: 48px;
  }
  ::before {
    content: "";
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background-color: ${(props) => props.color};
    margin-right: 4px;
  }
`;
