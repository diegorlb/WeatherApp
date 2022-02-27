import ClearSun from './01d.svg'
import ClearMoon from './01n.svg'
import FewCloudsSun from './02d.svg'
import FewCloudsMoon from './02n.svg'
import ScatteredCloudsSun from './03d.svg'
import ScatteredCloudsMoon from './03n.svg'
import BrokenCloudsSun from './04d.svg'
import BrokenCloudsMoon from './04n.svg'
import ShowerRainSun from './09d.svg'
import ShowerRainMoon from './09n.svg'
import RainSun from './10d.svg'
import RainMoon from './10n.svg'
import ThunderstormSun from './11d.svg'
import ThunderstormMoon from './11n.svg'
import SnowSun from './13d.svg'
import SnowMoon from './13n.svg'
import MistSun from './01d.svg'
import MistMoon from './01n.svg'

const findIconById = (iconId: string) => {
  switch (iconId) {
    case '01d': return ClearSun
    case '01n': return ClearMoon
    case '02d': return FewCloudsSun
    case '02n': return FewCloudsMoon
    case '03d': return ScatteredCloudsSun
    case '03n': return ScatteredCloudsMoon
    case '04d': return BrokenCloudsSun
    case '04n': return BrokenCloudsMoon
    case '09n': return ShowerRainSun
    case '09d': return ShowerRainMoon
    case '10d': return RainSun
    case '10n': return RainMoon
    case '11d': return ThunderstormSun
    case '11n': return ThunderstormMoon
    case '13d': return SnowSun
    case '13d': return SnowMoon
    case '50d': return MistSun
    case '50d': return MistSun
    default: return ClearSun
  }
}

export {
  ClearSun, ClearMoon,
  FewCloudsSun, FewCloudsMoon,
  ScatteredCloudsSun, ScatteredCloudsMoon,
  BrokenCloudsSun, BrokenCloudsMoon,
  ShowerRainSun, ShowerRainMoon,
  RainSun, RainMoon,
  ThunderstormSun, ThunderstormMoon,
  SnowSun, SnowMoon,
  MistSun, MistMoon,
  findIconById,
}