/* eslint-disable simple-import-sort/imports */
// @ts-nocheck
import dayjs from 'dayjs';
import {
  Dispatch,
  SetStateAction,
  useState,
  useEffect,
  useCallback,
} from 'react';
import { useQuery, useQueryClient } from 'react-query';

import { axiosInstance } from '../../../axiosInstance';
import { queryKeys } from '../../../react-query/constants';
import { useUser } from '../../user/hooks/useUser';
import { AppointmentDateMap } from '../types';
import { getAvailableAppointments } from '../utils';
import { getMonthYearDetails, getNewMonthYear, MonthYear } from './monthYear';

const commonOptions = {
  stealTime: 0,
  cashTime: 300000,
};

// для вызова useQuery
async function getAppointments(
  year: string,
  month: string,
): Promise<AppointmentDateMap> {
  const { data } = await axiosInstance.get(`/appointments/${year}/${month}`);
  return data;
}

// типы для возвращаемого объекта хука
interface UseAppointments {
  appointments: AppointmentDateMap;
  monthYear: MonthYear;
  updateMonthYear: (monthIncrement: number) => void;
  showAll: boolean;
  setShowAll: Dispatch<SetStateAction<boolean>>;
}

// Цель этого хука:
//   1. отслеживать текущий месяц/год (т.е. monthYear), выбранный пользователем
//     1a. предоставить способ обновления состояния
//   2. возвращать записи на приёмы для конкретного monthYear
//     2a. возвращать в формате AppointmentDateMap (массивы записей, индексированные по дням месяца)
//     2b. предварительно загружать записи на приёмы для смежных monthYear
//   3. отслеживать состояние фильтра (все записи / доступные записи)
//     3a. возвращать только соответствующие записи для текущего monthYear
export function useAppointments(): UseAppointments {
  /** ****************** НАЧАЛО 1: состояние monthYear *********************** */
  // получаем monthYear для текущей даты (для состояния monthYear по умолчанию)
  const currentMonthYear = getMonthYearDetails(dayjs());

  // состояние для отслеживания выбранного пользователем monthYear
  // значение состояния возвращается в объекте хука
  const [monthYear, setMonthYear] = useState(currentMonthYear);

  // сеттер для обновления объекта monthYear в состоянии, когда пользователь изменяет месяц в отображении,
  // возвращается в объекте хука
  function updateMonthYear(monthIncrement: number): void {
    setMonthYear((prevData) => getNewMonthYear(prevData, monthIncrement));
  }
  /** ****************** КОНЕЦ 1: состояние monthYear ************************* */
  /** ****************** НАЧАЛО 2: фильтрация записей  ****************** */
  // Состояние и функции для фильтрации записей на приём, чтобы показать все или только доступные
  const [showAll, setShowAll] = useState(false);

  // Здесь нам понадобится импортированная функция getAvailableAppointments
  // Нам нужен пользователь для передачи в getAvailableAppointments, чтобы мы могли показать
  //   записи на приёмы, зарезервированные авторизованным пользователем (белым цветом)
  const { user } = useUser();

  const selectFn = useCallback(
    (data) => getAvailableAppointments(data, user),
    [user],
  );

  /** ****************** КОНЕЦ 2: фильтрация записей  ******************** */
  /** ****************** НАЧАЛО 3: использование useQuery  ***************************** */
  // вызов useQuery для записей на приёмы на текущий monthYear

  const queryClient = useQueryClient();

  useEffect(() => {
    const nwxtMonthYear = getNewMonthYear(monthYear, 1);

    queryClient.prefetchQuery(
      [queryKeys.appointments, nwxtMonthYear.year, nwxtMonthYear.month],
      () => getAppointments(nwxtMonthYear.year, nwxtMonthYear.month),
      commonOptions,
    );
  }, [useQueryClient, monthYear]);

  // Примечания:
  //    1. appointments - это AppointmentDateMap (объект с днями месяца
  //       в качестве свойств и массивами записей на приёмы на этот день в качестве значений)
  //
  //    2. Функция запроса getAppointments требует monthYear.year и
  //       monthYear.month
  const fallback = {};

  const { data: appointments = fallback } = useQuery(
    [queryKeys.appointments, monthYear.year, monthYear.month],
    () => getAppointments(monthYear.year, monthYear.month),
    {
      select: showAll ? undefined : selectFn,
      refetchOnMount: true,
      refetchOnReconnect: true,
      refetchOnWindowFocus: true,
      ...commonOptions,
    },
  );

  /** ****************** КОНЕЦ 3: использование useQuery  ******************************* */

  return { appointments, monthYear, updateMonthYear, showAll, setShowAll };
}
