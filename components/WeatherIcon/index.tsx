import { FunctionComponent, useMemo, } from 'react'
import { FontAwesomeIcon, FontAwesomeIconProps, } from '@fortawesome/react-fontawesome'

type WeatherIconProps = {
  icon:
  '01d' | '01n' |
  '02d' | '02n' |
  '03d' | '03n' |
  '04d' | '04n' |
  '09d' | '09n' |
  '10d' | '10n' |
  '11d' | '11n' |
  '13d' | '13n' |
  '50d' | '50n',
  temp: string,
}

const WeatherIcon: FunctionComponent<WeatherIconProps> = ({ icon, temp, }) => {
  const iconName: FontAwesomeIconProps['icon'] = useMemo(() => {
    switch (icon) {
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
  }, [icon])

  return (
    <div className={'flex-auto aspect-square rounded-md relative'}>
      <div className={'w-full h-full flex flex-col justify-evenly items-center'}>
        <FontAwesomeIcon icon={iconName} className={'text-yellow-300'} size={'5x'} />
        <p className={'text-yellow-200 font-bold text-2xl'}>{temp}</p>
      </div>
    </div>
  )
}

export default WeatherIcon