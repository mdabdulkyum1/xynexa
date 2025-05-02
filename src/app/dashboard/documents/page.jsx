'use client';
import Image from 'next/image';
import Link from 'next/link';


import dynamic from 'next/dynamic';
const DynamicDocsContainer = dynamic(() => import('./new/components/DynamicDocsContainer'), {
    ssr: false,
  });

const page = () => {

    return (
        <div className='p-4 lg:p-10'>
            <h2 className='text-xl lg:text-3xl font-semibold mb-2'>Start a new documents</h2>
            <div className='p-2 inline-block justify-center items-center  mb-6'>
                <Link href="/dashboard/documents/new"> 
                    <button className='p-0 border-none bg-transparent'>
                        <Image
                            src="/assets/images/docs-image.png"
                            alt="docs-image"
                            width={300}
                            height={300}
                        />
                    </button>
                </Link>
            </div>
            
            {/* dynamic document section */}
            <div>
                <h3 className='text-xl lg:text-3xl font-semibold mb-4 lg:mb-6'>Your documents</h3>
               <DynamicDocsContainer></DynamicDocsContainer>
            </div>

        </div>
    );
};

export default page;