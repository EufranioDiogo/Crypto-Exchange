import React, { useEffect, useState } from "react";

import api from "../../services/api";

const Stats = () => {
  const [realTime, setRealTime] = useState(new Date());
  const [stats, setStats] = useState({
    balances: {
      ucana: 0,
      ucane: 0,
      ucanu: 0,
    },
  });

  const fetchStats = async () => {
    console.log("Actualizou");
    try {
      const { data } = await api.get("/stats");
      setStats(data || {});
    } catch (error) {}
  };

  useEffect(() => {
    setTimeout(() => {
      fetchStats();
      setRealTime(new Date());
    }, 3000);
  }, [realTime]);

  return (
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
                {stats.balances.ucana.price || 0}
              </td>
              <td className="h4 font-weight-bold">
                {stats.balances.ucane.price || 0}
              </td>
              <td className="h4 font-weight-bold">
                {stats.balances.ucanu.price || 0}
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
  );
};

export default Stats;
