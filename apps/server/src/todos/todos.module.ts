import { Module } from "@nestjs/common";

import { TodosRouter } from "./todos.router";
import { TodosService } from "./todos.service";

@Module({
	providers: [TodosRouter, TodosService],
})
export class TodosModule {}
