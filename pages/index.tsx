import { FunctionComponent, useState, useEffect, } from 'react'

import { CurrentWeatherData, defaultWeatherData, getCurrentWeatherData, getWeatherData, OneCallWeatherResponse, } from '../utils/WeatherUtil'

import WeatherIcon from '../components/WeatherIcon'
import CurrentInfo from '../components/CurrentInfo'
import WeatherGraph from '../components/WeatherGraph'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

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
      console.log(data['daily'].map(({ time, }) => new Date(time).toDateString()))
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

  const days = [
    'Sun',
    'Mon',
    'Tue',
    'Wen',
    'Thu',
    'Fri',
    'Sat',
  ]

  return (
    <div className={'w-screen h-screen bg-primary flex flex-col justify-center items-center px-4 space-y-4 overflow-hidden'}>
      <div className={'w-full h-48 bg-secondary rounded-md p-2 flex space-x-2'}>
        <div className={'w-36 aspect-square flex flex-col items-center py-2 space-y-2'}>
          <WeatherIcon icon={current['weather']['icon'] as any} temp={current['temps']['current']} />

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

      <WeatherGraph hourly={hourly} />

      <div className={'w-full h-auto bg-secondary rounded-md flex flex-row justify-evenly p-2 overflow-auto flex-wrap'}>
        {daily.map(({ time, temp, weather, }, index) => {
          const icon = (() => {
            switch (weather['icon']) {
              case '01d': return 'sun'
              case '01n': return 'moon'
              case '02d': return 'cloud-sun'
              case '02n': return 'cloud-moon'
              case '03d': return 'cloud'
              case '03n': return 'cloud'
              case '04d': return 'clouds'
              case '04n': return 'clouds'
              case '09d': return 'cloud-rain'
              case '09n': return 'cloud-rain'
              case '10d': return 'cloud-sun-rain'
              case '10n': return 'cloud-moon-rain'
              case '11d': return 'cloud-bolt-sun'
              case '11n': return 'cloud-bolt-moon'
              case '13d': return 'snowflake'
              case '13d': return 'snowflake'
              case '50d': return 'cloud-fog'
              case '50d': return 'cloud-fog'
              default: return 'sun'
            }
          })()

          return (
            <div key={index} className={'w-[calc(25%-0.5rem)] h-28 flex flex-col items-center p-0.5 mb-1'}>
              <p className={'text-slate-100 font-bold text-sm'}>{days[(new Date(time).getDay())]}</p>
              <div className={'w-12 aspect-square flex justify-center items-center mb-2'}>
                <FontAwesomeIcon icon={icon} className={'text-yellow-300'} size={'2x'} />
              </div>
              <div className={'w-full flex flex-row justify-around'}>
                <p className={'text-blue-200 font-bold text-xxs'}>{temp['min']}</p>
                <p className={'text-red-200 font-bold text-xxs'}>{temp['max']}</p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Index