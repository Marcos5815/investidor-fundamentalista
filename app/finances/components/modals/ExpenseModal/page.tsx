"use client";

import { Box, Button, FormControl, Input, InputLabel, MenuItem, Modal, Paper, Select, Typography } from "@mui/material"
import { useEffect } from "react"
import CloseIcon from '@mui/icons-material/Close';
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { DataTypes, useFinance } from "@/api/finances/page";
import { addTransactionSchema } from "../Schema/page";

interface ExpenseModalProps {
    open: boolean;
    onClose: () => void;
    transactionToEdit: DataTypes | null;
}

export const ExpenseModal = ({ open, onClose, transactionToEdit }: ExpenseModalProps) => {

    const { mutate, updateMutation } = useFinance()
    const { control, register, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: zodResolver(addTransactionSchema),
        mode: "onChange",
        defaultValues: {
            category: "", 
            method: ""
        }
    })

    useEffect(() => {
        if(transactionToEdit){
            const formattedDate = {
                ...transactionToEdit,
                date: transactionToEdit.date ? transactionToEdit.date.slice(0, 10) : ""
            }
            reset(formattedDate)
        } else {
            reset({ name: "", amount: 0, category: "", method: "", date: ""})
        }
    },[open, reset, transactionToEdit])


    const handleOnSubmit = (formData: addTransactionSchema) => {
        if(transactionToEdit) {

            const fullData = {
                ...transactionToEdit,
                ...formData,
                type: "EXPENSE"
            }

            updateMutation.mutate({formData: fullData, id: transactionToEdit.id},{
                onSuccess: () => {
                    onClose()
                    reset()
                }}
            )
        } else {
            const fullData = {
                ...formData,
                type: "EXPENSE"
            }

            mutate(fullData, {
                onSuccess: () => {
                    onClose()
                    reset()
                },
                onError: (error) => {
                    console.log("Erro ao salvar: ", error)
                }
            })
        }
    }


    return (
        <Box>
            
            <Modal
                open={open}
                onClose={onClose}
                className="flex flex-col justify-center items-center"
            >
                <Box component="form" onSubmit={handleSubmit(handleOnSubmit)} className="w-130 h-150 bg-white text-center">
                    
                    <Box className="flex justify-end ml-5 mt-2">
                        <Button onClick={onClose}><CloseIcon /></Button>
                    </Box>
                    <Box  className="grid grid-rows-2 grid-cols-3 mx-10 gap-10">
                        <Typography variant="h5" className="col-span-3">{transactionToEdit ? "Editar Entrada" : "Adicionar Entrada"}</Typography>
                        <FormControl className="col-span-2">
                            <InputLabel htmlFor="name">Nome</InputLabel>
                            <Input required {...register("name")} autoComplete="off" id="name" />
                            {errors.name && (
                                <Typography variant="caption" color="error">
                                    {errors.name.message}
                                </Typography>
                            )}
                        </FormControl>
                        <FormControl className="col-span-1">
                            <InputLabel htmlFor="amount">Valor R$</InputLabel>
                            <Input required {...register("amount")} id="amount"/>
                            {errors.amount && (
                                <Typography variant="caption" color="error">
                                    {errors.amount.message}
                                </Typography>
                            )}
                        </FormControl>


                        <FormControl variant="filled" className="col-span-2">
                            <InputLabel>Categoria</InputLabel>
                            <Controller
                                name="category"
                                control={control}
                                render={({ field }) => (
                                    <Select
                                        {...field}
                                        label="Categoria"
                                        required
                                    >
                                        <MenuItem value={"Aluguel"}>Aluguel</MenuItem>
                                        <MenuItem value={"Lazer"}>Lazer</MenuItem>
                                        <MenuItem value={"Streaming"}>Streaming</MenuItem>
                                        <MenuItem value={"Veículos"}>Veículos</MenuItem>
                                        <MenuItem value={"13° Salári"}>Contas recorrentes</MenuItem>
                                        <MenuItem value={"Outros"}>Outros</MenuItem>
                                    </Select>
                                )}
                            />
                        </FormControl>
                        <FormControl className="col-span-1" variant="filled">
                            <InputLabel>Método</InputLabel>
                            <Controller 
                                name="method"
                                control={control}
                                render={({ field }) => (
                                    <Select
                                        { ...field }
                                        label="Método"
                                        required
                                    >
                                        <MenuItem value={"pix"}>Pix</MenuItem>
                                        <MenuItem value={"Cartão de crédito"}>Cartão de crédito</MenuItem>
                                        <MenuItem value={"Cartão de débito"}>Cartão de débito</MenuItem>
                                        <MenuItem value={"Dinheiro"}>Dinheiro</MenuItem>
                                    </Select>
                                )}
                            />

                        </FormControl>
                        <FormControl className="col-span-1">
                            <Input required {...register("date")} id="date" type="date" />
                        </FormControl>
                        <Button className="col-end-4 row-end-9 w-25! h-10!" type="submit" variant="contained">Enviar</Button>
                    </Box>
                </Box>
            </Modal>
            
        </Box>
    )
}

