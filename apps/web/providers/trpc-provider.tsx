"use client";

import { QueryClientProvider } from "@tanstack/react-query";

import { queryClient, trpc, trpcClient } from "../trpc/client";

import type { PropsWithChildren } from "react";

export const TRPCProvider = ({ children }: PropsWithChildren) => {
	return (
		<trpc.Provider client={trpcClient} queryClient={queryClient}>
			<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
		</trpc.Provider>
	);
};
