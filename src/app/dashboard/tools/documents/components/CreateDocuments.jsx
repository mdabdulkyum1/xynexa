import Image from 'next/image';
import React from 'react';
import Link from 'next/link';

const CreateDocuments = () => {
    return (
        <div className='border-2 p-4 lg:p-8 flex flex-col items-center justify-center lg:items-start'>
            <h2 className='text-xl font-bold lg:text-3xl text-gray-700 dark:text-white'>Write A Document</h2>
            <div>
      <Link href="/dashboard/tools/documents/docs">
        <Image
          src="/assets/images/docs-image.png"
          alt="docs-img"
          width={200}
          height={200}
          style={{ cursor: 'pointer' }}
        />
      </Link>
    </div>
        </div>
    );
};

export default CreateDocuments;