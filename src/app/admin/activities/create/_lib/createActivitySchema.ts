import z from "zod";
import { zfd } from "zod-form-data";

export const createActivitySchema = zfd.formData({
	name: zfd.text(z.string().min(1, { message: "Name is required" })),
	ressources: z.array(z.object({ id: z.string(), quantity: z.number() })),
});
