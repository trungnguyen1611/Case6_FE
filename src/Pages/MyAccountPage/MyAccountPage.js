import TransactionsLayout from "../../Components/Layouts/Transactions/TransactionsLayout";
import {motion} from "framer-motion"
import Variants from "../../Components/Variants";


const MyAccountPage = () => {
    return (
        <motion.div
            initial="exit"
            animate="enter"
            exit="exit"
            variants={Variants.variant1}
        >
            <TransactionsLayout>
                <div className='flex text-3xl underline p-2'>
                <h1 >this is the Account  </h1>
                </div>
            </TransactionsLayout>
        </motion.div>
    );
};

export default MyAccountPage;