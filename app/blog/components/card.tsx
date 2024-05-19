import { TodoType } from "@/type/todo";

const BlogCard = ({ title, status }: Partial<TodoType>) => {
  return (
    <div className="p-4 w-full sm:w-1/2 md:w-1/3">
      <div className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
        <img
          className="lg:h-48 md:h-36 w-full object-cover object-center"
          src="https://images.unsplash.com/photo-1598939821153-a4dd26ab5f91?q=80&w=2073&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA7fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="blog post image"
        />
        <div className="p-6 bg-white">
          <h2 className="tracking-widest text-xs title-font font-medium text-gray-500 mb-1">
            {status}
          </h2>
          <h1 className="title-font text-lg font-medium text-gray-900 mb-3">
            {title}
          </h1>
          <p className="leading-relaxed mb-3 text-black">
            Some quick example text to build on the card title and make up the
            bulk of the cards content.
          </p>
          <div className="flex items-center flex-wrap">
            <a
              href="#"
              className="text-indigo-500 inline-flex items-center md:mb-2 lg:mb-0"
            >
              Learn More
              <svg
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                className="w-4 h-4 ml-2"
                viewBox="0 0 24 24"
              >
                <path d="M5 12h14M12 5l7 7-7 7"></path>
              </svg>
            </a>
            <span className="text-gray-400 mr-3 inline-flex items-center lg:ml-auto md:ml-0 ml-auto leading-none text-sm pr-3 py-1 border-r-2 border-gray-200">
              <svg
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                className="w-4 h-4 mr-1"
                viewBox="0 0 24 24"
              >
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                <circle cx="12" cy="12" r="3"></circle>
              </svg>
              1.2K
            </span>
            <span className="text-gray-400 inline-flex items-center leading-none text-sm">
              <svg
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                className="w-4 h-4 mr-1"
                viewBox="0 0 24 24"
              >
                <path d="M21 11.5a8.38 8.38 0 01-5.26-1.73L5 10.13a8.36 8.36 0 000 3.74l10.74 2.36A8.38 8.38 0 0121 12.5v-1z"></path>
                <path d="M3.27 6.96s1.35-1.82 2.63-2.47a10.4 10.4 0 014.44-1h.01c.14.1.26.21.37.33L12 7l1.28-1.17c.11-.12.23-.23.37-.33h.01c1.6.11 3.04.46 4.44 1 1.28.65 2.63 2.47 2.63 2.47"></path>
                <path d="M8 21.13a21.67 21.67 0 008 0"></path>
              </svg>
              6 Comments
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
