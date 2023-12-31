import { useQuery } from "@tanstack/react-query";
import api from "../api/github";

import { Repository } from "./types";

async function fetchRepos() {
  const { data } = await api.get<Repository[]>("/users/fazt/repos");
  return data;
}

export function useFetchRepositories() {
  return useQuery({
    queryKey: ["repos"],
    queryFn: fetchRepos,
  });
}
