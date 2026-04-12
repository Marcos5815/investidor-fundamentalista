"use client";

import { Box, Button, FormControl, Input, InputLabel, MenuItem, Modal, Paper, Select, Typography } from "@mui/material"
import { useState } from "react"
import CloseIcon from '@mui/icons-material/Close';
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFinance } from "@/api/finances/page";
import { AddTansactionSchema, addTansactionSchema } from "../Schema/page";
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';

export const ExpenseModal = () => {

    const { mutate } = useFinance()
    const { control, register, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: zodResolver(addTansactionSchema),
        mode: "onChange",
        defaultValues: {
            category: "",
            method: ""
        }
    })

    const [open, setOpen] = useState(false)
    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)


    const handleOnSubmit = (formData: AddTansactionSchema) => {
        const fullData = {
            ...formData,
            type: "EXPENSE"
        }

        mutate(fullData, {
            onSuccess: () => {
                handleClose();
                reset()
            },
            onError: (error) => {
                console.log("Erro ao salvar: ", error)
            }
        })
    }


    return (
        <Box>
            <Box component={Paper} className="w-100 h-20">
                <Button onClick={handleOpen} className="flex w-100 h-20 justify-start! gap-3 pl-5!">
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
                <Modal
                    open={open}
                    onClose={handleClose}
                    className="flex flex-col justify-center items-center"
                >
                    <Box component="form" onSubmit={handleSubmit(handleOnSubmit)} className="w-130 h-150 bg-white text-center">
                        
                        <Box className="flex justify-end ml-5 mt-2">
                            <Button onClick={handleClose}><CloseIcon /></Button>
                        </Box>
                        <Box  className="grid grid-rows-2 grid-cols-3 mx-10 gap-10">
                            <Typography variant="h5" className="col-span-3">Adicionar Entrada</Typography>
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
        </Box>
    )
}

