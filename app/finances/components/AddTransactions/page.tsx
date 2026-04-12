"use client"
import { Box } from "@mui/material";
import { IncomeModal } from "../modals/IncomeModal/page";
import { ExpenseModal } from "../modals/ExpenseModal/page";

export const AddTransactions = ({ ...props }) => {
  return (
    <Box {...props}>
      <Box className="flex">
          <Box className="ml-3">
            <IncomeModal />
        </Box>
        <Box className="ml-4">
            <ExpenseModal />
        </Box>
      </Box>
    </Box>
  );
};
