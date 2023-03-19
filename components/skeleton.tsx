// Source: https://dev.to/jobpick/how-to-create-a-skeleton-loader-in-tailwindcss-38gh
export const LoadingSkeleton = () => {
	return (
		<>
			<div className="scale-75 origin-top-left md:scale-100 w-60 md:w-72 h-24 border-2 rounded-md mx-auto disabled:mt-20">
				<div className="flex animate-pulse flex-row items-center h-full justify-center space-x-5">
					<div className="w-12 bg-gray-300 h-12 rounded-full ">
					</div>
					<div className="flex flex-col space-y-3">
						<div className="w-36 bg-gray-300 h-6 rounded-md ">
						</div>
						<div className="w-24 bg-gray-300 h-6 rounded-md ">
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

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
				<section className="opacity-60">
					<div className="grid gap-8 mx-auto grid-cols-2 ">
						{Array.from(map).map((skeleton, index) => (
							<div key={`skeleton-${skeleton}-${index}`} className={`${skeleton}`}>
								<LoadingSkeleton />
							</div>
						))}
						<LoadingSkeleton />
					</div>
				</section>
			</div>
		</>
	)
}

