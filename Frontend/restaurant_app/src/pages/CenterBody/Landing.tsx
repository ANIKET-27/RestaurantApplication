import React from 'react';

const Landing: React.FC = () => {
  return (
    <div className="flex flex-col h-screen bg-cream">
      <header className="flex justify-between items-center px-10 py-5 bg-dark-green">
        <h1 className="text-xl font-bold text-cream">4 Restoa</h1>
        <nav className="flex space-x-6 text-cream">
          <a href="#">Home</a>
          <a href="#">About Us</a>
          <a href="#">Services</a>
          <a href="#">Delivery</a>
          <a href="#">Contact Us</a>
        </nav>
      </header>
      <main className="flex flex-col items-center justify-center flex-grow px-10">
        <div className="flex flex-col items-center">
          <h2 className="text-4xl font-bold text-dark-green mb-4">Enjoy</h2>
          <h2 className="text-4xl font-bold text-dark-green mb-4">
            <span className="text-cream">Healthy Life</span>
          </h2>
          <h2 className="text-4xl font-bold text-dark-green mb-4">
            <span className="text-cream">Testy Food</span>
          </h2>
          <p className="text-lg text-dark-green mb-6">
            There Are People Who Can't Start Their Day Without Restaurent
          </p>
          <button className="bg-cream text-dark-green px-6 py-3 rounded-md font-bold hover:bg-dark-green hover:text-cream">
            Order Now
          </button>
        </div>
        <div className="relative mt-10">
          <img
            src="https://i.ibb.co/pW52b7b/landing-page-image.jpg"
            alt="Food Image"
            className="w-96 h-96 object-cover rounded-xl"
          />
          <div className="absolute bottom-4 right-4 flex items-center bg-cream p-2 rounded-md">
            <svg
              xmlns="http s://www.w3.org/2000/svg"
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
          </div>
        </div>
      </main>
      <footer className="bg-dark-green text-cream text-center py-4">
        <p>&copy; 2023 4 Restoa. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Landing;
