"use client"
import { Box, Paper, Typography } from "@mui/material"

export const BalanceIncomesExpenses = () => {

    const formattedNumber = new Intl.NumberFormat(
        "pt-BR", {
            style: "currency",
            currency: "BRL"
        }
    )

    return (
        <Box className="flex justify-around mt-20">
            <Box component={Paper} className="w-100 h-30">
                <Typography className="flex justify-start pt-5 pl-4">
                    Saldo
                </Typography>
                <Typography className="flex justify-start pt-5 pl-4 text-3xl! font-bold">
                    {formattedNumber.format(200)}
                </Typography>
            </Box>
            <Box component={Paper} className="w-100 h-30">
                <Typography className="flex justify-start pt-5 pl-4">
                    Entradas
                </Typography>
                <Typography className="flex justify-start pt-5 pl-4 text-3xl! font-bold">
                    {formattedNumber.format(200)}
                </Typography>
            </Box>
            <Box component={Paper} className="w-100 h-30">
                <Typography className="flex justify-start pt-5 pl-4">
                    Saídas
                </Typography>
                <Typography className="flex justify-start pt-5 pl-4 text-3xl! font-bold">
                    {formattedNumber.format(200)}
                </Typography>
            </Box>
        </Box>
    )
}