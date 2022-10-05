import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export type GetLebal = {
  [x: string]: any;
  color: string;
  default: boolean;
  description: string;
  id: number;
  name: string;
  node_id: string;
  url: string;
  assignees: any;
  closedData: any;
  index: number;
  items: any;
};

type Parameter = {
  baseType: string;
  type: string;
  name: string;
  repo: string;
  query: string;
};

type Query = {
  name: string;
  repo: string;
  query: string;
};

interface CreateLabel {
  id: number;
  node_id: string;
  url: string;
  name: string;
  color: string;
  default: boolean;
  description: string;
}

type CreateLabelParameter = {
  name: string;
  repo: string;
  token: string;
  createLabelName: string;
  createLabelColor: string;
  createLabelDescription: string;
};

export const createIssueApi = createApi({
  reducerPath: "createLabelApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.github.com/",
  }),
  tagTypes: ["issues"],
  endpoints: (builder) => ({
    getAllIssues: builder.query<GetLebal[], Parameter>({
      query: ({ baseType, type, name, repo, query }) => ({
        url: `${baseType}${name}${repo}${type}${query}`,
        method: "GET",
        headers: new Headers({
          "Content-Type": "application/json",
          Authorization: `token ${process.env.REACT_APP_PASSWORD}`,
        }),
      }),
      providesTags: ["issues"],
    }),
  }),
});

export const { useGetAllIssuesQuery } = createIssueApi;
