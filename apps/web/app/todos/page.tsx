import { CreateTodoForm } from "./create-todo-form";
import { TodoList } from "./todo-list";

const TodosPage = () => {
	return (
		<main className="container mx-auto p-4">
			<div className="max-w-2xl mx-auto">
				<h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
					Todos
				</h1>
				<div className="mb-8">
					<CreateTodoForm />
				</div>
				<TodoList />
			</div>
		</main>
	);
};

export default TodosPage;
