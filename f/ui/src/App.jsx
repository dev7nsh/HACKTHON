import React from 'react'
import ThreeAnimation from './component/ThreeAnimation.jsx'
import Verify from './pages/Verify.jsx'

const App = () => {
	return (
		<div className='relative overflow-x-hidden h-screen w-screen'>
			<div className="  absolute right-80 border-b border-gray-300 top-20 left-15 w-80% pb-4  items-center  text-xs tracking-[0.25em] font-bold text-black">
                   VERIFIABLE AI LAB
                </div>
			
			<div className='pl-[600px]'>
				<ThreeAnimation />
			</div>
			
			<div className='absolute top-20 left-15 w-4xl h-full  items-center p-4'>
				<Verify />
			</div>
		</div>
	)
}

export default App