import Link from 'next/link';
import React from 'react';

const PricingFaq = () => {
    return (
        <div className='w-11/12 mx-auto my-10 lg:my-10'>
            <div className='text-center mb-8 dark:text-white'>
            <h3 className='text-4xl font-bold mb-4'>Frequently asked questions</h3>
            <p>Find answers to your questions right here, and don't hesitate to
                <span className='text-purple-600 font-bold'><Link href="/contact-us"> contact us </Link></span>
                 if you couldn't find what you're looking for.</p>
            </div>
            {/* faq */}
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-gray-600 dark:text-white'>
  <div className='border-2 p-6 rounded-xl lg:col-span-2'>
    <h2 className='font-bold text-xl lg:text-2xl mb-3'>Can I upgrade myself or do I have to upgrade my entire Workspace?</h2>
    <p className='text-sm lg:text-base'>To upgrade ClickUp, you'll need to upgrade your entire Workspace, which means all members in your Workspace.</p>
  </div>

  <div className='border-2 p-6 rounded-xl lg:row-span-2 flex flex-col justify-center'>
    <h2 className='font-bold text-xl lg:text-2xl mb-3'>Is the Free Forever Plan really free?</h2>
    <p className='text-sm lg:text-base'>For sure! This is so much more than a trial. The Free Forever Plan offers an unmatched level of functionality compared to other 'freemium' apps. We do this by making money on our paid plans.</p>
  </div>

  <div className='border-2 p-6 rounded-xl'>
    <h2 className='font-bold text-xl lg:text-2xl mb-3'>What if I have multiple Workspaces?</h2>
    <p className='text-sm lg:text-base'>Payment is per Workspace, meaning each Workspace requires an individual upgrade.</p>
  </div>

  <div className='border-2 p-6 rounded-xl'>
    <h2 className='font-bold text-xl lg:text-2xl mb-3'>What is a 'use' in context of Xynexa's plans?</h2>
    <p className='text-sm lg:text-base'>‘Uses’ are intended as a demonstration of paid plan features, allowing you to explore their value for your workflows.</p>
  </div>

  <div className='border-2 p-6 rounded-xl lg:col-span-2'>
    <h2 className='font-bold text-xl lg:text-2xl mb-3'>What happens if I cancel?</h2>
    <p className='text-sm lg:text-base'>You're free to cancel anytime! When you do, your current plan will last until the end of your billing cycle, unless you choose to downgrade immediately.</p>
  </div>

  <div className='border-2 p-6 rounded-xl lg:row-span-3 flex flex-col justify-center'>
    <h2 className='font-bold text-xl lg:text-2xl mb-3'>How do I change my plan if I start on the Free Forever Plan?</h2>
    <p className='text-sm lg:text-base'>If you start on the Free Forever Plan and want to upgrade, you can easily do so from your billing settings. Simply navigate to the billing section in your account settings, where you'll find various paid plans to choose from. Each plan offers different features, such as increased storage, more automation, and advanced integrations. After selecting the plan that best suits your needs, you’ll need to enter your payment details. </p>
  </div>

  <div className='border-2 p-6 rounded-xl'>
    <h2 className='font-bold text-xl lg:text-2xl mb-3'>Do tasks count against my storage?</h2>
    <p className='text-sm lg:text-base'>No! File attachments are the only things that affect your team's storage.</p>
  </div>

  <div className='border-2 p-6 rounded-xl'>
    <h2 className='font-bold text-xl lg:text-2xl mb-3'>What happens when I hit my usage limits?</h2>
    <p className='text-sm lg:text-base'>You'll still be able to use ClickUp, and we'll let you know as soon as a limit is reached. We're happy to provide a grace period to find the plan that works for you!</p>
  </div>

  <div className='border-2 p-6 rounded-xl lg:col-span-2'>
    <h2 className='font-bold text-xl lg:text-2xl mb-3'>What payment methods do you accept?</h2>
    <p className='text-sm lg:text-base'>We accept all major credit cards! For Enterprise orders meeting a minimum, we also accept bank transfers.</p>
  </div>
</div>

        </div>
    );
};

export default PricingFaq;