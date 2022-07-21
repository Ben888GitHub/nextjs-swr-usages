import useSWR from 'swr';
import useSWRInfinite from 'swr/infinite';
import axios from 'axios';

const fetchData = async (url) => {
	// const { data } = id ? await axios.get(`${url}/${id}`) : await axios.get(url);
	const { data } = await axios.get(url);

	return data;
};

export const useFetchData = (url, page) => {
	const { data, error } = useSWR(
		url === `https://jsonplaceholder.typicode.com/posts`
			? `${url}?_page=${page}&_limit=${5}`
			: url,
		fetchData,
		{
			refreshInterval: 1000,
			keepPreviousData: true
		}
	);

	return {
		data,
		isLoading: !error && !data,
		error
	};
};

export const useFetchPost = (url, id) => {
	const { data, error } = useSWR([url, id].join('/'), fetchData);

	return {
		data,
		isLoading: !error && !data,
		error
	};
};

export const useInfinitePosts = (url, page) => {
	// console.log(url);

	const { data, error, isValidating, size, setSize } = useSWRInfinite(
		(index) => `${url}?_page=${index + 1}&_limit=${5}`,
		fetchData,
		{
			refreshInterval: 1000,
			keepPreviousData: true
		}
	);

	const posts = data ? [].concat(...data) : [];
	const isLoadingInitialData = !data && !error;
	const isLoadingMore =
		isLoadingInitialData ||
		(size > 0 && data && typeof data[size - 1] === 'undefined');
	const isEmpty = data?.[0]?.length === 0;
	const isReachingEnd = isEmpty || (data && data[data.length - 1]?.length < 5);
	const isRefreshing = isValidating && data && data.length === size;

	return {
		posts,
		error,
		isLoadingMore,
		size,
		setSize,
		isReachingEnd,
		isRefreshing
	};
};
