"use client"

import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const BASE_URL = "http://localhost:5000/finances_transactions";

interface DataTypes {
  id: number;
  name: string;
  date: string;
  amount: number;
  description: string;
  type: "INCOME" | "EXPENSE";
  category: string;
  method: string;
  createdAt: string;
  editedAt: string;
}


export const useFinance = () => {
  const fetchTransactions = async (): Promise<DataTypes[]> => {
    const response = await axios.get(BASE_URL);
    return response.data
  };

  const query  = useQuery({
    queryKey: ["transactions"],
    queryFn: fetchTransactions,
  });

  return (
    query
  )
};
