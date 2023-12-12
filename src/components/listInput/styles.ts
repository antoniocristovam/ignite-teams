import styled from "styled-components/native";

export const Container = styled.View`
  /* background-color: ${({ theme }) => theme.COLORS.GRAY_600}; */
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const Message = styled.Text`
  text-align: center;
  font-size: ${({ theme }) => theme.FONT_SIZE.SM}px;
  font-family: ${({ theme }) => theme.FONT_FAMILY.REGULAR};
  color: ${({ theme }) => theme.COLORS.GRAY_300};
`;
