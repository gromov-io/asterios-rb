import React, { useEffect, useState } from "react";
import { Navigation } from "./components/navigation";
import { useGetServers } from "./hooks/useGetServers";
import styled from "@emotion/styled";
import {SubClassRb} from './components/SubClassRb'
import { useGetDateTime } from "./hooks/useDateTime";

const App = () => {
  const {servers} = useGetServers()
  const [activeServer, setActiveServer] = useState(null);
  useGetDateTime()

  useEffect(function() {
    if (servers.length && !activeServer) {
      const lsServer = localStorage.getItem('activeServer')
      const serverId = lsServer && servers.some(i => i.id === lsServer) ? lsServer : servers[0].id

      setActiveServer(serverId)
    }
  }, [servers, activeServer, setActiveServer])

  function handleNavigation (e) {
    const serverId = e.target.value
    setActiveServer(serverId)
    localStorage.setItem('activeServer', serverId);
  }

  return (
    <ServerList>
      <Title>Asterios.tm</Title>
      <Description>Время респа РБ</Description>
      <Navigation activeServer={activeServer} onChange={handleNavigation}/>
      <Content>
        <SubClassRb serverId={activeServer}/>
      </Content>
    </ServerList>
  )
}

const ServerList = styled.div`
  text-align: center;
  padding-top: 50px;
`
const Title = styled.h1``
const Description = styled.div`
  margin: -20px auto 60px;
`
const Content = styled.div`
  width: 700px;
  margin: 0 auto;
  text-align: left;
`

export default App
