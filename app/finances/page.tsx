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
            <AddTransactions />
            <Box className="grid grid-rows-1 grid-cols-3 gap-20 ml-17 mr-17 mt-5">
                <ExpenseByCategory component={Paper} className="col-span-1 mr-9 h-114.5" />
                <LastTransactions component={Paper} className="col-span-2 ml-5 h-114.5" />
            </Box>
        </Box>
    )
}

export default Finances