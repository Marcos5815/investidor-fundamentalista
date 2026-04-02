"use client"
import { Box, Button, Paper, Typography } from "@mui/material";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import SyncAltIcon from "@mui/icons-material/SyncAlt";
import { IncomeModal } from "../modals/IncomeModal/page";

export const AddTransactions = () => {
  return (
    <Box className="flex w-400 justify-around mt-5">
      <Box>
          <IncomeModal />
      </Box>
      <Box component={Paper} className=" w-100 h-20">
        <Button className="flex w-100 h-20 justify-start! gap-3 pl-5!">
          <Box className="flex rounded-md w-10 h-10 justify-center items-center bg-red-100">
            <RemoveCircleOutlineIcon className="text-red-500" />
          </Box>
          <Box className="flex flex-col items-start">
            <Typography>Adicionar despesa</Typography>
            <Typography className="text-[8px]!">
              Adicione as suas despesas
            </Typography>
          </Box>
        </Button>
      </Box>
      <Box component={Paper}  className="w-100 h-20">
        <Button className="flex w-100 h-20 justify-start! gap-3 pl-5!">
          <Box className="flex rounded-md w-10 h-10 justify-center items-center bg-blue-100">
            <SyncAltIcon className="text-blue-500"/>
          </Box>
          <Box className="flex flex-col items-start">
            <Typography>Adicionar transferência</Typography>
            <Typography className="text-[8px]!">
              Adicione quanto dinheiro você transferiu
            </Typography>
          </Box>
        </Button>
      </Box>
    </Box>
  );
};
