"use client";

import { Box, Button, FormControl, Input, InputLabel, MenuItem, Modal, Paper, Select, Typography } from "@mui/material"
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { useEffect, useState } from "react"
import CloseIcon from '@mui/icons-material/Close';
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { DataTypes, useFinance } from "@/api/finances/page";
import { addTransactionSchema } from "../Schema/page";

interface TransactionModalProps {
    open: boolean;
    onClose: () => void;
    transactionToEdit?: DataTypes | null;
}

export const IncomeModal = ({ open, onClose, transactionToEdit }: TransactionModalProps) => {

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
        if (transactionToEdit) {
            const formattedDate = {
                ...transactionToEdit,
                date: transactionToEdit.date ? transactionToEdit.date.slice(0, 10) : ""
            }
            reset(formattedDate)
        } else {
            reset({ name: "", amount: 0, category: "", method: "", date: ""})
        }
    }, [transactionToEdit, reset, open])



    const handleOnSubmit = (formData: addTransactionSchema) => {
        
        if (transactionToEdit) {
            const fullData = {
                ...transactionToEdit,
                ...formData,
                type: "INCOME"
            }

            updateMutation.mutate({ formData: fullData, id: transactionToEdit.id}, {
                onSuccess: () => {
                    onClose();
                    reset();
                }
            });
        } else {
            const fullData = {
                ...formData,
                type: "INCOME"
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
                        <Typography variant="h5" className="col-span-3">
                            {transactionToEdit ? "Editar entrada" : "Adicionar Entrada"}
                        </Typography>
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
                                        <MenuItem value={"Salário"}>Salário</MenuItem>
                                        <MenuItem value={"Rendimentos"}>Rendimentos</MenuItem>
                                        <MenuItem value={"Renda extra"}>Renda extra</MenuItem>
                                        <MenuItem value={"Férias"}>Férias</MenuItem>
                                        <MenuItem value={"13° Salári"}>13° Salário</MenuItem>
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
                                        <MenuItem value={"Doc"}>Doc</MenuItem>
                                        <MenuItem value={"Ted"}>Ted</MenuItem>
                                        <MenuItem value={"Depósito"}>Depósito</MenuItem>
                                    </Select>
                                )}
                            />

                        </FormControl>
                        <FormControl className="col-span-1">
                            <Input required {...register("date")} id="date" type="date" />
                        </FormControl>
                        <Button className="col-end-4 row-end-9 w-25! h-10!" 
                            type="submit" 
                            variant="contained"
                            disabled={updateMutation.isPending}
                        >
                            Enviar
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </Box>
    )
}

