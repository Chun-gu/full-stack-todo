"use client";

import { useState } from "react";
import { trpc } from "../../trpc/client";
import { createTodoSchema } from "../../../server/src/todos/todos.schema";
import { z } from "zod";

const today = new Date().toISOString().split("T")[0]!;

export const CreateTodoForm = () => {
	const [name, setName] = useState("");
	const [description, setDescription] = useState("");
	const [completed, setCompleted] = useState(false);
	const [dueDate, setDueDate] = useState<string>(today);
	const [priority, setPriority] = useState<"low" | "medium" | "high" | "">("");
	const [errors, setErrors] = useState<z.ZodError | null>(null);

	const trpcUtils = trpc.useUtils();

	const createTodoMutation = trpc.todos.createTodo.useMutation({
		onSuccess: () => {
			console.log("Todo created successfully");
			trpcUtils.todos.getAllTodos.invalidate();
		},
		onError: () => {
			console.error("Error creating todo");
		},
	});

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		const result = createTodoSchema.safeParse({
			name,
			description,
			completed,
			dueDate: dueDate ? dueDate : undefined,
			priority: priority ? priority : undefined,
		});

		if (!result.success) {
			setErrors(result.error);
			return;
		}

		createTodoMutation.mutate(result.data);

		setName("");
		setDescription("");
		setCompleted(false);
		setDueDate(today);
		setPriority("medium");
		setErrors(null);
	};

	return (
		<div className="p-4 bg-white rounded-lg shadow-md">
			<h2 className="text-2xl font-bold mb-4 text-gray-800">
				Create a New Todo
			</h2>
			<form onSubmit={handleSubmit} className="space-y-4">
				<div>
					<label
						htmlFor="todo-name"
						className="block text-sm font-medium text-gray-700"
					>
						Name
					</label>
					<input
						type="text"
						name="name"
						id="todo-name"
						value={name}
						onChange={(e) => setName(e.target.value)}
						className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
					/>
					{errors?.formErrors.fieldErrors.name && (
						<p className="text-red-500 text-xs">
							{errors.formErrors.fieldErrors.name[0]}
						</p>
					)}
				</div>

				<div>
					<label
						htmlFor="todo-description"
						className="block text-sm font-medium text-gray-700"
					>
						Description
					</label>
					<textarea
						name="description"
						id="todo-description"
						value={description}
						onChange={(e) => setDescription(e.target.value)}
						className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
					/>
				</div>

				<div className="flex items-center">
					<input
						type="checkbox"
						name="completed"
						id="todo-completed"
						checked={completed}
						onChange={(e) => setCompleted(e.target.checked)}
						className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
					/>
					<label
						htmlFor="todo-completed"
						className="ml-2 block text-sm text-gray-900"
					>
						Completed
					</label>
				</div>

				<div>
					<label
						htmlFor="todo-dueDate"
						className="block text-sm font-medium text-gray-700"
					>
						Due Date
					</label>
					<input
						type="date"
						name="dueDate"
						id="todo-dueDate"
						value={dueDate}
						onChange={(e) => setDueDate(e.target.value)}
						className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
					/>
				</div>

				<div>
					<label
						htmlFor="todo-priority"
						className="block text-sm font-medium text-gray-700"
					>
						Priority
					</label>
					<select
						name="priority"
						id="todo-priority"
						value={priority}
						onChange={(e) =>
							setPriority(e.target.value as "low" | "medium" | "high")
						}
						className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
					>
						<option value="">Optional</option>
						<option value="low">Low</option>
						<option value="medium">Medium</option>
						<option value="high">High</option>
					</select>
				</div>

				<button
					type="submit"
					disabled={createTodoMutation.isPending}
					className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
				>
					{createTodoMutation.isPending ? "Creating..." : "Create Todo"}
				</button>
			</form>
		</div>
	);
};
