import { FunctionComponent, useState, useEffect, } from 'react'
import { GetStaticProps, } from 'next'
import useWeather, { defaultWeatherData, WeatherData } from '../hooks/useWeather'

import WeatherIcon from '../components/WeatherIcon'

const Index: FunctionComponent = ({ }) => {
  const [data, setData] = useState<WeatherData>(defaultWeatherData)

  useEffect(() => {
    (async () => {
      //Random coordinatos for testing
      setData(await useWeather({
        lat: -34.695530, lon: -58.407650, lang: 'sp', units: {
          temp: 'degrees',
          wind: 'metric',
        }
      }))
    })()
  }, [])
  


  return (
    <div className={'w-screen h-screen bg-primary flex flex-col justify-center items-center px-4 space-y-4'}>
      <div className={'w-full h-48 bg-secondary rounded-md p-2 flex space-x-2'}>
        <div className={'w-36 aspect-square flex flex-col items-center py-2 space-y-2'}>
          <WeatherIcon icon={data['weather']['icon'] as any} temp={data['temps']['current']}/>

          <div className={'w-full h-fit flex justify-center space-x-2'}>
            <p className={'text-slate-100 font-bold text-sm'}>{data['temps']['min']}</p>
            <p className={'text-slate-100 text-sm'}>-</p>
            <p className={'text-slate-100 font-bold text-sm'}>{data['temps']['max']}</p>
          </div>
        </div>
        <div className={'flex flex-col flex-1'}>
          <div className={'w-full flex-1 flex flex-col justify-center items-center'}>
            <p className={'text-slate-100 font-bold text-xl'}>{data['name']}</p>
            <p className={'text-slate-100/90'}>{data['weather']['main']}</p>
          </div>
          <div className={'w-full h-12 flex flex-row justify-around items-center'}>
            <div className={'flex-1 flex flex-col items-center'}>
              <p className={'text-slate-100/90 font-medium'}>Humidity</p>
              <p className={'text-slate-100 font-bold text-sm'}>{data['info']['humidity']}%</p>
            </div>
            <div className={'flex-1 flex flex-col items-center'}>
              <p className={'text-slate-100/90 font-medium'}>Windspeed</p>
              <p className={'text-slate-100 font-bold text-sm'}>{data['wind']['speed']}</p>
            </div>
          </div>
          <div className={'w-full h-12 flex flex-row justify-around items-center'}>
            <div className={'flex-1 flex flex-col items-center'}>
              <p className={'text-slate-100/90 font-medium'}>Sunrise</p>
              <p className={'text-slate-100 font-bold text-sm'}>{data['info']['sunrise']}</p>
            </div>
            <div className={'flex-1 flex flex-col items-center'}>
              <p className={'text-slate-100/90 font-medium'}>Sunset</p>
              <p className={'text-slate-100 font-bold text-sm'}>{data['info']['sunset']}</p>
            </div>
          </div>
        </div>
      </div>

      <div className={'w-full aspect-square bg-secondary rounded-md'}>

      </div>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {

    },
    revalidate: 60,
  }
}

export default Index