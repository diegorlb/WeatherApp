import { FunctionComponent, useCallback, useEffect, useRef, useState, } from 'react'
import { formatWindSpeed } from '../../utils/FormatUtils'
import { mapRange, } from '../../utils/MathUtil'
import { OneCallWeatherResponse, } from '../../utils/WeatherUtil'

type WindGraphProps = {
  hourly: OneCallWeatherResponse['hourly'],
}

const WindGraph: FunctionComponent<WindGraphProps> = ({ hourly, }) => {
  const ref = useRef<HTMLDivElement>(null!)
  const svg = useRef<SVGSVGElement>(null!)

  const [winds, setWinds] = useState<Array<{ time: string, speed: number, dir: number, }>>([])
  const [dimensions, setDimensions] = useState<Array<number>>([0, 0])

  const recalculateGraph = useCallback((svg: SVGSVGElement) => {
    if (!svg) return
    const { width, height, } = svg.getBoundingClientRect()
    setDimensions([width, height])
  }, [])

  useEffect(() => {
    setWinds(hourly.slice(0, 12).map(({ time, wind_speed, wind_deg, }) => {
      const date = new Date(time)
      const h = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours()
      const m = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()
      return {
        time: `${h}:${m}`,
        speed: wind_speed,
        dir: wind_deg,
      }
    }))
  }, [hourly])

  useEffect(() => {
    const observer = new ResizeObserver(([entry]) => {
      if (!entry) return
      recalculateGraph(svg.current)
    })
    observer.observe(ref.current)

    return () => observer.disconnect()
  }, [svg.current, ref.current, hourly])

  return (
    <div ref={ref} className={'w-full h-44 flex-shrink-0 bg-secondary overflow-hidden border border-secondary'}>
      <svg ref={svg} width={'100%'} height={'100%'}>
        {winds.map(({ time, speed, dir, }, index, array) => {
          const width = dimensions[0] / array.length - 2
          const height = mapRange(speed, 0, 10, 0, dimensions[1] * 0.6)

          return (
            <g key={index}>
              <rect
                x={index * (width + 2)}
                y={dimensions[1] * 0.8 - height}
                width={width}
                height={height + (index % 2) * 10}
                fill={'#f5f5f5'} />
              <text
                x={(index + 1 / 2) * (width + 2)}
                y={dimensions[1] * 0.8 - height - 16}
                fontSize={12}
                fontFamily={'Open Sans'}
                fontWeight={'bold'}
                textAnchor={'middle'}
                fill={'#f5f5f5'}>{(speed * 3.6).toFixed(0)}</text>

              <text
                x={(index + 1 / 2) * (width + 2)}
                y={dimensions[1] - 20 + (index % 2) * 10}
                fontSize={10}
                fontFamily={'Open Sans'}
                fontWeight={'bold'}
                textAnchor={'middle'}
                fill={'#f5f5f5'}>{time}</text>

              <g style={{
                transformBox: 'fill-box',
                transformOrigin: 'center',
                transform: `rotate(${dir - 180}deg)`,
              }} >
                <rect
                  x={(index + 1 / 2) * (width + 2)}
                  y={dimensions[1] * 0.8 - height - 12}
                  width={2}
                  height={8}
                  fill={'#f5f5f5'} />
                <rect
                  x={(index + 1 / 2) * (width + 2) + 1}
                  y={dimensions[1] * 0.8 - height - 13.5}
                  width={2}
                  height={4}
                  style={{
                    transformBox: 'fill-box',
                    transformOrigin: 'center',
                    transform: `translateX(-2px) rotate(${60}deg)`,
                  }}
                  fill={'#f5f5f5'} />
                <rect
                  x={(index + 1 / 2) * (width + 2) + 1}
                  y={dimensions[1] * 0.8 - height - 13.5}
                  width={2}
                  height={4}
                  style={{
                    transformBox: 'fill-box',
                    transformOrigin: 'center',
                    transform: `rotate(${-60}deg)`,
                  }}
                  fill={'#f5f5f5'} />
              </g>
            </g>
          )
        })}
      </svg>
    </div>
  )
}

export default WindGraph