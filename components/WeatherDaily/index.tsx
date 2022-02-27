import { FunctionComponent, } from 'react'
import { findIconById, } from '../../assets/svg/weather'
import { OneCallWeatherResponse, } from '../../utils/WeatherUtil'

type WeatherDailyProps = {
  daily: OneCallWeatherResponse['daily'],
}

const days = [
  'Sun',
  'Mon',
  'Tue',
  'Wen',
  'Thu',
  'Fri',
  'Sat',
]

const WeatherDaily: FunctionComponent<WeatherDailyProps> = ({ daily, }) => {
  return (
    <div className={'w-full h-52 bg-secondary flex flex-row justify-evenly content-evenly p-2 overflow-auto flex-wrap'}>
      {daily.map(({ time, temp, weather, }, index) => {
        const Icon = findIconById(weather['icon'])

        return (
          <div key={index} className={'w-[calc(25%-0.5rem)] h-24 flex flex-col justify-center items-center p-0.5'}>
            <p className={'text-slate-100 font-bold text-sm'}>{days[(new Date(time).getDay())]}</p>
            <div className={'w-12 aspect-square flex justify-center items-center mb-2'}>
              <Icon />
            </div>
            <div className={'w-full flex flex-row justify-around'}>
              <p className={'text-blue-200 font-bold text-xxs'}>{temp['min']}</p>
              <p className={'text-slate-100/90 font-bold text-xxs'}>|</p>
              <p className={'text-red-200 font-bold text-xxs'}>{temp['max']}</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default WeatherDaily