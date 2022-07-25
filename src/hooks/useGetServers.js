import useSWR from 'swr'
import convert from 'xml-js';
import {fetcher} from '../libs/axios';
import qs from 'qs'

const params = {
  cmd: 'rss',
  serv: '-1',
  out: 'xml'
}

export function useGetServers () {
  const {data, error, isLoading} = useSWR(params, fetcher)
  const servers = []
  const resItem = data ? convert.xml2js(data, {compact: true}).rss.channel.item : []
  
  resItem.forEach(item => {
    const id = qs.parse(item.link._text).serv
    const name = item.title._text.match(/^\[[\w\s]{1,}\]/gmi)[0].replace(/\[|\]/gmi, '')
    !servers.some(item => item.id === id) && servers.push({id, name})
  });

  return { servers, error, isLoading }
}
