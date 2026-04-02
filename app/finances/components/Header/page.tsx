"use client"
import { Box, Button, Typography } from "@mui/material";

export const Header = () => {
  return (
    <Box className="flex w-400 ml-7 justify-between items-center">
      <Typography variant="h4">Controle financeiro</Typography>
      <Box>
        <Button variant="outlined">Este mês</Button>
        <Button variant="outlined">Último mês</Button>
        <Button variant="outlined">Este ano</Button>
        <Button variant="outlined">Últimos 12 meses</Button>
        <Button variant="outlined">Selecione um período</Button>
      </Box>
    </Box>
  );
};
