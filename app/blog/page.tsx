/* eslint-disable @next/next/no-img-element */
import { readBlogs } from "./actions";
import BlogCard from "./components/card";

const Blog = async () => {
  const { data: blogs } = await readBlogs();
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-wrap -mx-4">
        {blogs?.map((blog) => (
          <BlogCard key={blog.id} {...blog} />
        ))}
      </div>
    </div>
  );
};

export default Blog;

