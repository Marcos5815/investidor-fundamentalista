"use client"

import * as z from "zod"; 


export const addTransactionSchema = z.object({
    name: z.string().min(3, "o texto deve ter no mínimo 3 caracteres"),
    amount: z.preprocess((val) => (typeof val === "string" ? val.replace(",", "."): val),
        z.coerce.number().positive("O valor deve ser maior que zero")),
    category: z.string(),
    method: z.string(),
    date: z.coerce.date(),
    methodCategory: z.array(z.any()).default([]).optional()
})

export type addTransactionSchema = z.infer<typeof addTransactionSchema>