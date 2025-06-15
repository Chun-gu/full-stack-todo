import { QueryClient } from "@tanstack/react-query";
import { createTRPCReact, httpBatchLink } from "@trpc/react-query";

import type { AppRouter } from "@repo/trpc/router";
import type { CreateTRPCReact } from "@trpc/react-query";

export const trpc: CreateTRPCReact<AppRouter, object> = createTRPCReact<
	AppRouter,
	object
>();

export const trpcClient = trpc.createClient({
	links: [
		httpBatchLink({
			url: process.env.NEXT_PUBLIC_TRPC_URL!,
		}),
	],
});

export const queryClient = new QueryClient();
