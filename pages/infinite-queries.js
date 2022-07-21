import Link from 'next/link';
import { useState } from 'react';
import { useInfinitePosts } from '../hooks/useFetchData';

function InfiniteQueries() {
	const [page, setPage] = useState(1);
	const {
		posts,
		error,
		isLoadingMore,
		size,
		setSize,
		isReachingEnd,
		isRefreshing
	} = useInfinitePosts('https://jsonplaceholder.typicode.com/posts', page);

	return (
		<div>
			<h1>SWR Infinite Query</h1>
			<br />
			{posts &&
				posts?.map((post) => (
					<div key={post.id}>
						<Link href={`/post/${post.id}`}>
							<h2>{post.title}</h2>
						</Link>
						<p>{post.body}</p>
					</div>
				))}
			<button
				disabled={isLoadingMore || isReachingEnd}
				onClick={() => setSize(size + 1)}
			>
				{isLoadingMore
					? 'loading...'
					: isReachingEnd
					? 'no more issues'
					: 'load more'}
			</button>
		</div>
	);
}

export default InfiniteQueries;
