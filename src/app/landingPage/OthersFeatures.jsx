import React from 'react';
import FeatureButton from './FeatureButton';
import Tab from './components/Tab';

const OthersFeatures = () => {
    return (
        <div className='my-10 lg:my-28'>
          <FeatureButton></FeatureButton>
          <div className='dark:text-white text-center my-4'>
            <h2 className='text-3xl lg:text-5xl font-bold mb-4 dm-font'>Other features</h2>
            <p className='w-full lg:w-1/2 mx-auto dark:text-gray-400'> Our platform is designed to provide you with an exceptional user experience, catering to the needs of ambitious professionals and visionary entrepreneurs.</p>
          </div>
          <div>
            <Tab></Tab>
          </div>
        </div>
    );
};

export default OthersFeatures;