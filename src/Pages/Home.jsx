import React from 'react'
import CardContainer from './CardContainer'
import useStore from '../Zustand/useStore'

const Home = () => {
  const {colors} = useStore()
  console.log("color", colors)
  return (
    <div className=' h-screen w-screen flex justify-center items-center '>
        <div className={`h-full w-full flex `} style={{background: `linear-gradient(to top, ${colors[0]}, ${colors[1]})`}}>
          
            <div className='h-full w-full 'x>
                <CardContainer />
            </div>
        </div>
        
    </div>
  )
}

export default Home