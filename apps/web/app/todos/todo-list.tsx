"use client";

import { trpc } from "../../trpc/client";

export const TodoList = () => {
	const { data: todos } = trpc.todos.getAllTodos.useQuery();
	const trpcUtils = trpc.useUtils();

	const toggleCompletion = trpc.todos.updateTodo.useMutation({
		onSuccess: () => {
			// Optionally, you can refetch the todos or update the UI after toggling completion
			console.log("Todo completion toggled successfully");
			trpcUtils.todos.getAllTodos.invalidate();
		},
		onError: (error) => {
			console.error("Error toggling todo completion:", error);
		},
	});

	const deleteTodo = trpc.todos.deleteTodo.useMutation({
		onSuccess: () => {
			// Optionally, you can refetch the todos or update the UI after deletion
			console.log("Todo deleted successfully");
			trpcUtils.todos.getAllTodos.invalidate();
		},
		onError: (error) => {
			console.error("Error deleting todo:", error);
		},
	});

	return (
		<ol className="space-y-4">
			{todos?.map((todo) => (
				<li
					key={todo.id}
					className="p-4 bg-white rounded-lg shadow-md flex items-center justify-between"
				>
					<div className="flex-1">
						<h3 className="text-lg font-bold text-gray-800">{todo.name}</h3>
						<p className="text-sm text-gray-600">{todo.description}</p>
						<div className="mt-2 flex items-center gap-x-4">
							<span className="text-xs text-gray-500">
								Due:{" "}
								{todo.dueDate
									? new Date(todo.dueDate).toLocaleDateString()
									: "No due date"}
							</span>
							<span
								className={`px-2 py-1 text-xs font-semibold rounded-full ${
									todo.completed
										? "bg-green-100 text-green-800"
										: "bg-yellow-100 text-yellow-800"
								}`}
							>
								Status: {todo.completed ? "Completed" : "Pending"}
							</span>
						</div>
					</div>
					<div className="flex items-center gap-x-2">
						<button
							onClick={() =>
								toggleCompletion.mutate({
									id: todo.id,
									data: { completed: !todo.completed },
								})
							}
							className="px-3 py-1.5 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
						>
							{todo.completed ? "Mark as Pending" : "Mark as Completed"}
						</button>

						<button
							onClick={() => deleteTodo.mutate({ id: todo.id })}
							className="px-3 py-1.5 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
						>
							Delete
						</button>
					</div>
				</li>
			))}
		</ol>
	);
};
