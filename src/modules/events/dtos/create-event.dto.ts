import { z } from "zod"

export const createEventSchema = z.object({
    title: z.string().min(3),
    description: z.string().min(10),
    category: z.string().min(3),
    date: z.iso.datetime(),
    location: z.string().min(3),
    price: z.number().int().positive(),
    totalTickets: z.number().int().positive(),
})

export type CreateEventDTO = z.infer<typeof createEventSchema>