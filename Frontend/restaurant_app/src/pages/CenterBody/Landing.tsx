import React from 'react';

const Landing: React.FC = () => {
  return (
    <div className="flex-1 flex-col h-screen bg-cream">
      <main className="flex flex-col items-center justify-center flex-grow px-8 sm:px-12 lg:px-24">
        {/* Hero Section */}
        <div className="flex flex-col items-center text-center space-y-6">
          <h2 className="text-5xl font-extrabold text-dark-green mb-2">
            Enjoy
          </h2>
          <h2 className="text-5xl font-extrabold text-dark-green mb-2">
            <span className="text-cream">Healthy Life</span>
          </h2>
          <h2 className="text-5xl font-extrabold text-dark-green mb-4">
            <span className="text-cream">Tasty Food</span>
          </h2>
          <p className="text-lg sm:text-xl md:text-2xl text-dark-green mb-8 px-6 sm:px-12 lg:px-24 max-w-xl mx-auto">
            There are people who can't start their day without visiting a restaurant. We bring the best of healthy and tasty food to your door!
          </p>
          <button className="bg-dark-green text-cream px-8 py-4 rounded-lg font-semibold text-lg hover:bg-cream hover:text-dark-green transition duration-300 transform hover:scale-105">
            Order Now
          </button>
        </div>

        {/* Image Section */}
        <div className="relative mt-10 sm:mt-16">
          <img
            src="https://i.ibb.co/pW52b7b/landing-page-image.jpg"
            alt="Food Image"
            className="w-96 h-96 object-cover rounded-2xl shadow-lg transform transition duration-300 hover:scale-105"
          />
          {/* <div className="absolute bottom-6 right-6 flex items-center bg-cream p-3 rounded-md shadow-md transition duration-300 transform hover:scale-105 hover:bg-dark-green">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-dark-green"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
            <span className="ml-2 text-dark-green">Add to Cart</span>
          </div> */}
        </div>
      </main>
    </div>
  );
};

export default Landing;

