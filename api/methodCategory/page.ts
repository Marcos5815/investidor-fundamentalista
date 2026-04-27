import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import { uuidv4 } from "zod"

const BASE_URL = "http://localhost:5000/methodCategory"

export interface DataTypesMethodCategory {
    "id": string,
    "category"?: string,
    "isCategory": boolean,
    "method"?: string,
    "type": "INCOME" | "EXPENSE" 
}

export const useMethodCategory = () => {

    const queryClient = useQueryClient()

    const fetchData = async (): Promise<DataTypesMethodCategory[]> => {
        try {
            const response = await axios.get(BASE_URL)
            return response.data
        } catch (error) {
            console.log("erro ao buscar dados no useMethodCategory: ", error)
            throw error
        }
    }

    const query = useQuery({
        queryKey: ["fetchData"],
        queryFn: fetchData
    })

    const addData = async (formData: DataTypesMethodCategory): Promise<DataTypesMethodCategory> => {
        try {
            const response = await axios.post(BASE_URL, {
                id: uuidv4(),
                ...formData
            })
            return response.data
        } catch (error) {
            console.log("Erro ao criar dados: ",error)
            throw error
        }
    } 

    const mutation = useMutation({
        mutationKey: ["mutation"],
        mutationFn: addData,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["fetchData"]})
        }
    })

    const deleteData = async (id: string) => {
        try {
            return await axios.delete(`${BASE_URL}/${id}`)
        } catch (error) {
            console.log("Erro ao Deletar: ", error)
        }
    }

    const deleteMutation = useMutation({
        mutationKey: ["deleteMutation"],
        mutationFn: (id: string) => deleteData(id),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["fetchData"]})
        }
    })

    return {
        ...query,
        mutateMethodCategory: mutation.mutate,
        isPendindMethodCategory: mutation.isPending,
        deleteMethodCategory: deleteMutation.mutate,
        isDeletingMethodCategory: deleteMutation.isPending,
        mutation,
        deleteMutation
    }
}