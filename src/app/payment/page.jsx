import PackInfo from "./components/PackInfo";
import PaymentForm from "./components/PaymentForm";

const page = () => {
    return (
        <div className='mt-20'>
            <div className="">
                <PaymentForm></PaymentForm>
            </div>
            <div className="">
                {/* <PackInfo></PackInfo> */}
            </div>
        </div>
    );
};

export default page;