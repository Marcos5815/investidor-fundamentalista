"use client";

import { useMemo, useState } from "react";
import { useFinance } from "@/api/finances/page";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import { useSearchParams } from "next/navigation";

const formattedValue = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL'
})

export const LastTransactions = ({ ...props }) => {
  const searchParams = useSearchParams()
  const { data, isLoading, error } = useFinance();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  
  const periodFilter = searchParams.get('period');
  const startRangeDate = searchParams.get('start')
  const endRangeDate = searchParams.get('end')

  const filteredData = useMemo(() => {
    if(!data) return []

    if(periodFilter === "last-12-months") {
      const today = new Date();
      const twelveMonthsAgo = new Date();
      twelveMonthsAgo.setFullYear(today.getFullYear() - 1);

      return data.filter((transaction) => {
        const transactionDate = new Date(transaction.date);
        return transactionDate >= twelveMonthsAgo && transactionDate <= today
      })
    }

    if(startRangeDate && endRangeDate) {
      return data.filter((transaction) => {
        return transaction.date >= startRangeDate && transaction.date <= endRangeDate;
      })
    }

    return data.filter((transaction) => {
      if(!periodFilter) return data;
      return transaction.date.startsWith(periodFilter);
    })
  }, [data, periodFilter, startRangeDate, endRangeDate])

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setRowsPerPage(Number(event.target.value));
    setPage(0);
  };

  return (
    <Box {...props}>
      <Box className="flex flex-col justify-start ml-5 mt-3 mb-5">
        <Typography className="font-bold! text-xl!">
          Últimas transações
        </Typography>
        <Typography>Veja suas transações</Typography>
      </Box>
      <TableContainer component={Paper} className="max-h-80.5">
        <Table className="min-w-full" aria-label="Últimas transações">
          <TableHead>
            <TableRow className="bg-gray-200">
              <TableCell className="font-semibold!">Data</TableCell>
              <TableCell className="font-semibold!">Descrição</TableCell>
              <TableCell className="font-semibold!" align="right">
                Valor
              </TableCell>
              <TableCell className="font-semibold!" align="right">
                Método
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {!isLoading &&
              !error &&
              filteredData
                ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((datas) => {
                  return (
                    <TableRow key={datas.id}>
                      <TableCell>
                        {new Date(datas.date).toLocaleDateString("pt-BR")}
                      </TableCell>
                      <TableCell>{datas.name}</TableCell>
                      <TableCell
                        className={`font-[540]! ${datas?.type === "INCOME" ? "text-green-500!" : "text-red-500!"}`}
                        align="right"
                      >
                        {datas?.type === "INCOME" ? "+" : "-"}
                        {formattedValue.format(datas.amount)}
                      </TableCell>
                      <TableCell align="right">{datas.method}</TableCell>
                    </TableRow>
                  );
                })}
          </TableBody>
        </Table>
      </TableContainer>
      <Table>
        <TableBody>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 20]}
              count={filteredData.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              labelRowsPerPage={"Linhas por página"}
              labelDisplayedRows={({ from, to, count }) => {
                return `${from}-${to} de ${count !== -1 ? `${count} transações` : `mais de ${to}`}`;
              }}
            />
          </TableRow>
        </TableBody>
      </Table>
    </Box>
  );
};
