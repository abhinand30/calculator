
const Home = () => {
    return (
        <div className="min-h-[100vh]  /* smaller height on mobile */ md:min-h-scree  /* full height on large screens */ w-screen bg-[url('/pexel.jpg')] bg-cover bg-center flex items-center justify-center text-center px-4">
            <div data-aos="fade-up" className="max-w-2xl text-white">
                <h2
                    // 
                    className="text-4xl md:text-6xl text-white font-bold my-4 drop-shadow-xl"
                >
                    Build Your Next Project Faster
                </h2>

                <p
                    // data-aos="fade-left"
                    className="text-base sm:text-lg md:text-xl text-white/90 mb-8 drop-shadow-lg"
                >
                    Create beautiful, responsive applications using modern tools and reusable components.
                </p>

                <div
                    // data-aos="fade-right"
                    className="flex flex-row gap-4 justify-center mt-4"
                >
                    <button className="px-6 py-3 text-sm font-semibold bg-blue-600 hover:bg-blue-700 rounded-lg shadow-lg">
                        Get Started
                    </button>

                    <button className="px-6 py-3 text-sm font-semibold bg-white text-black hover:bg-gray-200 rounded-lg shadow-lg">
                        Learn More
                    </button>
                </div>
            </div>
        </div>

    )
}

export default Home