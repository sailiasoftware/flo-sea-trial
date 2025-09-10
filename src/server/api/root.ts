import { createCallerFactory, createTRPCRouter } from "@/server/api/trpc";
import { activityRouter } from "./routers/activity";
import { bookingRouter } from "./routers/booking";
import { ressourceRouter } from "./routers/ressource";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
	activity: activityRouter,
	ressource: ressourceRouter,
	booking: bookingRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
