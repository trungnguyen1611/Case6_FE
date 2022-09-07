import BudgetLayout from "../../Components/Layouts/Budget/BudgetLayout";
import {motion} from "framer-motion"
import Variants from "../../Components/Variants";


const UserBudgetPage = () => {
    return (
        <motion.div
            initial="exit"
            animate="enter"
            exit="exit"
            variants={Variants.variant1}>
            <BudgetLayout>
            <h1> this is the budget page</h1>
            </BudgetLayout>
        </motion.div>
    );
};

export default UserBudgetPage;