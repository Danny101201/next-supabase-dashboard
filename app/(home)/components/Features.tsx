const Features = () => (
  <section
    id="features"
    className="py-16 bg-gray-200 text-gray-900 dark:bg-black dark:text-white"
  >
    <div className="container mx-auto text-center px-4 md:px-0">
      <h2 className="text-4xl font-bold mb-8">Features</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="p-6 bg-white rounded-lg shadow-lg transform transition duration-500 hover:scale-105 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700">
          <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
            Products
          </h3>
          <p className="text-gray-700 dark:text-gray-300">
            Content Management Service
          </p>
          <p className="text-gray-700 dark:text-gray-300">Microservices</p>
          <p className="text-gray-700 dark:text-gray-300">PayBnB</p>
        </div>
        <div className="p-6 bg-white rounded-lg shadow-lg transform transition duration-500 hover:scale-105 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700">
          <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
            Expertise
          </h3>
          <p className="text-gray-700 dark:text-gray-300">Experience Design</p>
          <p className="text-gray-700 dark:text-gray-300">Mobile App</p>
        </div>
      </div>
    </div>
  </section>
);

export default Features;
