import { GrCodeSandbox } from "react-icons/gr";
import Apps from './components/Apps';

const FavriteApps = () => {
  return (
    <div className='my-10 lg:my-28 w-11/12 lg:w-3/4 mx-auto bg-yellow-700'>

      <div className='flex justify-center items-center'>
        <button className='btn text-[#20B7AB] border-2 border-[#20B7AB] rounded-full bg-transparent'>
          <span className='text-xl mr-2'><GrCodeSandbox /></span> Integrations
        </button>
      </div>

      <div className='dark:text-white text-center my-6'>
        <h2 className='text-3xl lg:text-5xl font-bold mb-4 dm-font'>All your favorite apps</h2>
        <p className='w-full lg:w-1/2 mx-auto dark:text-gray-400'>
          We offer seamless integration solutions that empower your business with enhanced efficiency and productivity.
        </p>
      </div>

      <div className='w-full mt-8 lg:mt-16'>
        <Apps />
      </div>
    </div>
  );
};

export default FavriteApps;
