import { useRouter } from 'next/router';
import { useFetchPost } from '../../hooks/useFetchData';
import Head from 'next/head';

function Post() {
	const router = useRouter();
	const { id } = router.query;
	const { data, error } = useFetchPost(
		'https://jsonplaceholder.typicode.com/posts',
		id
	);

	data && console.log(data);

	if (error) return 'An error has occurred.';
	error && console.log(error);
	return (
		<>
			{data && (
				<>
					<Head>
						<title>{data?.title}</title>
						<meta name="description" content={data.body} />
					</Head>

					<h1>{id}</h1>
					<h2>{data.title}</h2>
					<h3>{data.body}</h3>
				</>
			)}
		</>
	);
}

export default Post;
