import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export type GetLebal = {
  color: string;
  default: boolean;
  description: string;
  id: number;
  name: string;
  node_id: string;
  url: string;
};

type Parameter = {
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
    baseUrl: "https://api.github.com/repos",
  }),
  tagTypes: ["issues", "specific"],
  endpoints: (builder) => ({
    getAllIssues: builder.query<GetLebal[], Parameter>({
      query: ({ name, repo, query }) => ({
        url: `/${name}/${repo}/issues${query}`,
        method: "GET",
        headers: new Headers({
          "Content-Type": "application/json",
          Authorization: `token ${process.env.REACT_APP_PASSWORD}`,
        }),
      }),
      providesTags: ["issues"],
    }),
    // getMoreIssues: builder.query<GetLebal[], Query>({
    //     query: ({ name, repo }) => ({
    //       url: `/${name}/${repo}/issues`,
    //       method: "GET",
    //       headers: new Headers({
    //         "Content-Type": "application/json",
    //         Authorization: `token ${process.env.REACT_APP_PASSWORD}`,
    //       }),
    //     }),
    //     providesTags: ["specific"],
    //   }),
    // getSPECIFICIssue: builder.mutation<GetLebal[], Query>({
    //   query: ({ name, repo, query }) => ({
    //     url: `/${name}/${repo}/issues${query}`,
    //     method: "GET",
    //     headers: new Headers({
    //       "Content-Type": "application/json",
    //       Authorization: `token ${process.env.REACT_APP_PASSWORD}`,
    //     }),
    //   }),
    //   invalidatesTags: ["issues"],
    // }),
  }),
});

export const { useGetAllIssuesQuery } = createIssueApi;

// export const pokemonApi = createApi({
//   baseQuery: fetchBaseQuery({
//     baseUrl: "https://api.github.com/repos/emil0519/testing-issues/issues",
//   }),
//   tagTypes: [],
//   endpoints: (builder) => ({
//     getPokemonByName: builder.query({
//       query: (name: string) => `pokemon/${name}`,
//     }),
//   }),
// });

// // Export hooks for usage in functional components
// export const { useGetPokemonByNameQuery } = pokemonApi;
