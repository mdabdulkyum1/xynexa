import React from 'react';
import SupportBanner from './components/SupportBanner';
import SupportCards from './components/SupportCards';
import SupportFaq from './components/SupportFaq';
import SupportLast from './components/SupportLast';

const Support = () => {
    return (
        <div>
            <SupportBanner></SupportBanner>
            <SupportCards></SupportCards>
            <SupportFaq></SupportFaq>
            <SupportLast></SupportLast>
        </div>
    );
};

export default Support;