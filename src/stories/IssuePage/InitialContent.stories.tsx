import { ComponentStory, ComponentMeta } from "@storybook/react";
import InitialContent from "../NewIssue/InitialContent";

export default {
  title: "Issue-page/InitialContent",
  component: InitialContent,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen",
  },
} as ComponentMeta<typeof InitialContent>;

const Template: ComponentStory<typeof InitialContent> = (args) => (
  <InitialContent {...args} />
);

export const Component = Template.bind({});
Component.args = {
  data: {
    url: "https://api.github.com/repos/emil0519/testing-issues/issues/66",
    repository_url: "https://api.github.com/repos/emil0519/testing-issues",
    labels_url:
      "https://api.github.com/repos/emil0519/testing-issues/issues/66/labels{/name}",
    comments_url:
      "https://api.github.com/repos/emil0519/testing-issues/issues/66/comments",
    events_url:
      "https://api.github.com/repos/emil0519/testing-issues/issues/66/events",
    html_url: "https://github.com/emil0519/testing-issues/issues/66",
    id: 1406022344,
    node_id: "I_kwDOIA3lo85TzjLI",
    number: 66,
    title: "Lots of reaction",
    user: {
      login: "emil0519",
      id: 97882056,
      node_id: "U_kgDOBdWPyA",
      avatar_url: "https://avatars.githubusercontent.com/u/97882056?v=4",
      gravatar_id: "",
      url: "https://api.github.com/users/emil0519",
      html_url: "https://github.com/emil0519",
      followers_url: "https://api.github.com/users/emil0519/followers",
      following_url:
        "https://api.github.com/users/emil0519/following{/other_user}",
      gists_url: "https://api.github.com/users/emil0519/gists{/gist_id}",
      starred_url:
        "https://api.github.com/users/emil0519/starred{/owner}{/repo}",
      subscriptions_url: "https://api.github.com/users/emil0519/subscriptions",
      organizations_url: "https://api.github.com/users/emil0519/orgs",
      repos_url: "https://api.github.com/users/emil0519/repos",
      events_url: "https://api.github.com/users/emil0519/events{/privacy}",
      received_events_url:
        "https://api.github.com/users/emil0519/received_events",
      type: "User",
      site_admin: false,
    },
    labels: [
      {
        id: 4592872917,
        node_id: "LA_kwDOIA3lo88AAAABEcGt1Q",
        url: "https://api.github.com/repos/emil0519/testing-issues/labels/Yet%20more",
        name: "Yet more",
        color: "496E5A",
        default: false,
        description: "",
      },
      {
        id: 4592875417,
        node_id: "LA_kwDOIA3lo88AAAABEcG3mQ",
        url: "https://api.github.com/repos/emil0519/testing-issues/labels/Happy%20Coding",
        name: "Happy Coding",
        color: "3680D0",
        default: false,
        description: "",
      },
      {
        id: 4592875882,
        node_id: "LA_kwDOIA3lo88AAAABEcG5ag",
        url: "https://api.github.com/repos/emil0519/testing-issues/labels/Happy%20Hacking",
        name: "Happy Hacking",
        color: "356FE7",
        default: false,
        description: "",
      },
      {
        id: 4592876156,
        node_id: "LA_kwDOIA3lo88AAAABEcG6fA",
        url: "https://api.github.com/repos/emil0519/testing-issues/labels/Happy%20Eating",
        name: "Happy Eating",
        color: "A356BF",
        default: false,
        description: "",
      },
    ],
    state: "open",
    locked: false,
    assignee: {
      login: "Xie-MS",
      id: 82010307,
      node_id: "MDQ6VXNlcjgyMDEwMzA3",
      avatar_url: "https://avatars.githubusercontent.com/u/82010307?v=4",
      gravatar_id: "",
      url: "https://api.github.com/users/Xie-MS",
      html_url: "https://github.com/Xie-MS",
      followers_url: "https://api.github.com/users/Xie-MS/followers",
      following_url:
        "https://api.github.com/users/Xie-MS/following{/other_user}",
      gists_url: "https://api.github.com/users/Xie-MS/gists{/gist_id}",
      starred_url: "https://api.github.com/users/Xie-MS/starred{/owner}{/repo}",
      subscriptions_url: "https://api.github.com/users/Xie-MS/subscriptions",
      organizations_url: "https://api.github.com/users/Xie-MS/orgs",
      repos_url: "https://api.github.com/users/Xie-MS/repos",
      events_url: "https://api.github.com/users/Xie-MS/events{/privacy}",
      received_events_url:
        "https://api.github.com/users/Xie-MS/received_events",
      type: "User",
      site_admin: false,
    },
    assignees: [
      {
        login: "Xie-MS",
        id: 82010307,
        node_id: "MDQ6VXNlcjgyMDEwMzA3",
        avatar_url: "https://avatars.githubusercontent.com/u/82010307?v=4",
        gravatar_id: "",
        url: "https://api.github.com/users/Xie-MS",
        html_url: "https://github.com/Xie-MS",
        followers_url: "https://api.github.com/users/Xie-MS/followers",
        following_url:
          "https://api.github.com/users/Xie-MS/following{/other_user}",
        gists_url: "https://api.github.com/users/Xie-MS/gists{/gist_id}",
        starred_url:
          "https://api.github.com/users/Xie-MS/starred{/owner}{/repo}",
        subscriptions_url: "https://api.github.com/users/Xie-MS/subscriptions",
        organizations_url: "https://api.github.com/users/Xie-MS/orgs",
        repos_url: "https://api.github.com/users/Xie-MS/repos",
        events_url: "https://api.github.com/users/Xie-MS/events{/privacy}",
        received_events_url:
          "https://api.github.com/users/Xie-MS/received_events",
        type: "User",
        site_admin: false,
      },
      {
        login: "emil0519",
        id: 97882056,
        node_id: "U_kgDOBdWPyA",
        avatar_url: "https://avatars.githubusercontent.com/u/97882056?v=4",
        gravatar_id: "",
        url: "https://api.github.com/users/emil0519",
        html_url: "https://github.com/emil0519",
        followers_url: "https://api.github.com/users/emil0519/followers",
        following_url:
          "https://api.github.com/users/emil0519/following{/other_user}",
        gists_url: "https://api.github.com/users/emil0519/gists{/gist_id}",
        starred_url:
          "https://api.github.com/users/emil0519/starred{/owner}{/repo}",
        subscriptions_url:
          "https://api.github.com/users/emil0519/subscriptions",
        organizations_url: "https://api.github.com/users/emil0519/orgs",
        repos_url: "https://api.github.com/users/emil0519/repos",
        events_url: "https://api.github.com/users/emil0519/events{/privacy}",
        received_events_url:
          "https://api.github.com/users/emil0519/received_events",
        type: "User",
        site_admin: false,
      },
    ],
    milestone: null,
    comments: 0,
    created_at: "2022-10-12T11:11:28Z",
    updated_at: "2022-10-15T10:31:52Z",
    closed_at: null,
    author_association: "OWNER",
    active_lock_reason: null,
    body: null,
    closed_by: {
      login: "emil0519",
      id: 97882056,
      node_id: "U_kgDOBdWPyA",
      avatar_url: "https://avatars.githubusercontent.com/u/97882056?v=4",
      gravatar_id: "",
      url: "https://api.github.com/users/emil0519",
      html_url: "https://github.com/emil0519",
      followers_url: "https://api.github.com/users/emil0519/followers",
      following_url:
        "https://api.github.com/users/emil0519/following{/other_user}",
      gists_url: "https://api.github.com/users/emil0519/gists{/gist_id}",
      starred_url:
        "https://api.github.com/users/emil0519/starred{/owner}{/repo}",
      subscriptions_url: "https://api.github.com/users/emil0519/subscriptions",
      organizations_url: "https://api.github.com/users/emil0519/orgs",
      repos_url: "https://api.github.com/users/emil0519/repos",
      events_url: "https://api.github.com/users/emil0519/events{/privacy}",
      received_events_url:
        "https://api.github.com/users/emil0519/received_events",
      type: "User",
      site_admin: false,
    },
    reactions: {
      url: "https://api.github.com/repos/emil0519/testing-issues/issues/66/reactions",
      total_count: 12,
      "+1": 2,
      "-1": 1,
      laugh: 2,
      hooray: 1,
      confused: 2,
      heart: 1,
      rocket: 2,
      eyes: 1,
    },
    timeline_url:
      "https://api.github.com/repos/emil0519/testing-issues/issues/66/timeline",
    performed_via_github_app: null,
    state_reason: "reopened",
  },
  type: "body",
  count: -1,
};
