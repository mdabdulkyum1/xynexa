import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const page = () => {
    return (
        <div>
            <h2 className='text-xl lg:text-3xl font-semibold '>Start a new documents</h2>
            <div className='border-2 p-2 inline-block'>
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

        </div>
    );
};

export default page;