const formatQuery = (url: string, params: Record<string, any>) => {
  const final = new URL(url)
  for (const key of Object.keys(params)) {
    final.searchParams.append(key, params[key])
  }
  return final.toString()
}

const formatTemperature = (temp: number, unit: 'kelvin' | 'degrees' | 'fahrenheit' = 'kelvin') => {
  switch (unit) {
    case 'kelvin': return `${formatNumber(temp)}K`
    case 'degrees': return `${formatNumber(temp - 273.15)}°C`
    case 'fahrenheit': return `${formatNumber((temp - 273.15) * 9 / 5 + 32)}°C`
  }
}

const formatWindSpeed = (wind: number, unit: 'metric' | 'imperial') => {
  switch (unit) {
    case 'metric': return `${formatNumber(wind * 3.6)} km/h`
    case 'imperial': return `${formatNumber(wind * 2.237)} mph`
    default: return ''
  }
}

const formatPercentage = (value: number) => {
  return `${formatNumber(value)}%`
}

const formatTime = (time: number) => {
  const date = new Date(time * 1000)
  const hours = date.getHours()
  const minutes = date.getMinutes()
  return `${hours >= 10 ? hours : `0${hours}`}:${minutes >= 10 ? minutes : `0${minutes}`}`
}

const formatNumber = (value: any) => {
  return Number(value).toFixed(1)
}

export {
  formatQuery,
  formatTemperature,
  formatWindSpeed,
  formatTime,
  formatPercentage,
  formatNumber,
}