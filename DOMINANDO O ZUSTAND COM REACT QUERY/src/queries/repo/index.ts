import { QueryFunctionContext, useQuery } from "@tanstack/react-query";
import api from "../../services/api";
import { IRepo } from "./types";

async function getRepos(ctx: QueryFunctionContext) {
  const [, userId] = ctx.queryKey;
  const { data } = await api.get<IRepo[]>(`users/CarlosLevir/${userId}/repos`);
  return data;
}

export default function useFetchRepos(userId: string) {
  return useQuery(["repos", userId], getRepos);
}
