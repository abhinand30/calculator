import React from 'react'

const Home = () => {
    return (
        <div
            className="min-h-screen min-w-screen bg-[url('/stock.jpg')] bg-cover bg-center flex items-center justify-center text-center px-6 "
        >
            <div data-aos="fade-up" className="max-w-2xl text-white">
                <h1 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-xl">
                    Build Your Next Project Faster
                </h1>

                <p className="text-lg md:text-xl text-white/90 mb-8 drop-shadow-lg">
                    Create beautiful, responsive applications using modern tools and reusable components.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button className="px-6 py-3 text-lg font-semibold bg-blue-600 hover:bg-blue-700 rounded-lg shadow-lg">
                        Get Started
                    </button>

                    <button className="px-6 py-3 text-lg font-semibold bg-white text-black hover:bg-gray-200 rounded-lg shadow-lg">
                        Learn More
                    </button>
                </div>
            </div>
        </div>

    )
}

export default Home