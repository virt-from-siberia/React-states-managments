/* eslint-disable simple-import-sort/imports */
import { useState } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import { AxiosResponse } from 'axios';
import type { User } from '../../../../../shared/types';
import { axiosInstance, getJWTHeader } from '../../../axiosInstance';
import { queryKeys } from '../../../react-query/constants';
import {
  clearStoredUser,
  getStoredUser,
  setStoredUser,
} from '../../../user-storage';

async function getUser(user: User | null): Promise<User | null> {
  if (!user) return null;
  const { data }: AxiosResponse<{ user: User }> = await axiosInstance.get(
    `/user/${user.id}`,
    {
      headers: getJWTHeader(user),
    },
  );
  return data.user;
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
    onSuccess: (data) => setUser(data),
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
    queryClient.refetchQueries('user-authentication');
  }

  return { user, updateUser, clearUser };
}
