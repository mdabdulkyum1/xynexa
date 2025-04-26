'use client';
import Loading from '@/components/loading/Loading';
import { useDocumentDeleteMutation, useDocumentGetByEmailQuery } from '@/redux/features/Api/documentApi';
import { useUser } from '@clerk/nextjs';
import Image from 'next/image';
import React, {  useState } from 'react';
import docsImg from '../../../../../../public/assets/images/dynamic-docs.png'
import { MdDelete } from "react-icons/md";
import { MdEditSquare } from "react-icons/md";
import { BsThreeDotsVertical } from 'react-icons/bs';
import Swal from 'sweetalert2';
import Link from 'next/link';

const DynamicDocsContainer = () => {
    const { user } = useUser();
    const userEmail = user?.emailAddresses[0]?.emailAddress;
    const [openId, setOpenId] = useState(null);
    

    const toggleMenu = (id) => {
        setOpenId(prevId => (prevId === id ? null : id)); // toggle open/close
      };


    const { data: availableDocumentsData = [], isError, error, isLoading: isFetchingLoading } = useDocumentGetByEmailQuery(userEmail)
    const [documentDelete, {isLoading:isDeleting}] =  useDocumentDeleteMutation()
    const documents = availableDocumentsData.documents
    console.log(documents)

    const handleDelete = (docsId) => {
        Swal.fire({
          title: 'Are you sure?',
          text: "You won't be able to revert this!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, delete it!',
        }).then((result) => {
          if (result.isConfirmed) {
            documentDelete(docsId);
            
          }
        });
      };

    return (
        <div>
      {
        isFetchingLoading ? (
          <div className='flex justify-center items-center h-[400px]'>
            <Loading />
          </div>
        ) : (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4'>
            {
              documents?.map((doc) => (
                <div key={doc?._id} className='p-4 rounded-lg bg-gray-200 dark:bg-black dark:border-2'>
                  <div className='flex justify-between'>
                    <p>{doc?.title}</p>
                    {/* actions */}
                    <div className="relative inline-block">
                      <button
                        onClick={() => toggleMenu(doc._id)}
                        className="text-2xl text-gray-600 dark:text-gray-200"
                      >
                        <BsThreeDotsVertical />
                      </button>

                      {openId === doc._id && ( 
                        <div className="absolute right-0 mt-2 bg-white dark:bg-black dark:border-2 shadow-lg rounded-md p-2 z-10 space-y-2">
                          <button onClick={()=>handleDelete(doc?._id)} className="text-red-500 text-2xl hover:scale-110 transition">
                            <MdDelete />
                          </button>
                          <button className="text-blue-500 text-2xl hover:scale-110 transition">
                            <Link href={`/dashboard/documents/updateDocs/${doc?._id}`}><MdEditSquare /></Link>
                            
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                  <Image src={docsImg} alt='docs img' width={200} height={200} />
                </div>
              ))
            }
          </div>
        )
      }
    </div>
    );
};

export default DynamicDocsContainer;