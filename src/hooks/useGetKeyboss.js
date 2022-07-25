import useSWR from 'swr'
import convert from 'xml-js';
import {fetcher} from '../libs/axios';
import groupArray from 'group-array'

const params = {
  cmd: 'rss',
  out: 'xml',
  filter: 'keyboss'
}

export function useGetKeyboss (serv) {
  const {data, error, isLoading} = useSWR({...params, serv}, fetcher, {isPaused: () => !serv})
  const keyboss = []
  const resItem = data ? convert.xml2js(data, {compact: true}).rss.channel.item : []
  
  resItem.forEach(item => {
    const name = item.title._text.replace('Убит босс ', '')
    const date = item.pubDate._text
    keyboss.push({name, date})
  });

  return { 
    keyboss: groupArray(keyboss, 'name'), 
    error, 
    isLoading
  }
}
