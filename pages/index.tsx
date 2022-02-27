import { FunctionComponent, useState, useEffect, } from 'react'

import { CurrentWeatherData, defaultWeatherData, getCurrentWeatherData, getWeatherData, OneCallWeatherResponse, } from '../utils/WeatherUtil'

import WeatherIcon from '../components/WeatherIcon'
import CurrentInfo from '../components/CurrentInfo'
import WeatherGraph from '../components/WeatherGraph'
import WeatherDaily from '../components/WeatherDaily'
import HorizontalCards from '../components/HorizontalCards'
import WindGraph from '../components/WindGraph'

const Index: FunctionComponent = ({ }) => {
  const [current, setCurrent] = useState<CurrentWeatherData>(defaultWeatherData)
  const [hourly, setHourly] = useState<OneCallWeatherResponse['hourly']>([])
  const [daily, setDaily] = useState<OneCallWeatherResponse['daily']>([])

  useEffect(() => {
    (async () => {
      const data = await getWeatherData({
        lat: -34.695530,
        lon: -58.407650,
      }, 'sp', {
        temp: 'degrees',
        wind: 'metric',
      })

      setHourly(data['hourly'])
      setDaily(data['daily'])

      setCurrent(await getCurrentWeatherData({
        lat: -34.695530,
        lon: -58.407650,
      }, 'sp', {
        temp: 'degrees',
        wind: 'metric',
      }))
    })()
  }, [])

  return (
    <div className={'w-screen h-screen bg-primary flex flex-col justify-center items-center px-4 space-y-4 overflow-hidden'}>
      <div className={'w-full h-48 bg-secondary rounded-md p-2 flex space-x-2'}>
        <div className={'w-36 aspect-square flex flex-col items-center py-2 space-y-2'}>
          <WeatherIcon icon={current['weather']['icon']} temp={current['temps']['current']} />

          <div className={'w-full h-fit flex justify-center space-x-2'}>
            <p className={'text-blue-200 font-bold text-sm'}>{current['temps']['min']}</p>
            <p className={'text-slate-100/90 font-bold text-sm'}>-</p>
            <p className={'text-red-200 font-bold text-sm'}>{current['temps']['max']}</p>
          </div>
        </div>
        <div className={'flex flex-col flex-1'}>
          <div className={'w-full flex-1 flex flex-col justify-center items-center'}>
            <p className={'text-slate-100 font-bold text-xl'}>{current['name']}</p>
            <p className={'text-slate-100/90'}>{current['weather']['main']}</p>
          </div>
          <div className={'w-full h-12 flex flex-row justify-around items-center'}>
            <CurrentInfo title={'Humidity'} value={current['info']['humidity']} />
            <CurrentInfo title={'Windspeed'} value={current['wind']['speed']} />
          </div>
          <div className={'w-full h-12 flex flex-row justify-around items-center'}>
            <CurrentInfo title={'Sunrise'} value={current['info']['sunrise']} />
            <CurrentInfo title={'Sunset'} value={current['info']['sunset']} />
          </div>
        </div>
      </div>

      <HorizontalCards>
        <WeatherGraph hourly={hourly} />
        <WindGraph hourly={hourly}/>
      </HorizontalCards>

      <HorizontalCards>
        <WeatherDaily daily={daily} />
      </HorizontalCards>
    </div>
  )
}

export default Index