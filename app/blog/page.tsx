import { readBlogs, readBlogs2 } from "./actions";
import { BlogList } from "./components/BlogList";
import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query";

const Blog = async () => {
  const aaa = await readBlogs2()
  console.log(aaa)
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery({
    queryKey: ['blogs'],
    queryFn: async () => await readBlogs()
  })
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap -mx-4">
          <BlogList />
        </div>
      </div>
    </HydrationBoundary>
  );
}

export default Blog;

