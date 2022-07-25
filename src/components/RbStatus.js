import React from "react";
import dayjs from 'dayjs'
import {Tag} from 'antd'
import styled from "@emotion/styled";
import { useGetDateTime } from "../hooks/useDateTime";

export const RbStatus = ({data}) => {
  if (!data.timeDeathArr) return null
  const {mskDateTime, isLoading} = useGetDateTime()

  if (isLoading) return 'загрузка..'

  const timeDeath = data.timeDeathArr[0].date

  console.log(
    dayjs(timeDeath).add(18, 'hours').from(dayjs(mskDateTime))
  );

  
  function getTimeParams (rbconf, timeOfDeath) {
    return {
      ...data,
      timeOfDeath: {
        _text: 'Время смерти',
        value: dayjs(timeOfDeath).format('L LT')
      },
      respawnTime: {
        _text: 'Начало респа',
        value: dayjs(timeDeath).add(rbconf.min, 'hours').format('L LT')
      },
      respawnEndTime: {
        _text: 'Макс респ',
        value: dayjs(timeDeath).add(rbconf.max, 'hours').format('L LT')
      },
      hasRespawnTimeStarted: dayjs(mskDateTime).diff(dayjs(timeDeath).add(rbconf.min, 'hours')) > 0,
      hasRespawnTimeEnded: dayjs(mskDateTime).diff(dayjs(timeDeath).add(rbconf.max, 'hours')) > 0,
    }
  }
  
  const timeParams = getTimeParams(data, timeDeath)
  console.log(getTimeParams(data, timeDeath));

  if (timeParams.hasRespawnTimeEnded) {
    return (
      <div>
        <BossName>{data.title} </BossName> 
        <TagWrap><Tag color="success"> бос жив </Tag></TagWrap>
      </div>
    )
  }

  if (timeParams.hasRespawnTimeStarted) {
    return (
      <div>
        <BossName>{data.title} </BossName> 
        <TagWrap><Tag color="success"> респ идет </Tag></TagWrap>
        до макс респа осталось {dayjs(timeDeath).add(30, 'hours').from(dayjs(mskDateTime), true)}
      </div>
    )
  }

  if (!timeParams.hasRespawnTimeStarted) {
    return (
      <div>
        <BossName>{data.title} </BossName> 
        <TagWrap><Tag color="error">мертв</Tag></TagWrap>
        респ начнется {dayjs(timeDeath).add(18, 'hours').from(dayjs(mskDateTime))}
      </div>
    )
  }
}

const BossName = styled.div`
  display: inline-block;
  width: 85px;
`
const TagWrap = styled.div`
  display: inline-block;
  width: 85px;
`
