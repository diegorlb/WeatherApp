import { FunctionComponent, useMemo, } from 'react'

import { findIconById, } from '../../assets/svg/weather'

type WeatherIconProps = {
  icon: string,
  temp: string,
}

const WeatherIcon: FunctionComponent<WeatherIconProps> = ({ icon, temp, }) => {
  const Icon = useMemo(() => findIconById(icon), [icon])

  return (
    <div className={'flex-auto aspect-square rounded-md relative'}>
      <div className={'w-full h-full flex flex-col justify-evenly items-center'}>
        <Icon />
        <p className={'text-yellow-200 font-bold text-2xl'}>{temp}</p>
      </div>
    </div>
  )
}

export default WeatherIcon