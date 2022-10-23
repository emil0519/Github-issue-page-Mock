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

// type Query = {
//   name: string;
//   repo: string;
//   query: string;
// };

// interface CreateLabel {
//   id: number;
//   node_id: string;
//   url: string;
//   name: string;
//   color: string;
//   default: boolean;
//   description: string;
// }

// type CreateLabelParameter = {
//   name: string;
//   repo: string;
//   token: string;
//   createLabelName: string;
//   createLabelColor: string;
//   createLabelDescription: string;
// };

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
      query: ({ baseType, type, name, repo, query, newIssue }) => ({
        url: `${baseType}${name}${repo}${type}${query}`,
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/json",
          Authorization: `token ${process.env.REACT_APP_PASSWORD}`,
          "if-none-match": "",
        }),
        body: newIssue,
        providesTags: ["issues"],
        // change position of providesTag if needed
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
      query: ({ baseType, type, name, repo, query }) => ({
        url: `${baseType}${name}${repo}${type}${query}`,
        method: "DELETE",
        headers: new Headers({
          "Content-Type": "application/json",
          Authorization: `token ${process.env.REACT_APP_PASSWORD}`,
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
