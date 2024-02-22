import React, { useEffect, useState } from "react";
import { Chart as ChartJs, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';
import  { Bar } from 'react-chartjs-2';
import useAxiosWithAuth from "../../../services/hooks/useAxiosWithAuth";
import SweetAlert from "../../../commons/SweetAlert";
import { useCallback } from "react";

ChartJs.register( BarElement, CategoryScale, LinearScale, Tooltip, Legend)

function DashboardChart() {
    const [ dataChart, setDataChart ] = useState([{
        month: "",
        income: "",
        expense: ""
    }])
    const [chartPeak, setChartPeak] = useState(0)
    const [expenseMark, setExpenseMark] = useState(0)
    const [chartMinimum, setChartMinimum] = useState(0)

    const axios = useAxiosWithAuth()


    const fetchHistory = useCallback(async () => {
        await axios.get("/wallet/data").then((response) => {
            if(response != null) {
                if(response.data["statusCode"] === 200){
                    const chartData = response.data["data"]["dataList"].map(transaction => ({
                        month: transaction.month,
                        income: transaction.income,
                        expense: transaction.expense,
                    }));
                    setDataChart(chartData)
                    const income = response.data["data"]["totalIncome"]
                    const expense = response.data["data"]["totalExpense"]
                    setExpenseMark(expense)
                    if(income > expense) {
                        setChartPeak(income)
                        setChartMinimum(expense)
                    } else{
                        setChartPeak(expense)
                        setChartMinimum(income)
                    }

                } else {
                    SweetAlert(response.data["message"])
                }
            }
        }).catch((err) => {})
    }, [ axios ])

    useEffect(() => {
        fetchHistory();
    }, [ ]);

    const data = {
        labels: dataChart.map((value) => value.month),
        datasets: [
            {
                label: 'income',
                data: dataChart.map((value) => value.income),
                backgroundColor: '#144C44',
                borderColor: 'white',
                borderWidth: 1,
            },
            {
                label: 'expenditure',
                data: dataChart.map((value) => value.expense),
                backgroundColor: '#6B4925',
                borderColor: 'white',
                borderWidth: 1,
            }
        ]
    }

    const options = {
        responsive: true,
        scales: {
            y: {
                min: 0,
                max: chartPeak,
                ticks: {
                    stepSize: chartMinimum
                }
            }
        }
    }

    return (
        <div style={{maxHeight: "500px", marginBottom: "60px"}} >
            <h1 style={{ color: '#A3A3A3', fontWeight: 'bold' }}>TransactionChart</h1>
            <Bar data = {data} options = {options}></Bar>
        </div>
    )
}

export default DashboardChart