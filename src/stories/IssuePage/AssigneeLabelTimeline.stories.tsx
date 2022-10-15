import { ComponentStory, ComponentMeta } from "@storybook/react";
import AssigneeLabelTimeline from "../../IssuePage/AssigneeLabelTimeline";

export default {
  title: "Issue-page/AssigneeLabelTimeline",
  component: AssigneeLabelTimeline,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen",
  },
} as ComponentMeta<typeof AssigneeLabelTimeline>;

const Template: ComponentStory<typeof AssigneeLabelTimeline> = (args) => (
  <AssigneeLabelTimeline {...args} />
);

export const Component = Template.bind({});
Component.args = {
  data: [
    {
      actor: {
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
      action: "renamed",
      date: "2022-10-15T11:02:20Z",
      content: {
        from: "One action",
        to: "One actionf",
      },
      stateReason: null,
    },
  ],
  origin: {
    url: "https://api.github.com/repos/emil0519/testing-issues/issues/69",
    repository_url: "https://api.github.com/repos/emil0519/testing-issues",
    labels_url:
      "https://api.github.com/repos/emil0519/testing-issues/issues/69/labels{/name}",
    comments_url:
      "https://api.github.com/repos/emil0519/testing-issues/issues/69/comments",
    events_url:
      "https://api.github.com/repos/emil0519/testing-issues/issues/69/events",
    html_url: "https://github.com/emil0519/testing-issues/issues/69",
    id: 1407204779,
    node_id: "I_kwDOIA3lo85T4D2r",
    number: 69,
    title: "One actionf",
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
        id: 4592873407,
        node_id: "LA_kwDOIA3lo88AAAABEcGvvw",
        url: "https://api.github.com/repos/emil0519/testing-issues/labels/A%20lot%20of%20labels",
        name: "A lot of labels",
        color: "C1635B",
        default: false,
        description: "",
      },
    ],
    state: "open",
    locked: false,
    assignee: null,
    assignees: [],
    milestone: null,
    comments: 1,
    created_at: "2022-10-13T06:12:05Z",
    updated_at: "2022-10-15T11:10:28Z",
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
      url: "https://api.github.com/repos/emil0519/testing-issues/issues/69/reactions",
      total_count: 0,
      "+1": 0,
      "-1": 0,
      laugh: 0,
      hooray: 0,
      confused: 0,
      heart: 0,
      rocket: 0,
      eyes: 0,
    },
    timeline_url:
      "https://api.github.com/repos/emil0519/testing-issues/issues/69/timeline",
    performed_via_github_app: null,
    state_reason: "reopened",
  },
  avatarData: [
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
      subscriptions_url: "https://api.github.com/users/emil0519/subscriptions",
      organizations_url: "https://api.github.com/users/emil0519/orgs",
      repos_url: "https://api.github.com/users/emil0519/repos",
      events_url: "https://api.github.com/users/emil0519/events{/privacy}",
      received_events_url:
        "https://api.github.com/users/emil0519/received_events",
      type: "User",
      site_admin: false,
    },
  ],
};
