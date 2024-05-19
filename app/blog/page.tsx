/* eslint-disable @next/next/no-img-element */
import { readTodos } from "./actions";
import BlogCard from "./components/card";

const Blog = async () => {
  const { data: todos } = await readTodos();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-wrap -mx-4">
        {todos?.map(({ id, title, status }) => (
          <BlogCard key={id} title={title} status={status} />
        ))}
      </div>
    </div>
  );
};

export default Blog;
