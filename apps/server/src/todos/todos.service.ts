import { Injectable, NotFoundException } from "@nestjs/common";

import type { CreateTodoInput, Todo } from "./todos.schema";

@Injectable()
export class TodosService {
	private todos: Array<Todo> = [];

	getTodoById(id: string): Todo {
		const todo = this.todos.find((todo) => todo.id === id);
		if (todo === undefined) {
			throw new NotFoundException(`Todo with id ${id} not found`);
		}

		return todo;
	}

	getAllTodos(): Array<Todo> {
		return this.todos;
	}

	createTodo(todoData: CreateTodoInput): Todo {
		const todo: Todo = {
			id: crypto.randomUUID(),
			...todoData,
			createdAt: new Date().toISOString(),
		};
		this.todos.push(todo);

		return todo;
	}

	updateTodo(id: string, data: Partial<CreateTodoInput>): Todo {
		const idx = this.todos.findIndex((todo) => todo.id === id);
		if (idx === -1) {
			throw new NotFoundException(`Todo with id ${id} not found`);
		}

		this.todos[idx] = {
			...this.todos[idx],
			...data,
		};

		return this.todos[idx];
	}

	deleteTodo(id: string) {
		const idx = this.todos.findIndex((todo) => todo.id === id);
		if (idx === -1) {
			throw new NotFoundException(`Todo with id ${id} not found`);
		}

		this.todos.splice(idx, 1);

		return true;
	}
}
