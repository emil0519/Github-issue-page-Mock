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
  token?: string;
};


export const createIssueApi: any = createApi({
  reducerPath: "createLabelApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.github.com/",
  }),
  tagTypes: ["issues", "repo"],
  endpoints: (builder) => ({
    getAllIssues: builder.query<GetLebal[], Parameter>({
      query: ({ baseType, type, name, repo, query, token }) => ({
        url: `${baseType}${name}${repo}${type}${query}`,
        method: "GET",
        headers: new Headers({
          "Content-Type": "application/json",
          Authorization: `token ${token}`,
          "if-none-match": "",
        }),
      }),
      providesTags: ["issues"],
    }),
    getRepo: builder.query<GetLebal[], Parameter>({
      query: ({ baseType, name, query, token }) => ({
        url: `${baseType}${name}${query}`,
        method: "GET",
        headers: new Headers({
          "Content-Type": "application/json",
          Authorization: `token ${token}`,
          "if-none-match": "",
        }),
      }),
      providesTags: ["repo"],
    }),
    createIssue: builder.mutation({
      query: ({ baseType, type, name, repo, query, newIssue, token }) => ({
        url: `${baseType}${name}${repo}${type}${query}`,
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/json",
          Authorization: `token ${token}`,
          "if-none-match": "",
        }),
        body: newIssue,
        providesTags: ["issues"],
      }),
    }),
    update: builder.mutation({
      query: ({ baseType, type, name, repo, query, content, token }) => ({
        url: `${baseType}${name}${repo}${type}${query}`,
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/json",
          Authorization: `token ${token}`,
          "if-none-match": "",
        }),
        body: content,
      }),
      invalidatesTags: ["issues"],
    }),
    delete: builder.mutation({
      query: ({ baseType, type, name, repo, query, token }) => ({
        url: `${baseType}${name}${repo}${type}${query}`,
        method: "DELETE",
        headers: new Headers({
          "Content-Type": "application/json",
          Authorization: `token ${token}`,
          "if-none-match": "",
        }),
      }),
      invalidatesTags: ["issues"],
    }),
  }),
});

export const { useGetAllIssuesQuery } = createIssueApi;
export const { useGetRepoQuery } = createIssueApi;
export const { useCreateIssueMutation } = createIssueApi;
export const { useUpdateMutation } = createIssueApi;
export const { useDeleteMutation } = createIssueApi;
