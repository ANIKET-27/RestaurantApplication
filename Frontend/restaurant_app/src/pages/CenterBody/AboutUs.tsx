import React from 'react';

function AboutUs() {
  return (
    <div className="flex-1 p-6 bg-cream">
      <div className="max-w-4xl mx-auto bg-white p-8 shadow-xl rounded-lg">
        {/* Title Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold text-darkGreen mb-4">About Us</h1>
          <p className="text-xl text-gray-600">
            Discover the story behind our restaurant and what makes us a unique dining experience.
          </p>
        </div>

        {/* Restaurant Introduction Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-semibold text-darkGreen mb-4">Welcome to Our Restaurant</h2>
          <p className="text-gray-700 leading-relaxed">
            We are a family-owned restaurant committed to serving mouthwatering dishes crafted with passion and love. 
            Our chefs use only the finest local ingredients to bring you food that is both delicious and satisfying. 
            Join us for a warm, inviting dining experience where every meal feels like a celebration.
          </p>
        </section>

        {/* Mission Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-semibold text-darkGreen mb-4">Our Mission</h2>
          <p className="text-gray-700 leading-relaxed">
            Our mission is to offer exceptional dining experiences that bring joy, warmth, and a sense of community to every guest.
            We believe that food has the power to bring people together, and we’re dedicated to creating an atmosphere of comfort, quality, and care.
          </p>
        </section>

        {/* History Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-semibold text-darkGreen mb-4">Our History</h2>
          <p className="text-gray-700 leading-relaxed">
            Since our founding in [Year], we have been committed to offering a delightful dining experience. What started as a small neighborhood restaurant
            has grown into a beloved local gem, serving delicious meals with a side of hospitality. Over the years, we’ve expanded our menu and improved
            our services, while staying true to our roots and our love for good food.
          </p>
        </section>

        {/* Team Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-semibold text-darkGreen mb-4">Meet Our Team</h2>
          <p className="text-gray-700 mb-4 leading-relaxed">
            Our dedicated team is the heart of our restaurant. Each member contributes their passion and expertise to provide you with the best service
            and culinary experience. From our talented chefs to our friendly servers, we’re here to make your experience unforgettable.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-cream p-6 rounded-lg shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
              <h3 className="font-semibold text-xl text-darkGreen mb-2">John Doe</h3>
              <p className="text-gray-600">Executive Chef</p>
            </div>
            <div className="bg-cream p-6 rounded-lg shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
              <h3 className="font-semibold text-xl text-darkGreen mb-2">Jane Smith</h3>
              <p className="text-gray-600">Restaurant Manager</p>
            </div>
            <div className="bg-cream p-6 rounded-lg shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
              <h3 className="font-semibold text-xl text-darkGreen mb-2">Emily Johnson</h3>
              <p className="text-gray-600">Sous Chef</p>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-semibold text-darkGreen mb-4">Contact Us</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Have any questions or want to book a reservation? We’d love to hear from you. Get in touch with us through the details below.
          </p>
          <p className="text-gray-600 mb-2">
            <strong className="text-darkGreen">Phone:</strong> (123) 456-7890
          </p>
          <p className="text-gray-600 mb-2">
            <strong className="text-darkGreen">Email:</strong> contact@restaurant.com
          </p>
          <div className="mt-6 text-center">
            <button className="px-6 py-2 rounded-md bg-darkGreen text-white text-lg font-semibold hover:bg-darkGreen-dark focus:outline-none focus:ring-2 focus:ring-darkGreen">
              Make a Reservation
            </button>
          </div>
        </section>

      </div>
    </div>
  );
}

export default AboutUs;
