import { FunctionComponent, useState, } from 'react'

const HorizontalCards: FunctionComponent = ({ children, }) => {
  const [scroll, setScroll] = useState<number>(0)

  return (
    <div className={'w-full flex flex-col overflow-hidden rounded-md'}>
      <div className={'flex-1 flex flex-row overflow-x-scroll scrollbar scrollbar-thin'}
        onScroll={(e) => {
          const { clientWidth, scrollLeft, } = e.target as HTMLDivElement
          setScroll(scrollLeft / clientWidth)
        }}>
        {children}
      </div>
      <div className={'w-full h-4 bg-secondary flex justify-center items-center space-x-2'}>
        {(Array.isArray(children) ? [...children] : [children]).map((_, index, array) => {
          const current = (scroll >= index / array.length) && (scroll < (index + 1) / array.length)
          return (<div key={index} className={`h-2/5 aspect-square ${current ? 'bg-red-500' : 'bg-white'} rounded-full`} />)
        })}
      </div>
    </div>
  );
}

export default HorizontalCards