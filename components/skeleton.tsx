// Source: https://dev.to/jobpick/how-to-create-a-skeleton-loader-in-tailwindcss-38gh
export const LoadingSkeleton = () => {
  return (
    <>
      <div className="mx-auto aspect-video w-72 origin-top-left scale-75 rounded-md border-2 opacity-25 transition-opacity disabled:mt-20 md:w-72 md:scale-100">
        <div className="flex h-full animate-pulse flex-row items-center justify-center space-x-5 transition-opacity">
          <div className="h-12 w-12 rounded-full bg-gray-300 "></div>
          <div className="flex flex-col space-y-3">
            <div className="h-6 w-36 rounded-md bg-gray-300 "></div>
            <div className="h-6 w-24 rounded-md bg-gray-300 "></div>
          </div>
        </div>
      </div>
    </>
  );
};

export const SkeletonLayout = () => {
  const map = new Map([
    [1, 2],
    [2, 4],
    [3, 8],
    [4, 2],
    [5, 4],
    [6, 8],
    [7, 8],
  ]);
  return (
    <>
      <div className="space-y-12">
        <section className="">
          <div className="mx-auto grid grid-cols-2 gap-y-2 ">
            {Array.from(map).map((skeleton, index) => (
              <div
                key={`skeleton-${skeleton}-${index}`}
                className={`${skeleton}`}
              >
                <LoadingSkeleton />
              </div>
            ))}
            <LoadingSkeleton />
          </div>
        </section>
      </div>
    </>
  );
};
