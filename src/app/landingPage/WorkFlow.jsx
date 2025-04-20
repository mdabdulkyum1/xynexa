import React from 'react';
import FeatureButton from './FeatureButton';
import WorkFlowComponent from './components/WorkFlowComponent';

const WorkFlow = () => {
    return (
        <div className='my-10 lg:my-28 w-11/12 lg:w-3/4 mx-auto'>
             <FeatureButton></FeatureButton>
            <div className='dark:text-white text-center my-4'>
                <h2 className='text-3xl lg:text-5xl font-bold mb-4 dm-font'>Speed up your workflow</h2>
                <p className='w-full lg:w-1/2 mx-auto dark:text-gray-400'> We are excited to present our stunning solutions designed to address your unique needs and provide a seamless user experience.</p>
            </div>
            <div className=' mt-6 lg:mt-12 '>
              <WorkFlowComponent></WorkFlowComponent> 
            </div>
        </div>
    );
};

export default WorkFlow;