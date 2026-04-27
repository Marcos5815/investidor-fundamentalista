"use client"

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { v4 as uuidv4 } from 'uuid';
import { addTransactionSchema } from '../../app/finances/components/modals/Schema/page';
import { DataTypesMethodCategory } from "../methodCategory/page";

const BASE_URL = "http://localhost:5000/finances_transactions";

export interface DataTypes {
  id: string;
  name: string;
  date: string;
  amount: number;
  type: "INCOME" | "EXPENSE";
  category: string;
  method: string;
  createdAt: string;
  editedAt?: string;
  methodCategory: DataTypesMethodCategory[];
}



export const useFinance = (filterDate?: string) => {
  const queryClient = useQueryClient();

  const fetchTransactions = async (date? : string): Promise<DataTypes[]> => {
    try {
      const response = await axios.get(BASE_URL, {
        params: {date: date || undefined}
      });
      return response.data
    } catch (error) {
      console.log("error ao buscar os dados: ", error)
      throw error
    }
  };

  const postTransactions = async (formData: addTransactionSchema): Promise<DataTypes> => {
    try{
      const response = await axios.post(BASE_URL, {       
        id: uuidv4(),
        ...formData,
        createdAt: new Date().toISOString()
          
      })
      return response.data
      } catch (error) {
        console.log("Erro ao cadastrar os dados: ", error)
        throw error
      }
  }

  const deleteTransaction = async (id: string) => {
    try {
      await axios.delete(`${BASE_URL}/${id}`)
      fetchTransactions();
    } catch(error) {
      console.log("erro ao deletar: ", error)
      throw error
    }
  }

  const updateTransaction = async(formData: addTransactionSchema, id: string): Promise<DataTypes> => {
    try {
      const response = await axios.put(`${BASE_URL}/${id}`, {
        ...formData,
        editedAt: new Date().toISOString()
      })

      return response.data
    } catch (error) {
      console.log("Erro ao atualizar os dados: ", error)
      throw error
    }
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

  const deleteMutation = useMutation({
    
    mutationKey: ["deleteTransactions"],
    mutationFn: (id: string) => deleteTransaction(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transactions"]})
    }
  })

  const updateMutation = useMutation({
    mutationKey: ["updateTransaction"],
    mutationFn: ({ formData, id }: { formData: addTransactionSchema; id: string }) => 
      updateTransaction(formData, id),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ["transactions"]})
    }
  })

  return {
    ...query,
    mutate: mutation.mutate,
    isPending: mutation.isPending,
    deleteTransaction: deleteMutation.mutate,
    isDeleting: deleteMutation.isPending,
    isUpdating: updateMutation.isPending,
    updateTransaction: updateMutation.mutate,
    updateMutation,
    deleteMutation,
    mutation

  }
};
