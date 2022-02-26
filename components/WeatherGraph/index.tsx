import { FunctionComponent, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { generatePaths, generatePoints } from '../../utils/GraphUtil'
import { OneCallWeatherResponse, } from '../../utils/WeatherUtil'

type WeatherGraphProps = {
  hourly: OneCallWeatherResponse['hourly'],
}

const WeatherGraph: FunctionComponent<WeatherGraphProps> = ({ hourly, }) => {
  const ref = useRef<HTMLDivElement>(null!)
  const svg = useRef<SVGSVGElement>(null!)

  const [temps, setTemps] = useState<Array<{ time: string, temp: number, }>>([])
  const [path, setPath] = useState<string>('')
  const [points, setPoints] = useState<Array<{ x: number, y: number }>>([])
  const [dimensions, setDimensions] = useState<Array<number>>([0, 0])

  useEffect(() => {
    setTemps(hourly.slice(0, 12).map(({ time, temp, }) => {
      const date = new Date(time)
      const h = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours()
      const m = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()
      return {
        time: `${h}:${m}`,
        temp: +(temp - 273.15).toFixed(1),
      }
    }))
    recalculatePath(svg.current)
  }, [hourly])

  const recalculatePath = useCallback((svg: SVGSVGElement) => {
    if (!svg) return
    const { width, height, } = svg.getBoundingClientRect()
    setPath(generatePaths(temps.map(({ temp, }) => temp,), width, height))
    setPoints(generatePoints(temps.map(({ temp, }) => temp,), width, height))
    setDimensions([width, height])
  }, [temps])

  useEffect(() => {
    const observer = new ResizeObserver(([entry]) => {
      if (!entry) return
      recalculatePath(svg.current)
    })
    observer.observe(ref.current)

    return () => observer.disconnect()
  }, [svg.current, ref.current, temps])

  return (
    <div ref={ref} className={'w-full h-44 bg-secondary rounded-lg overflow-hidden border border-secondary'}>
      <svg ref={svg} width={'100%'} height={'100%'}>
        <defs>
          <linearGradient id={'pathGradient'} x1={'100%'} y1={'100%'} x2={'100%'} y2={'0%'}>
            <stop offset={'0%'} stopColor={'rgba(191,219,254,100)'} />
            <stop offset={'100%'} stopColor={'rgba(254,202,202,100)'} />
          </linearGradient>
          <linearGradient id={'fillGradient'} x1={'100%'} y1={'100%'} x2={'100%'} y2={'0%'}>
            <stop offset={'0%'} stopColor={'rgba(71,109,133,30)'} />
            <stop offset={'100%'} stopColor={'rgba(113,144,173,80)'} />
          </linearGradient>
        </defs>
        <path d={path} strokeWidth={4} stroke={'url(#pathGradient)'} fill={'url(#fillGradient)'} />
        {points.map(({ x, y, }, index) => (
          <g key={index}>
            <line
              x1={x}
              y1={y}
              x2={x}
              y2={dimensions[1] - 30 + (index % 2) * 10}
              stroke={'#ffffff55'}
              strokeWidth={1} />
            <circle
              cx={x}
              cy={y}
              r={2}
              fill={'#252525'} />
            <text
              x={x}
              y={y - 10}
              fontSize={12}
              fontFamily={'Open Sans'}
              fontWeight={'bold'}
              textAnchor={'middle'}
              fill={'#f5f5f5'}>{temps[index]?.['temp'].toFixed(0)}</text>
            <text
              x={x}
              y={dimensions[1] - 20 + (index % 2) * 10}
              fontSize={10}
              fontFamily={'Open Sans'}
              fontWeight={'bold'}
              textAnchor={'middle'}
              fill={'#f5f5f5ee'}>{temps[index]?.['time']}</text>
          </g>
        ))}
      </svg>
    </div>
  );
}

export default WeatherGraph