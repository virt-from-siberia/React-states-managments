/* eslint-disable simple-import-sort/imports */
import dayjs from 'dayjs';
import { useState } from 'react';
import { useQuery } from 'react-query';
import type { Appointment, User } from '../../../../../shared/types';
import { axiosInstance, getJWTHeader } from '../../../axiosInstance';
import { queryKeys } from '../../../react-query/constants';
import { useUser } from './useUser';

// for when we need a query function for useQuery
async function getUserAppointments(
  user: User | null,
): Promise<Appointment[] | null> {
  if (!user) return null;
  const { data } = await axiosInstance.get(`/user/${user.id}/appointments`, {
    headers: getJWTHeader(user),
  });
  return data.appointments;
}

const fallback = [];
export function useUserAppointments(): Appointment[] {
  const { user } = useUser();

  const { data: appointments = fallback } = useQuery(
    queryKeys.appointments,
    () => getUserAppointments(user),
    {
      enabled: !!user,
    },
  );
  return appointments;
}
