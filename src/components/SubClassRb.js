import React from "react";
import {subClassRbData} from '../data'
import {Divider, List, Tag} from 'antd'
import styled from "@emotion/styled";
import {useGetKeyboss} from '../hooks/useGetKeyboss'
import {RbStatus} from './RbStatus'

const _SubClassRb = ({serverId}) => {
  const {keyboss, error} = useGetKeyboss(serverId)

  // console.log(keyboss);

  // if (error) return error
  return (
    <SubClassRb>
      <Divider orientation="left">Cаб РБ</Divider>
      <List
        bordered={true}
        dataSource={subClassRbData}
        renderItem={item => (
          <List.Item >
            <RbStatus data={{...item, timeDeathArr: keyboss[item.bossName]}} />
          </List.Item>
        )}
      />
      <MacroWrap>
        <MacroTitle>Макросы для сундуков:</MacroTitle>
        <MacroItem>Кабрио - <b>/target Coffer of the Dead</b></MacroItem>
        <MacroItem>3 ТОИ - <b>/target Hallate's chest</b></MacroItem>
        <MacroItem>8 ТОИ - <b>/target Chest of Kernon</b></MacroItem>
        <MacroItem>11 ТОИ - <b>/target Chest of Golkonda</b></MacroItem>
      </MacroWrap>
    </SubClassRb>
  )
}

const SubClassRb = styled.div`
  margin-top: 50px;
`
const MacroWrap = styled.div`
  margin-top: 10px;
`
const MacroTitle = styled.div``
const MacroItem = styled.div`
  padding-left: 20px;
`
export {_SubClassRb as SubClassRb}
