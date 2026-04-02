"use client"
import { useFinance } from "@/api/finances/page"
import { Box, Typography } from "@mui/material"


export const FinancesControl = ({...props}) => {

    const { data, isLoading, error } = useFinance()
    let income = 0;
    let expense = 0;
    const formatedValue = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL'})
    data?.map((datas) => {
        if(!isLoading && !error && datas.type === "INCOME"){
            return income = income + datas.amount
        } else if (!isLoading && !error && datas.type === "EXPENSE") {
            return expense = expense + datas.amount
        }
    })

    console.log(income)
    return (
        <Box {...props}>
            <Box className = "border w-300 h-100 rounded-xl flex items-center justify-around">
                <Box className = "border w-[15%] h-[85%] rounded-xl flex flex-col justify-center items-center gap-3">
                    <Box className="border w-[95%] h-[30%] rounded-xl pl-5 pt-2">
                        <Typography>Receita:</Typography>
                        <Typography className="pl-2">{formatedValue.format(income)}</Typography>
                    </Box>              
                    <Box className="border w-[95%] h-[30%] rounded-xl pl-5 pt-2">
                        <Typography>Despesas:</Typography>
                        <Typography className="pl-2">{formatedValue.format(expense)}</Typography>    
                    </Box>              
                    <Box className="border w-[95%] h-[30%] rounded-xl pl-5 pt-2">Test</Box>              
                </Box>
                <Box className = "border rounded-xl h-[85%] w-[70%]">

                </Box>
                <Box className = "border rounded-xl h-[85%] w-[10%]">

                </Box>

            </Box>
        </Box>
    )
}