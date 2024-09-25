import React, { useEffect, useState } from "react";

const BookMarks = () => {
  const [bookmarks, setBookmarks] = useState([]);

  
  useEffect(() => {
    const storedBookmarks = localStorage.getItem("bookmarks");
    if (storedBookmarks) {
      setBookmarks(JSON.parse(storedBookmarks));
    }
  }, []);

  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:max-w-4xl">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            From the blog
          </h2>
          <p className="mt-2 text-lg leading-8 text-gray-600">
            Learn how to grow your business with our expert advice.
          </p>
          <div className="mt-16 space-y-20 lg:mt-20 lg:space-y-20">
            {bookmarks.length > 0 ? (
              bookmarks.map((post) => (
                <article
                  key={post.id}
                  className="relative isolate flex flex-col gap-8 lg:flex-row"
                >
                  <div className="relative aspect-[16/9] sm:aspect-[2/1] lg:aspect-square lg:w-64 lg:shrink-0">
                    <img
                      alt={post.title}
                      src={post.creatives[0]?.file}
                      className="absolute inset-0 h-full w-full rounded-2xl bg-gray-50 object-cover"
                    />
                    <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
                  </div>
                  <div>
                    <div className="group relative max-w-xl">
                      <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                        <a href={post.href}>
                          <span className="absolute inset-0" />
                          {post.title}
                        </a>
                      </h3>
                      <p className="mt-5 text-sm leading-6 text-gray-600">
                        {post.job_location}
                      </p>
                    </div>
                    <div className="mt-6 flex border-t border-gray-900/5 pt-6">
                      <div className="relative flex items-center gap-x-4">
                        <img
                          alt={post?.author?.name}
                          src={post?.author?.imageUrl}
                          className="h-10 w-10 rounded-full bg-gray-50"
                        />
                        <div className="text-sm leading-6">
                          <p className="font-semibold text-gray-900">
                            <a href={post?.author?.href}>
                              <span className="absolute inset-0" />
                              {post?.author?.name}
                            </a>
                          </p>
                          <p className="text-gray-600">{post?.author?.role}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              ))
            ) : (
              <p className="text-center text-gray-500">
                No bookmarks available
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookMarks;
