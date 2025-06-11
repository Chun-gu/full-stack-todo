import { Module } from "@nestjs/common";
import { TRPCModule } from "nestjs-trpc";

import { TodosModule } from "./todos/todos.module";

@Module({
	imports: [
		// 지정한 경로에 trpc 라우터 파일을 자동 생성
		TRPCModule.forRoot({ autoSchemaFile: "../../packages/trpc/src/server" }),
		TodosModule,
	],
	controllers: [],
	providers: [],
})
export class AppModule {}
