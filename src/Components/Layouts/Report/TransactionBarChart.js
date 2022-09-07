import React from 'react';
import {Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis} from "recharts";


function TransactionBarChart({transactionData}) {

    return <BarChart
        width={700}
        height={300}
        data={transactionData}
        margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5
        }}
    >
        <CartesianGrid strokeDasharray="3 3"/>
        <XAxis dataKey="XAxis"/>
        <YAxis/>
        <Tooltip/>
        <Legend/>
        <Bar dataKey="EXPENSE" fill="#be123c"/>
        <Bar dataKey="INCOME" fill="#1d4ed8"/>
    </BarChart>;
}

export default TransactionBarChart;