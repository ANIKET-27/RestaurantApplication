import React from 'react';

const Landing: React.FC = () => {
  return (
    <div className="flex-1 flex-col h-full bg-cream">
      <main className="flex flex-col justify-center flex-grow px-8 sm:px-12 lg:px-24">
        {/* Hero Section */}
        <div
          className="relative w-full h-[750px] bg-cover bg-center"
          style={{
            backgroundImage: 'url("src/assets/TableWithFood.jpg")',
          }}
        >
          {/* Overlay content */}
          <div className="absolute inset-0 bg-black opacity-60"></div> {/* Darker overlay */}
          <div className="absolute inset-0 flex flex-col items-start justify-center px-8 sm:px-16 lg:px-24 space-y-8">
            <h1 className="text-5xl font-extrabold text-left text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-500 to-red-600 drop-shadow-lg">
              Welcome to Cafe Delhi Heights!!
            </h1>
            <h2 className="space-y-4">
              <p className="bg-yellow-400 text-dark-green px-4 py-2 rounded-md text-2xl font-bold w-fit">Explore</p>
              <p className="bg-yellow-400 text-dark-green px-4 py-2 rounded-md text-2xl font-bold w-fit">Healthy</p>
              <p className="bg-yellow-400 text-dark-green px-4 py-2 rounded-md text-2xl font-bold w-fit">Tasty Food</p>
            </h2>
            <div className="text-lg sm:text-xl md:text-2xl text-cream max-w-3xl text-color-cream">
              <p className="mb-4">
                There are people who can't start their day without visiting a restaurant. We bring the best of healthy
                and tasty food to your door!
              </p>
              <p>Order your meal Now!!</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Landing;
