import React from "react";
import { fetcherBase } from "../libs/axios";
import useSWR from 'swr'

export function useGetDateTime(){
  const {data, error} = useSWR('http://worldtimeapi.org/api/timezone/Europe/Moscow', fetcherBase)
  

  return {
    mskDateTime: data && data.datetime || undefined,
    isLoading: !error && !data, 
    error
  }
}
