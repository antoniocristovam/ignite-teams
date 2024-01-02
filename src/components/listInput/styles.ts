import styled, { css } from "styled-components/native";

export const Container = styled.View`
  /* background-color: ${({ theme }) => theme.COLORS.GRAY_600}; */
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const Message = styled.Text`
  text-align: center;

  ${({ theme }) => css`
    color: ${theme.COLORS.GRAY_300};
    font-size: ${theme.FONT_SIZE.SM}px;
    font-family: ${theme.FONT_FAMILY.REGULAR};
  `}
`;
