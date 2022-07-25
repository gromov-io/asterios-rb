import React from "react";
import { Radio } from "antd";
import { useGetServers } from "../hooks/useGetServers";
import {useGetKeyboss} from '../hooks/useGetKeyboss'

export const Navigation = ({activeServer, onChange}) => {
  const {servers} = useGetServers()

  return (
    <Radio.Group onChange={onChange} value={activeServer}>
      {servers.map(item => {
        return <Radio value={item.id} key={item.id}>{item.name}</Radio>
      })}
    </Radio.Group>
  )
}
