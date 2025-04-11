'use client';

import Loading from '@/components/loading/Loading';
import { useDocumentDeleteMutation, useDocumentGetByEmailQuery } from '@/redux/features/Api/documentApi';
import { useUser } from '@clerk/nextjs';
import axios from 'axios';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { MdDelete } from "react-icons/md";

const DocumentsContainer = () => {
  const [loading, setLoading] = useState(false);

  const { user } = useUser();
  const [availableDocuments, setAvailableDocuments] = useState([]);
  const userEmail = user?.emailAddresses[0]?.emailAddress;
  console.log(userEmail)

const {data:availableDocumentsData=[], isError, error, isLoading:isFetchingLoading} = useDocumentGetByEmailQuery(userEmail)
console.log(availableDocumentsData.documents)
  useEffect(() => {
    if (userEmail) {
      const fetchDocuments = async () => {
        setLoading(true);
        try {
          const response = await axios.get(`http://localhost:5000/api/documents/getAllDoc?email=${userEmail}`);
          setTimeout(() => {
            if (response.data.documents.length > 0) {
              setAvailableDocuments(response.data.documents);
              console.log('Documents fetched successfully:', response.data);
            } else {
              console.error('Expected an array of documents, but got:', response.data);
              setAvailableDocuments([]);
            }
            setLoading(false);

          }, 2000);


        } catch (error) {
          console.error('Error fetching documents:', error);
          setAvailableDocuments([]);
        }
      };

      fetchDocuments();
    }
  }, [userEmail]);

  console.log(availableDocuments)

const [documentDelete, {isLoading:isDeleting}] =  useDocumentDeleteMutation()

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
    <div className="p-4 lg:p-8">
      <h2 className="text-xl font-bold lg:text-3xl text-gray-700 dark:text-white">Your Documents</h2>
      {/* Render available documents here */}
      <div>
        {
          loading ? (
            <div className='h-[200px] w-full flex items-center justify-center'>
              <Loading></Loading>
            </div>
          ) : (
            <div>
              {availableDocumentsData?.documents?.length === 0 ? (
                <p className="text-gray-500 text-4xl">No documents available.</p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">

                  {availableDocumentsData?.documents?.map((doc) => (
                    <div key={doc._id} className="border p-4 rounded-lg shadow-md">
                      <h3 className="text-lg font-bold">{doc.title}</h3>
                      

                     <div className='flex items-center justify-between mt-4'>
                     <Link className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition mr-2" href={`/dashboard/tools/documents/${doc?._id}`}>Edit</Link>
                     <button onClick={()=>handleDelete(doc?._id)} className='btn text-xl text-red-600 border-none bg-transparent'><MdDelete /></button>
                     </div>

                     
                    </div>
                  ))}
                </div>
              )}
            </div>


          )
        }
      </div>
    </div>
  );
};

export default DocumentsContainer;
