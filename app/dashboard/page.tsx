import { Box } from "@mui/material";
import { Header } from "./_components/Header/page";
import { FinancesControl } from "./_components/FinancesControl/page";
import { TransactionsControl } from "./_components/TransactionsControl/page";
import { BalancePerBank } from "./_components/BalancePerBank/page";
import { CashFlow } from "./_components/CashFlow/page";
const Dashboard = () => {
  return (
    <Box>
      <Header />
      <Box className="grid grid-cols-3 grid-rows-4 gap-10 mt-3">
        <FinancesControl className="col-span-2" />
        <CashFlow className="row-span-3 col-span-1 ml-10"/>
        <BalancePerBank className="col-span-1"/>
        <TransactionsControl className="col-span-1"/>
      </Box>
    </Box>
  );
};

export default Dashboard;
