import PackInfo from "./components/PackInfo";
import PaymentForm from "./components/PaymentForm";

const page = () => {
    return (
        <div className='flex flex-col md:flex-row justify-center items-center gap-4  mt-20'>
            <div className="">
                <PaymentForm></PaymentForm>
            </div>
            <div className="">
                <PackInfo></PackInfo>
            </div>
        </div>
    );
};

export default page;