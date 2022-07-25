import React, { useEffect, useState } from "react";
import { Radio } from "antd";
import { useGetServers } from "../hooks/useGetServers";
import styled from "@emotion/styled";

const _ServerList = () => {
  const {servers} = useGetServers()
  const [activeServer, setActiveServer] = useState(null);

  useEffect(function() {
    if (servers.length && !activeServer) {
      const lsServer = localStorage.getItem('activeServer')
      const serverId = lsServer && servers.some(i => i.id === lsServer) ? lsServer : servers[0].id

      setActiveServer(serverId)
    }
  }, [servers, activeServer, setActiveServer])

  function onChange (e) {
    const serverId = e.target.value
    setActiveServer(serverId)
    localStorage.setItem('activeServer', serverId);
  }

  return (
    <ServerList>
      <Radio.Group onChange={onChange} value={activeServer}>
        {servers.map(item => {
          return <Radio value={item.id} key={item.id}>{item.name}</Radio>
        })}
      </Radio.Group>
    </ServerList>
  )
}

const ServerList = styled.div`
  margin-top: 60px;
`

export {_ServerList as ServerList}
