type RequestType = {
  lat: number,
  lon: number,
  lang: string,
  units: {
    temp: 'kelvin' | 'degrees' | 'fahrenheit',
    wind: 'metric' | 'imperial',
  },
}

type ResponseType = {
  weather: Array<{
    id: number,
    main: string,
    description: string,
    icon: string,
  }>,
  main: {
    temp: number,
    feels_like: number,
    temp_min: number,
    temp_max: number,
    pressure: number,
    humidity: number,
  },
  visibility: number,
  wind: {
    speed: number,
    deg: number,
    gust: number,
  },
  clouds: {
    all: number,
  },
  sys: {
    sunrise: number,
    sunset: number,
  },
  name: string,
}

type WeatherData = {
  name: string,
  weather: {
    id: number,
    main: string,
    description: string,
    icon: string,
  },
  temps: {
    current: string,
    feels: string,
    min: string,
    max: string,
  },
  info: {
    pressure: string,
    humidity: string,
    clouds: string,
    visibility: string,
    sunrise: string,
    sunset: string,
  },
  wind: {
    speed: string,
    deg: number,
  },
}

const defaultWeatherData = {
  name: '',
  weather: {
    id: 0,
    main: '',
    description: '',
    icon: '',
  },
  temps: {
    current: '0',
    feels: '0',
    min: '0',
    max: '0',
  },
  info: {
    pressure: '0',
    humidity: '0',
    clouds: '0',
    visibility: '0',
    sunrise: '00:00',
    sunset: '00:00',
  },
  wind: {
    speed: '0',
    deg: 0,
  },
}

const withQuery = (url: string, params: Record<string, any>) => {
  const final = new URL(url)
  for (const key of Object.keys(params)) {
    final.searchParams.append(key, params[key])
  }
  return final.toString()
}


const formatTemp = (temp: number, unit: 'kelvin' | 'degrees' | 'fahrenheit' = 'kelvin') => {
  switch (unit) {
    case 'kelvin': return `${formatNumber(temp)}K`
    case 'degrees': return `${formatNumber(temp - 273.15)}°C`
    case 'fahrenheit': return `${formatNumber((temp - 273.15) * 9 / 5 + 32)}°C`
  }
}

const formatWind = (wind: number, unit: 'metric' | 'imperial') => {
  switch (unit) {
    case 'metric': return `${formatNumber(wind * 3.6)} km/h`
    case 'imperial': return `${formatNumber(wind * 2.237)} mph`
    default: return ''
  }
}

const formatTime = (time: number) => {
  const date = new Date(time * 1000)
  const hours = date.getHours()
  const minutes = date.getMinutes()
  return `${hours > 10 ? hours : `0${hours}`}:${minutes > 10 ? minutes : `0${minutes}`}`
}

const formatNumber = (value: any) => {
  return Number(value).toFixed(1)
}


const useWeather = async ({ lat, lon, lang, units, }: RequestType): Promise<WeatherData> => {
  const response = await fetch(withQuery('https://api.openweathermap.org/data/2.5/weather', {
    lat,
    lon,
    lang,
    appId: process.env.NEXT_PUBLIC_OPENWEATHER,
  }), {
    method: 'GET',
  }).then((data) => data.json()) as ResponseType
  console.log(response)
  if (!response['name']) return defaultWeatherData

  const { weather, main, visibility, wind, clouds, sys, name, } = response

  return {
    name,
    weather: weather[0],
    temps: {
      current: formatTemp(main['temp'], units['temp']),
      feels: formatTemp(main['feels_like'], units['temp']),
      min: formatTemp(main['temp_min'], units['temp']),
      max: formatTemp(main['temp_max'], units['temp']),
    },
    info: {
      pressure: formatNumber(main['pressure']),
      humidity: formatNumber(main['humidity']),
      clouds: formatNumber(clouds['all']),
      visibility: formatNumber(visibility),
      sunrise: formatTime(sys['sunrise']),
      sunset: formatTime(sys['sunset']),
    },
    wind: {
      speed: formatWind(wind['speed'], units['wind']),
      deg: wind['deg'],
    },
  }
}

export default useWeather

export {
  defaultWeatherData,
}

export type {
  WeatherData,
}