import React from 'react'

const sections = [
	{
		title: 'Authenticity Checker',
		desc: 'AI-powered detection that analyzes video & audio for deepfake manipulation in real-time.',
	},
	{
		title: 'Explainable Results',
		desc: 'Clear confidence scores with visual/audio highlights to show why content may be fake.',
	},
	{
		title: 'Smart Reporting Assistant',
		desc: 'A chatbot that guides users through reporting suspected deepfakes to the right cyber authorities.',
	},
	{
		title: 'For Everyone',
		desc: 'Whether you’re a public speaker, journalist, or everyday user — safeguard your identity and reputation with simple tools.',
	},
]

const Verify = () => {
	return (
        

        
		<div className='flex-1 py-10 md:py-0'>
			<h2 className='text-3xl md:text-5xl font-bold text-black mb-6 leading-tight' >
				 Authenticity in the<br className="hidden md:block" /> Age of AI Deepfakes
			</h2>
			<p className='text-base md:text-lg text-gray-700 mb-8 max-w-2xl font-sans leading-relaxed'>
				Our platform helps you detect, verify, and report deepfake video and audio — protecting individuals, public figures, and organizations from misinformation and fraud.
			</p>
			<div className='flex flex-col gap-2'>
				{sections.map((s, i) => (
					<div
						key={i}
						className='bg-white/20 backdrop-blur-xs rounded-md border border-gray-200 p-6 transition-all duration-500 ease-in-out hover:bg-white/40 hover:shadow-2xl hover:scale-105'
						style={{
							border: '1px solid rgba(200,200,200,0.3)',
							background: 'rgba(255,255,255,0.15)',
							backgroundClip: 'padding-box',
							borderRadius: "5px",
							boxShadow: "0 8px 10px 0 rgba(0,0,0,0.18)",
						}}
					>
						<h3 className='text-xl font-medium text-black mb-1'>
							{s.title}
						</h3>
						<p className='text-gray-700 text-base'>{s.desc}</p>
					</div>
				))}
			</div>
			<div className='mt-8'>
				<a
					href='./verifiable-ai-lab'
					className='inline-flex items-center px-6 py-2 border border-black rounded-full text-black font-medium hover:bg-gray-100 transition text-base'
				>
					Learn More
					<span className='ml-2'>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							width='20'
							height='20'
							fill='none'
							viewBox='0 0 24 24'
						>
							<path
								d='M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z'
								fill='black'
							/>
						</svg>
					</span>
				</a>
			</div>
            
		</div>
        
        

	)
}

export default Verify