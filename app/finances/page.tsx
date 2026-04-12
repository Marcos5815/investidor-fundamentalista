"use client"
import { Box, Paper } from "@mui/material"
import { Header } from "./components/Header/page"
import { BalanceIncomesExpenses } from "./components/BalanceIncomesExpenses/page"
import { AddTransactions } from "./components/AddTransactions/page"
import { ExpenseByCategory } from "./components/ExpensesByCategory/page"
import { LastTransactions } from "./components/LastTransactions/page"

const Finances = () => {
    return (
        <Box>
            <Header />
            <BalanceIncomesExpenses />
            <Box className="flex justify-around mt-10">
                <ExpenseByCategory component={Paper} className="w-114" />
                <Box className="flex flex-col gap-10">
                    <AddTransactions className=""/>
                    <LastTransactions component={Paper} className="" />
                </Box>
            </Box>
        </Box>
    )
}

export default Finances