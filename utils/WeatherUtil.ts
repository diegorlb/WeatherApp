import { formatNumber, formatPercentage, formatQuery, formatTemperature, formatTime, formatWindSpeed, } from './FormatUtils'

type Coordinates = {
  lat: number,
  lon: number,
}

type Units = {
  temp: 'kelvin' | 'degrees' | 'fahrenheit',
  wind: 'metric' | 'imperial',
}



type APIOneCallResponse = {
  hourly: Array<{
    dt: number,
    temp: number,
    feels_like: number,
    pressure: number,
    humidity: number,
    dew_point: number,
    uvi: number,
    clouds: number,
    visibility: number,
    wind_speed: number,
    wind_deg: number,
    weather: Array<{
      main: string,
      description: string,
      icon: string,
    }>,
    pop: number,
  }>,
  daily: Array<{
    dt: number,
    sunrise: number,
    sunset: number,
    moonrise: number,
    moonset: number,
    temp: {
      min: number,
      max: number,
    },
    wind_speed: number,
    wind_deg: number,
    pop: number,
    weather: Array<{
      main: string,
      description: string,
      icon: string,
    }>,
  }>,
}

type OneCallWeatherResponse = {
  hourly: Array<{
    time: number,
    temp: number,
    feels: number,
    pressure: number,
    humidity: number,
    clouds: number,
    visibility: number,
    wind_speed: number,
    wind_deg: number,
    weather: {
      main: string,
      description: string,
      icon: string,
    },
    precipitations: number,
  }>,
  daily: Array<{
    time: number,
    sunrise: string,
    sunset: string,
    moonrise: string,
    moonset: string,
    temp: {
      min: string,
      max: string,
    },
    wind_speed: string,
    wind_deg: number,
    precipitations: number,
    weather: {
      main: string,
      description: string,
      icon: string,
    },
  }>,
}

const getWeatherData = async (coordinates: Coordinates, lang: string, units: Units): Promise<OneCallWeatherResponse> => {
  const response = await fetch(formatQuery('https://api.openweathermap.org/data/2.5/onecall', {
    ...coordinates,
    lang,
    exclude: 'current,minutely',
    appId: process.env.NEXT_PUBLIC_OPENWEATHER,
  })).then((data) => data.json()) as APIOneCallResponse
  
  if (response && response['hourly'] && response['daily']) {
    const hourly = response['hourly'].map(({ dt, temp, feels_like, pressure, humidity, clouds, visibility, wind_speed, wind_deg, weather, pop, }) => ({
      time: dt * 1000,
      temp,
      feels: feels_like,
      pressure,
      humidity,
      clouds,
      visibility,
      wind_speed,
      wind_deg,
      weather: weather[0],
      precipitations: pop,
    }))

    const daily = response['daily'].map(({ dt, sunrise, sunset, moonrise, moonset, temp, wind_speed, wind_deg, weather, pop, }) => ({
      time: dt * 1000,
      sunrise: formatTime(sunrise),
      sunset: formatTime(sunset),
      moonrise: formatTime(moonrise),
      moonset: formatTime(moonset),
      temp: {
        min: formatTemperature(temp['min'], units['temp']),
        max: formatTemperature(temp['max'], units['temp']),
      },
      wind_speed: formatWindSpeed(wind_speed, units['wind']),
      wind_deg,
      precipitations: pop,
      weather: {
        main: weather[0]['main'],
        description: weather[0]['description'],
        icon: weather[0]['icon'],
      },
    }))

    return {
      hourly,
      daily,
    }
  } else {
    return {
      hourly: [],
      daily: [],
    }
  }
}



type APICurrentResponse = {
  name: string,
  weather: Array<{
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
}

type CurrentWeatherData = {
  name: string,
  weather: {
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

const getCurrentWeatherData = async (coordinates: Coordinates, lang: string, units: Units): Promise<CurrentWeatherData> => {
  const response = await fetch(formatQuery('https://api.openweathermap.org/data/2.5/weather', {
    ...coordinates,
    lang,
    appId: process.env.NEXT_PUBLIC_OPENWEATHER,
  })).then((data) => data.json()) as APICurrentResponse

  if (response && response['name']) {
    const { weather, main, visibility, wind, clouds, sys, name, } = response

    return {
      name,
      weather: {
        main: weather[0]['main'],
        description: weather[0]['description'],
        icon: weather[0]['icon'],
      },
      temps: {
        current: formatTemperature(main['temp'], units['temp']),
        feels: formatTemperature(main['feels_like'], units['temp']),
        min: formatTemperature(main['temp_min'], units['temp']),
        max: formatTemperature(main['temp_max'], units['temp']),
      },
      info: {
        pressure: formatNumber(main['pressure']),
        humidity: formatPercentage(main['humidity']),
        clouds: formatNumber(clouds['all']),
        visibility: formatNumber(visibility),
        sunrise: formatTime(sys['sunrise']),
        sunset: formatTime(sys['sunset']),
      },
      wind: {
        speed: formatWindSpeed(wind['speed'], units['wind']),
        deg: wind['deg'],
      },
    }
  } else {
    return defaultWeatherData
  }
}

export {
  getWeatherData,
  getCurrentWeatherData,
  defaultWeatherData,
}

export type {
  OneCallWeatherResponse,
  CurrentWeatherData,
}