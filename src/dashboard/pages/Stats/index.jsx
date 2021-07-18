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
import React, { useEffect, useState } from "react";

import api from "../../services/api";
import { Label, Root } from "./Stats.helpers";

const Stats = () => {
  const [realTime2, setRealTime2] = useState(new Date());
  const [balancesStats, setBalancesStats] = useState({
    balances: {
      ucana: 0,
      ucane: 0,
      ucanu: 0,
    },
  });
  const [transactedAmount, setTransactedAmount] = useState([
    {
      x: 0,
      ucanaTransactedAmount: 0,
      ucanuTransactedAmount: 0,
      ucaneTransactedAmount: 0
    }
  ]);

  const fetchStats = async () => {
    console.log("Actualizou");
    try {
      const { data } = await api.get("/stats");
      setBalancesStats(data || {});
    } catch (error) { }
  };

  const fetchTransactedAmountStats = async () => {
    console.log("Actualizou AMOUNTS");
    try {
      const { data } = await api.get("/exchangeMarketMoviment");
      console.log(data.exchangeMarketMovement);
      setTransactedAmount( data.exchangeMarketMovement || [] );
    } catch (error) { }
  };

  /**
  useEffect(() => {
    setTimeout(() => {
      fetchTransactedAmountStats();
      setRealTime(new Date());
    }, 30000);
  }, [realTime]);
   */

  useEffect(() => {
    fetchTransactedAmountStats();
  }, []);

  return (
    <>
      <Paper>
        <Chart data={transactedAmount || []} >
          <ArgumentAxis />
          <ValueAxis />

          <LineSeries
            name="UCANA"
            valueField="ucanaTransactedAmount"
            argumentField="x"
            color="#5f27cd"
          />
          <LineSeries
            name="UCANE"
            valueField="ucaneTransactedAmount"
            argumentField="x"
            color="#ee5253"
          />
          <LineSeries
            name="UCANU"
            valueField="ucanuTransactedAmount"
            argumentField="x"
            color="#10ac84"
          />
          <Animation />
          <Legend position="bottom" rootComponent={Root} labelComponent={Label} />
          <Title text="Moedas Transacionadas por segundos" />
          <Stack />
        </Chart>
      </Paper>
      {/**
      <div className="container p-5" style={{ maxWidth: "700px" }}>
        <div className="card shadow-sm p-5 text-center">
          <p className="h5 mb-3 text-center font-weight-bold">PATRIMÓNIO TOTAL</p>
          <p>Preço por token:</p>
          <table className="table table-borderless text-center">
            <thead>
              <tr>
                <th scope="col">UCANA Token</th>
                <th scope="col">UCANE Token</th>
                <th scope="col">UCANU Token</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="h4 font-weight-bold">
                  {balancesStats.balances.ucana.price || 0}
                </td>
                <td className="h4 font-weight-bold">
                  {balancesStats.balances.ucane.price || 0}
                </td>
                <td className="h4 font-weight-bold">
                  {balancesStats.balances.ucanu.price || 0}
                </td>
              </tr>
            </tbody>
          </table>
          <p className="mt-5">Fórmula para cálculo do património:</p>
          <p className="h4 font-weight-bold">
            num. token + valor (unid) / burned
          </p>
        </div>
      </div>
     */}
    </>
  );
};

export default Stats;
