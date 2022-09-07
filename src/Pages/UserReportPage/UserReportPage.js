import React, {useEffect, useState, useRef} from "react";
import './UserReportPage.css'
import ReportLayout from "../../Components/Layouts/Report/ReportLayout";
import {motion} from "framer-motion"
import Variants from "../../Components/Variants";
import TransactionBarChart from "../../Components/Layouts/Report/TransactionBarChart";
import PieChartInReport from "../../Components/Layouts/Report/PieChartInReport";
import {isLoadingAPIScreen, afterLoadingAPIScreen} from '../../Features/isLoadingScreen/isLoadingScreen'
import {useDispatch, useSelector} from "react-redux";
import axios from '../../axios/index'
import {DEFAULT_DATA} from './dummyData'
import {useReactToPrint} from 'react-to-print';


const UserReportPage = () => {
    const dispatch = useDispatch()
    const currentWalletState = useSelector(state => state.currentWallet.value)
    const currencyIcon = currentWalletState?.currency?.code.split("-")[1] || "$";
    const currentUser = useSelector(store => store.currentUser.currentUser)
    const [transactionData, setTransactionData] = useState([])
    const [dataPieChartIncome, setDataPieChartIncome] = useState(DEFAULT_DATA)
    const [dataPieChartExpense, setDataPieChartExpense] = useState(DEFAULT_DATA)
    const totalIncome = dataPieChartIncome.reduce((partialSum, a) => partialSum + a.value, 0);
    const totalExpense = dataPieChartExpense.reduce((partialSum, a) => partialSum + a.value, 0);
    const endingBalance = Math.abs(totalIncome - totalExpense)
    const financialAnalyzes = (totalIncome / totalExpense).toFixed(2)


    const [selectedDate, setSelectedDate] = useState("2022/09")

    useEffect(() => {
        let today = new Date();
        let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        let yyyy = today.getFullYear();
        today = yyyy + '-' + mm
        setSelectedDate(String(today))
    }, [])

    useEffect(() => {
        dispatch(isLoadingAPIScreen())
        if (currentWalletState._id) {
            axios.post('transaction/search/get-report-data', {
                currentWallet: currentWalletState?._id,
                date: selectedDate
            })
                .then(resultFromBEAloha => {
                    resultFromBEAloha?.data?.transactionData && setTransactionData([...resultFromBEAloha.data.transactionData])
                    resultFromBEAloha?.data?.dataPieChartIncome.length ? setDataPieChartIncome([...resultFromBEAloha.data.dataPieChartIncome]) : setDataPieChartIncome([...DEFAULT_DATA])
                    resultFromBEAloha?.data?.dataPieChartExpense.length ? setDataPieChartExpense([...resultFromBEAloha.data.dataPieChartExpense]) : setDataPieChartExpense([...DEFAULT_DATA])
                    dispatch(afterLoadingAPIScreen())
                }).catch(error => console.error(error.message))
        } else {
            dispatch(afterLoadingAPIScreen())
        }

    }, [selectedDate, currentWalletState])


    const selectPrior = (e) => {
        setSelectedDate(e.target.value)
    }

    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    function currencyFormat(num) {
        return num?.toFixed(0)?.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    }

    return (
        <motion.div
            initial="exit"
            animate="enter"
            exit="exit"
            variants={Variants.variant1}>
            <ReportLayout>
                <div className="flex justify-center p-[30px] text-center">
                    <div
                        className=" w-[21cm] bg-white shadow-md flex-block justify-center min-h-[29.7cm] py-[1cm]"
                        ref={componentRef}>

                        <div className="flex justify-center gap-5 my-5">
                            <div className="w-1/3 justify-center text-center text-gray-500">
                                <h1 className="text-xl">Opening Balance</h1>
                                <span style={{color: "#1d4ed8"}}>{currencyIcon} {currencyFormat(currentWalletState?.initial)}</span>
                            </div>
                            <div className="w-1/3 justify-center text-center text-gray-500">
                                <h1 className="text-xl">Ending Balance</h1>
                                <span
                                    style={{color: `${totalIncome > totalExpense ? "#1d4ed8" : "#be123c"}`}}> {totalIncome > totalExpense ? "" : "- "} {currencyIcon} {currencyFormat(Math.ceil(endingBalance))}</span>
                            </div>
                        </div>
                        <hr/>
                        <div className="block justify-center w-full py-3">
                            <h1 className=" flex justify-center text-xl text-gray-500">Financial Analyzes</h1>
                            <h1 className="flex justify-center text-2xl"
                                style={{color: `${totalIncome > totalExpense ? "#1d4ed8" : "#be123c"}`}}> {financialAnalyzes < 100 ? financialAnalyzes : 100}</h1>
                        </div>
                        <div className="flex justify-center w-full">
                            <TransactionBarChart transactionData={transactionData}/>
                        </div>
                        <div className="flex inline justify-center w-full text-gray-600">
                            <div className="block w-1/2 ">
                                <span className="flex justify-center mt-[22px]">Income</span>
                                <span
                                    className="flex justify-center text-blue-500">{currencyIcon} {currencyFormat(totalIncome)}</span>
                                <div className="w-full flex px-[15px] mb-[16px] text-sm">
                                    <PieChartInReport
                                        color={dataPieChartIncome[0]?.name !== "None" ? "#1d4ed8" : "#71717a"}
                                        data={dataPieChartIncome || DEFAULT_DATA}/>
                                </div>
                            </div>
                            <div className="block w-1/2 relative ">
                                <span className="flex justify-center mt-[22px]">Expenses</span>
                                <span
                                    className="flex justify-center text-red-600">-{currencyIcon}{currencyFormat(totalExpense)}</span>
                                <div className="w-full flex px-[15px] mb-[16px] text-sm absolute">
                                    <PieChartInReport
                                        color={dataPieChartExpense[0]?.name !== "None" ? "#be123c" : "#71717a"}
                                        data={dataPieChartExpense || DEFAULT_DATA}/>
                                </div>
                            </div>

                        </div>
                        <div className="flex justify-center gap-5 my-5">
                            <div>
                                <div className="flex justify-center">
                                    <div className="m-auto xl:w-60">
                                        <input type="month"
                                               onChange={selectPrior}
                                               value={selectedDate}
                                               className="form-select hover:bg-gray-400 appearance-none block  w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-gray-200 bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-gray-600 focus:outline-none"
                                               aria-label="Default select example">
                                        </input>
                                    </div>
                                </div>
                            </div>
                            <button
                                onClick={handlePrint}
                                className="bg-gray-200 hover:bg-gray-400 text-gray-800 font-bold py-1.5 px-3 rounded inline-flex items-center">
                                <svg className="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg"
                                     viewBox="0 0 20 20">
                                    <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z"/>
                                </svg>
                                <span>Download</span>
                            </button>

                        </div>
                    </div>
                </div>

            </ReportLayout>

        </motion.div>
    );
};

export default UserReportPage;