'use client';

import { useUser } from '@clerk/nextjs';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

const DocumentsContainer = () => {
  const { user } = useUser();
  const [availableDocuments, setAvailableDocuments] = useState([]);
  const userEmail = user?.emailAddresses[0]?.emailAddress;
  console.log(userEmail)

  useEffect(() => {
    if (userEmail) {
      const fetchDocuments = async () => {
        try {
          const response = await axios.get(`http://localhost:5000/api/documents/getAllDoc?email=${userEmail}`);
        //   console.log(response.data.
        //     documents
        //     );
         
          if (response.data.documents.length > 0) {
            setAvailableDocuments(response.data.documents);
            console.log('Documents fetched successfully:', response.data);
          } else {
            console.error('Expected an array of documents, but got:', response.data);
            setAvailableDocuments([]);  
          }
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
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4'>
        {availableDocuments.length > 0 ? (
          availableDocuments.map((doc) => (
           
           <div className='border-2 p-4' key={doc.id}>{doc.title}</div>
          ))
        ) : (
          <div className='text-xl font-bold text-gray-700 my-4'>No documents available</div>
        )}
      </div>
    </div>
  );
};

export default DocumentsContainer;
