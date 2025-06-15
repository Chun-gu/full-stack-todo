"use client";

import { trpc } from "../trpc/client";

const HomePage = () => {
	const { data } = trpc.todos.getAllTodos.useQuery();

	console.log("Todos:", data);

	return <div className="text-3xl font-bold underline">Home </div>;
};

export default HomePage;
