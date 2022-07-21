import useSWR from 'swr';
import axios from 'axios';

const fetchData = async (url, id) => {
	// const { data } = id ? await axios.get(`${url}/${id}`) : await axios.get(url);
	const { data } = await axios.get(url);
	console.log(data);
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
