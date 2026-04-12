"use client"

import { AddTansactionSchema } from "@/app/finances/components/modals/IncomeModal/schema";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { v4 as uuidv4 } from 'uuid';

const BASE_URL = "http://localhost:5000/finances_transactions";

interface DataTypes {
  id: string;
  name: string;
  date: string;
  amount: number;
  type: "INCOME" | "EXPENSE";
  category: string;
  method: string;
  createdAt: string;
  editedAt?: string;
}



export const useFinance = (filterDate?: string) => {
  const queryClient = useQueryClient();

  const fetchTransactions = async (date? : string): Promise<DataTypes[]> => {
    const response = await axios.get(BASE_URL, {
      params: {date: date || undefined}
    });
    return response.data
  };

  const postTransactions = async (formData: AddTansactionSchema): Promise<DataTypes> => {
    const response = await axios.post(BASE_URL, {       
        id: uuidv4(),
        ...formData,
        createdAt: new Date().toISOString()
        
    })
    return response.data
  }

  const query  = useQuery({
    queryKey: ["transactions", filterDate],
    queryFn: () => fetchTransactions(filterDate),
  });


  const mutation = useMutation({
    
    mutationKey: ["mutateTransactions"],
    mutationFn: postTransactions,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transactions"]})
    }
  })

  return {
    ...query,
    mutate: mutation.mutate,
    isPending: mutation.isPending,
    mutation

  }
};
