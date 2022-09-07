import {configureStore} from '@reduxjs/toolkit'
import clickSlide from './Features/SidebarOpenSlice/clickSlice'
import openDialogAccountSlide from "./Features/DiaLogSlice/openDialogAccountSlide";
import openDialogChangePassSlide from "./Features/DiaLogSlice/openDialogChangePassSlice";
import openDialogMyWalletSlice from "./Features/DiaLogSlice/openDialogMyWalletSlice";
import UserSlice from "./Features/CurrentUser/UserSlice";
import WalletSlice from "./Features/SelectWallet/selectWallet";
import WalletIdSlice from "./Features/SelectWallet/walletIdSlice";
import dialogTransactionSlice from "./Features/DiaLogSlice/openDialogTransactionSlice";
import openDialogIconsSlice from "./Features/DiaLogSlice/openDialogIconsSlice";
import openDialogCategorySlice from "./Features/DialogCategorySlice/openDialogCategorySlice";
import openDialogCurrencySlice from "./Features/DiaLogSlice/openDialogCurrencySlice";
import selectCategorySlice from "./Features/Transaction/categorySlice";
import walletTransactionSlice from "./Features/DiaLogSlice/openDialogWallet";
import selectWalletSlice from "./Features/Transaction/walletSlice";
import openDialogDetailSlice from "./Features/DiaLogSlice/openDialogDetailSlice";
import openDialogEditWallet from "./Features/DiaLogSlice/openDialogEditWalletSlice";
import dialogEditTransactionSlice from './Features/DiaLogSlice/openEditTransactionSlice';
import selectTransaction from './Features/Transaction/transactionSlice';
import detailTransactionSlice from './Features/Transaction/detailTransactionSlice'
import SearchInputSlice from './Features/SearchInput/SearchInputSlice';
import currentWalletSlice from "./Features/Transaction/currentWalletSlice";


import openDialogNewCategorySlice from "./Features/DialogCategorySlice/openDialogNewCategorySlice";
import openDialogIconCategorySlice from "./Features/DialogCategorySlice/openDialogIconCategorySlice";
import selectIconSlice from "./Features/DiaLogSlice/selectIconSlice";
import dataCategorySlice from "./Features/DialogCategorySlice/dataCategorySlice";
import openDialogUpdateCategorySlide from "./Features/DialogCategorySlice/openDialogUpdateCategorySlice";
import updateDataCategorySlice from "./Features/DialogCategorySlice/updataDataCategorySlice";
import openDialogBalanceSlice, {openDialogBalance} from "./Features/DiaLogSlice/openDialogBalanceSlice";
import selectDataWalletOnCategorySlice from "./Features/DialogCategorySlice/selectDataWalletOnCategory";
import isLoadingScreenSlice from "./Features/isLoadingScreen/isLoadingScreen";

const store = configureStore({
    reducer: {
        Layout: clickSlide.reducer,
        Dialog: openDialogAccountSlide.reducer,
        DialogPass: openDialogChangePassSlide.reducer,
        currentUser: UserSlice,
        SearchInput: SearchInputSlice,
        dialogTransaction: dialogTransactionSlice.reducer,
        DialogWallet: openDialogMyWalletSlice.reducer,
        DialogIcons: openDialogIconsSlice.reducer,
        DialogTransactionCategory: openDialogCategorySlice.reducer,
        selectCategory: selectCategorySlice.reducer,
        dialogWallet: walletTransactionSlice.reducer,
        selectWallet: selectWalletSlice.reducer,
        DialogCurrency: openDialogCurrencySlice.reducer,
        DialogCategory: openDialogCategorySlice.reducer,
        DialogDetail: openDialogDetailSlice.reducer,
        DialogEditWallet: openDialogEditWallet.reducer,
        DialogBalance: openDialogBalanceSlice.reducer,
        wallet: WalletSlice,
        DialogNewCategory: openDialogNewCategorySlice.reducer,
        DialogIconCategory: openDialogIconCategorySlice.reducer,
        SelectIcon: selectIconSlice.reducer,
        DateCategory: dataCategorySlice.reducer,
        UpdateCategory: openDialogUpdateCategorySlide.reducer,
        UpdateDataCategory: updateDataCategorySlice.reducer,
        SelectDataWalletOnCategory: selectDataWalletOnCategorySlice.reducer,
        walletId: WalletIdSlice,
        dialogEditTransaction: dialogEditTransactionSlice.reducer,
        selectTransaction: selectTransaction.reducer,
        selectDetailTransaction: detailTransactionSlice,
        currentWallet: currentWalletSlice,
        isLoadingScreenSlice: isLoadingScreenSlice
    }
})

export default store