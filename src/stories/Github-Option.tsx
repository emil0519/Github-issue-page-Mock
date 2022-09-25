import styled from 'styled-components';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  IssueOpenedIcon,
  GitPullRequestIcon,
  CommentDiscussionIcon,
  PlayIcon,
  TableIcon,
  ShieldIcon,
  GraphIcon,
} from '@primer/octicons-react';

const IssueIMG = styled(IssueOpenedIcon)`
  display: none;
  margin-right: 5px;
  @media screen and (min-width: 543) {
    width: 15px;
    height: 15px;
    display: block;
  }
`;

const CodeRightIMG = styled(ChevronRightIcon)`
  display: none;
  @media screen and (min-width: 543) {
    width: 15px;
    height: 15px;
    display: block;
  }
`;

const CodeLeftIMG = styled(ChevronLeftIcon)`
  display: none;
  @media screen and (min-width: 543) {
    width: 15px;
    height: 15px;
    display: block;
  }
  /* imported icon cannot be displayed none, need to fix afterwards */
`;

const CodeText = styled.span`
  color: black;
  font-size: 16px;
  @media screen and (min-width: 768px) {
  }
`;

const CodeSection = styled.div`
  display: flex;
  align-items: center;
  width: 75.38px;
  height: 30px;
  background: #f5f7f9;
  border-radius: 5px;
  margin-left: 16px;
  margin-right: 5px;
  cursor: pointer;
  &:hover {
    background: #e7ebef;
  }
  @media screen and (min-width: 768px) {
  }
`;

const Wrapper = styled.section`
  display: flex;
  background: #f5f7f9;
  height: 48px;
  @media screen and (min-width: 768px) {
  }
`;

type OptionProps = {
  /**
   * Is this the principal call to action on the page?
   */
  TEXT: string;
};

export const Option = ({ TEXT = 'Issues', ...props }: OptionProps) => {
  return (
    <Wrapper>
      <CodeSection>
        <CodeLeftIMG />
        <CodeRightIMG />
        <CodeText>Code</CodeText>
      </CodeSection>
      <CodeSection>
        <IssueIMG />
        <CodeText>{TEXT}</CodeText>
      </CodeSection>
      <CodeSection>
        <GitPullRequestIcon />
        <CodeText>Pull requests</CodeText>
      </CodeSection>
      <CodeSection>
        <CommentDiscussionIcon />
        <CodeText>Discussions</CodeText>
      </CodeSection>
      <CodeSection>
        <PlayIcon />
        <CodeText>Actions</CodeText>
      </CodeSection>
      <CodeSection>
        <TableIcon />
        <CodeText>Projects</CodeText>
      </CodeSection>
      <CodeSection>
        <ShieldIcon />
        <CodeText>Security</CodeText>
      </CodeSection>
      <CodeSection>
        <GraphIcon />
        <CodeText>Insight</CodeText>
      </CodeSection>
    </Wrapper>
  );
};
