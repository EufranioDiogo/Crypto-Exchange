import { Animation, Stack } from '@devexpress/dx-react-chart';
import {
    ArgumentAxis,
    LineSeries,
    Chart,
    Legend,
    Title,
    ValueAxis
} from '@devexpress/dx-react-chart-material-ui';
import Paper from '@material-ui/core/Paper';
import { toast } from "react-toastify";
import React, { useCallback, useEffect, useState } from "react";

import api from "../../services/api";
import { Label, Root } from "./Stats.helpers";

const Stats = () => {
    const [realTime, setRealTime] = useState(null);
    const [balancesStats, setBalancesStats] = useState({
        balances: {
            ucana: 0,
            ucane: 0,
            ucanu: 0,
        },
    });
    const [transactedAmount, setTransactedAmount] = useState([]);

    const fetchStats = async() => {
        console.log("Actualizou");
        try {
            const { data } = await api.get("/stockExchange");
            setBalancesStats(data || {});
        } catch (error) {}
    };

    const fetchTransactedAmountStats = useCallback(async() => {
        console.log("Actualizou AMOUNTS", realTime);
        try {
            const { data } = await api.get("/exchangeMarketMoviment");
            setTransactedAmount(data.exchangeMarketMovement || []);
        } catch (error) {
            toast.error(`Ocorreu um erro ao carregar dados: ${error.message}`);
        }
    }, [realTime]);

    useEffect(() => {
        if (!realTime)
            fetchTransactedAmountStats();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        // update in 1min
        setTimeout(() => {
            fetchTransactedAmountStats();
            setRealTime(new Date());
        }, 20000);
    }, [fetchTransactedAmountStats, realTime]);

    return ( <
        >
        <
        Paper >
        <
        Chart data = { transactedAmount || [] } >
        <
        ArgumentAxis / >
        <
        ValueAxis / >

        <
        LineSeries name = "UCANA"
        valueField = "ucanaTransactedAmount"
        argumentField = "x"
        color = "#5f27cd" /
        >
        <
        LineSeries name = "UCANE"
        valueField = "ucaneTransactedAmount"
        argumentField = "x"
        color = "#ee5253" /
        >
        <
        LineSeries name = "UCANU"
        valueField = "ucanuTransactedAmount"
        argumentField = "x"
        color = "#10ac84" /
        >
        { transactedAmount && transactedAmount.length && < Animation / > }

        <
        Legend position = "bottom"
        rootComponent = { Root }
        labelComponent = { Label }
        /> <
        Title text = "Moedas Transacionadas por segundos" / >
        <
        Stack / >
        <
        /Chart> < /
        Paper > <
        div className = "container p-5"
        style = {
            { maxWidth: "700px" }
        } >
        <
        div className = "card shadow-sm p-5 text-center" >
        <
        p className = "h5 mb-3 text-center font-weight-bold" > PATRIMÓNIO TOTAL < /p> <
        p > Preço por token: < /p> <
        table className = "table table-borderless text-center" >
        <
        thead >
        <
        tr >
        <
        th scope = "col" > UCANA Token < /th> <
        th scope = "col" > UCANE Token < /th> <
        th scope = "col" > UCANU Token < /th> < /
        tr > <
        /thead> <
        tbody >
        <
        tr >
        <
        td className = "h4 font-weight-bold" > { balancesStats.balances.ucana || 0 } <
        /td> <
        td className = "h4 font-weight-bold" > { balancesStats.balances.ucane || 0 } <
        /td> <
        td className = "h4 font-weight-bold" > { balancesStats.balances.ucanu || 0 } <
        /td> < /
        tr > <
        /tbody> < /
        table > <
        p className = "mt-5" > Fórmula para cálculo do património: < /p> <
        p className = "h4 font-weight-bold" >
        num.token + valor(unid) / burned <
        /p> < /
        div > <
        /div> < / >
    );
};

export default Stats;