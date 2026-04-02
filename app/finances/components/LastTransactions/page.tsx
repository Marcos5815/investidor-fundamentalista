"use client";

import { useState } from "react";
import { useFinance } from "@/api/finances/page";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";

export const LastTransactions = ({ ...props }) => {
  const { data, isLoading, error } = useFinance();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

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
              data
                ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((datas) => {
                  return (
                    <TableRow key={datas.id}>
                      <TableCell>
                        {new Date(datas.date).toLocaleDateString("pt-BR")}
                      </TableCell>
                      <TableCell>{datas.name}</TableCell>
                      <TableCell
                        className={`font-[540]! ${datas?.type === "INCOME" ? "text-green-500!" : "text-red-500"}`}
                        align="right"
                      >
                        {datas?.type === "INCOME" ? "+R$ " : "-R$ "}
                        {datas.amount}
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
              count={data?.length ?? 0}
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
