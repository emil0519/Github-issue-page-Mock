import styled from 'styled-components';
import { TriangleDownIcon } from '@primer/octicons-react';

const SortDown = styled(TriangleDownIcon)`
  width: 10px;
  height: 10px;
  margin-top: 4px;
  @media screen and (min-width: 768px) {
  }
`;

const SortText = styled.span`
  display: flex;
  color: #4d555e;
  font-size: 10px;
  @media screen and (min-width: 768px) {
  }
`;

const SortSection = styled.div`
  display: flex;
  margin-right: 10px;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
  @media screen and (min-width: 768px) {
  }
`;

const HeaderText = styled.span`
  color: black;
  font-size: 14px;
  font-weight: 700;
  margin-left: 10px;
  @media screen and (min-width: 768px) {
  }
`;

const Wrapper = styled.section`
  width: 100%;
  margin: 16px auto 0 auto;
  background: white;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  @media screen and (min-width: 768px) {
  }
`;

const Header = styled.div`
  width: 95vw;
  height: 55px;
  margin: 0 auto;
  background: #f5f7f9;
  border: 0.5px solid #cad1d9;
  border-top-right-radius: 5px;
  border-top-left-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  @media screen and (min-width: 768px) {
  }
`;

type BoxHeaderProps = {
  /**
   * Is this the principal call to action on the page?
   */
  TEXT: number;
};

export const BoxHeader = ({ TEXT = 1, ...props }: BoxHeaderProps) => {
  return (
    <Wrapper>
      <Header>
        <HeaderText>{TEXT} labels</HeaderText>
        <SortSection>
          <SortText>Sort</SortText>
          <SortDown />
        </SortSection>
      </Header>
    </Wrapper>
  );
};
