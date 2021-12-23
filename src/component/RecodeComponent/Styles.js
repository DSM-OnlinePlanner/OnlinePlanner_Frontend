import styled from "styled-components";
import { color } from "../style/color";

export const Container = styled.div`
  padding: 16px;
  margin-bottom: 8px;
  background-color: ${color.gray1};
  color: ${color.black};
  border-radius: 10px;
  word-wrap: break-word; /* IE 5.5-7 */
  white-space: -moz-pre-wrap; /* Firefox 1.0-2.0 */
  white-space: pre-wrap; /* current browsers */
  user-select: none;
  overflow: hidden;
  text-overflow: ellipsis;
  &:last-child {
    margin-bottom: 16px;
  }
  :hover {
    filter: brightness(0.9);
  }
  cursor: pointer;
  transition: filter 0.15s ease-in-out;
`;
