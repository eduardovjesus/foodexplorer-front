import styled from "styled-components";

export const Container = styled.div`
  height: 10rem;
  display: flex;
  align-items: center;
  gap: 1.3rem;
`;

export const ImageWrapper = styled.div`
  img {
    width: 7.2rem;
    height: 7.2rem;
    border-radius: 50%;
    object-fit: cover;
  }
`;

export const TitleWrapper = styled.span`
  font-size: 2rem;
`;

export const QuantityWrapper = styled.span`
  font-size: 2rem;
`;

export const PriceWrapper = styled.strong`
  font-size: 1.2rem;
  color: ${({ theme }) => theme.COLORS.GRAY_200};
`;

export const ButtonWrapper = styled.button`
  margin-top: 1rem;
  border: none;
  background: transparent;
  color: #da505d;
  font-size: 1.2rem;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;
