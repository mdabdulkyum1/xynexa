'use client';

import Loading from '@/components/loading/Loading';
import { useUser } from '@clerk/nextjs';
import axios from 'axios';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

const DocumentsContainer = () => {
  const [loading, setLoading] = useState(false);

  const { user } = useUser();
  const [availableDocuments, setAvailableDocuments] = useState([]);
  const userEmail = user?.emailAddresses[0]?.emailAddress;
  console.log(userEmail)

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
              {availableDocuments.length === 0 ? (
                <p className="text-gray-500 text-4xl">No documents available.</p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">

                  {availableDocuments.map((doc) => (
                    <div key={doc._id} className="border p-4 rounded-lg shadow-md">
                      <h3 className="text-lg font-bold">{doc.title}</h3>
                      

                      <Link href={`/dashboard/tools/documents/${doc?._id}`}>Edit</Link>
                      {/* <Link>Delete</Link> */}
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
