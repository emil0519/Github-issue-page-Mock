import {
  BookIcon,
  GearIcon,
  GitPullRequestIcon,
  GraphIcon,
  IssueOpenedIcon,
  PlayIcon,
  ShieldIcon,
  TableIcon,
} from "@primer/octicons-react";
import styled from "styled-components";
import IconList from "./Reusable/IconList";

function Option() {
  const icons = [
    [<IssueOpenedIcon size={16} fill="#24292f" />, "Issues"],
    [<GitPullRequestIcon size={16} fill="#24292f" />, "Pull request"],
    [<PlayIcon size={16} fill="#24292f" />, "Actions"],
    [<TableIcon size={16} fill="#24292f" />, "Projects"],
    [<BookIcon size={16} fill="#24292f" />, "Wiki"],
    [<ShieldIcon size={16} fill="#24292f" />, "Security"],
    [<GraphIcon size={16} fill="#24292f" />, "Insights"],
    [<GearIcon size={16} fill="#24292f" />, "Settings"],
  ];
  return (
    <Wrapper>
      <IconList controller={icons} />
    </Wrapper>
  );
}

const Wrapper = styled.section`
  display: flex;
  background: #f5f7f9;
  height: 48px;
`;

export default Option;
