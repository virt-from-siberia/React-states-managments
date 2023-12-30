/* eslint-disable simple-import-sort/imports */
import { useState } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import axios, { AxiosResponse } from 'axios';
import type { User } from '../../../../../shared/types';
import { axiosInstance, getJWTHeader } from '../../../axiosInstance';
import { queryKeys } from '../../../react-query/constants';
import {
  clearStoredUser,
  getStoredUser,
  setStoredUser,
} from '../../../user-storage';

interface AxiosResponseWithCancel extends AxiosResponse {
  cancel: () => void;
}

async function getUser(user: User | null): Promise<AxiosResponseWithCancel> {
  const source = axios.CancelToken.source();

  if (!user) return null;
  const axiosResponse: AxiosResponseWithCancel = await axiosInstance.get(
    `/user/${user.id}`,
    {
      headers: getJWTHeader(user),
      cancelToken: source.token,
    },
  );

  axiosResponse.cancel = () => {
    source.cancel();
  };

  return axiosResponse;
}

interface UseUser {
  user: User | null;
  updateUser: (user: User) => void;
  clearUser: () => void;
}

export function useUser(): UseUser {
  const [user, setUser] = useState<User | null>(getStoredUser());
  const queryClient = useQueryClient();

  useQuery(queryKeys.user, () => getUser(user), {
    enabled: !!user,
    onSuccess: (axiosResponse) => setUser(axiosResponse?.data?.user),
  });

  function updateUser(newUser: User): void {
    setUser(newUser);
    setStoredUser(newUser);

    queryClient.setQueriesData(queryKeys.user, newUser);
  }

  // meant to be called from useAuth
  function clearUser() {
    setUser(null);
    clearStoredUser();

    queryClient.setQueriesData(queryKeys.user, null);

    queryClient.removeQueries([queryKeys.appointments, queryKeys.user]);
  }

  return { user, updateUser, clearUser };
}
