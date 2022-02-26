import { FunctionComponent, } from 'react'

type CurrentInfoProps = {
  title: string,
  value: string | number,
}

const CurrentInfo: FunctionComponent<CurrentInfoProps> = ({ title, value, }) => {
  return (
    <div className={'w-full h-12 flex flex-col justify-center items-center'}>
      <p className={'text-slate-100/90 font-medium'}>{title}</p>
      <p className={'text-slate-100 font-bold text-sm'}>{value}</p>
    </div>
  )
}

export default CurrentInfo