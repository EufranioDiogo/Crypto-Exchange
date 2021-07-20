import {
    Box,
    Button,
    CircularProgress,
    TextField,
    Typography,
} from "@material-ui/core";
import React from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";

import api from "../../services/api";

const Exchange = () => {
    const route = useHistory();
    const [submting, setSubmting] = useState(false);
    const [formValues, setFormValue] = useState({
        idEstudante: "",
        nome: "",
        sobrenome: "",
    });

    const registerStudent = async() => {
        if (submting) return;
        try {
            setSubmting(true);
            const response = await api.post("/register", formValues);
            alert(JSON.stringify(response.data));
            toast.success("Estudante cadastrado com sucesso!");
            route.push("/dashboard");
        } catch (error) {
            toast.error(`Ocorreu um erro ao salvar estudante: ${error.message}`);
        } finally {
            setSubmting(false);
        }
    };

    const handleSubmit = () => {
        if (!formValues.idEstudante ||
            !formValues.nome ||
            !formValues.sobrenome
        ) {
            toast.warning("Todos os campos são obrigatórios!");
            return;
        }

        registerStudent();
    };

    return ( <
        Box p = { 5 }
        className = "container"
        maxWidth = "600px" >
        <
        Typography className = "mt-5 text-center"
        variant = "h4" >
        Criar conta na UCAN Exchange <
        /Typography>

        <
        Box className = "my-5 form-group" >
        <
        Box className = "form-row" >
        <
        TextField required fullWidth id = "idEstudante"
        label = "ID de Estudante"
        variant = "filled"
        value = { formValues.idEstudante }
        onChange = {
            (value) =>
            setFormValue((prev) => ({...prev, idEstudante: value.target.value }))
        }
        /> < /
        Box > <
        Box className = "my-3 form-row" >
        <
        TextField required fullWidth id = "nome"
        label = "Nome do Estudante"
        variant = "filled"
        value = { formValues.nome }
        onChange = {
            (value) =>
            setFormValue((prev) => ({...prev, nome: value.target.value }))
        }
        /> < /
        Box > <
        Box className = "mb-5 form-row" >
        <
        TextField required fullWidth id = "sobrenome"
        label = "Sobrenome"
        variant = "filled"
        value = { formValues.sobrenome }
        onChange = {
            (value) =>
            setFormValue((prev) => ({...prev, sobrenome: value.target.value }))
        }
        /> < /
        Box > {
            submting ? < CircularProgress size = "small" / > :
                <
                Button
            fullWidth
            color = "secondary"
            variant = "contained"
            onClick = { handleSubmit } >
            Submeter Dados <
            /Button>
        } <
        /Box> < /
        Box >
    );
};

export default Exchange;