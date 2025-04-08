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
          // Check the response structure here before setting the state
          if (response.data.documents.length > 0) {
            setAvailableDocuments(response.data.documents);
            console.log('Documents fetched successfully:', response.data);
          } else {
            console.error('Expected an array of documents, but got:', response.data);
            setAvailableDocuments([]);  // Fallback to an empty array
          }
        } catch (error) {
          console.error('Error fetching documents:', error);
          setAvailableDocuments([]);  // Fallback to an empty array
        }
      };

      fetchDocuments();
    }
  }, [userEmail]);

  console.log(availableDocuments)

  return (
    <div className="p-4 lg:p-8 border-2">
      <h2 className="text-xl font-bold lg:text-3xl text-gray-700 dark:text-white">Your Documents</h2>
      {/* Render available documents here */}
      <ul>
        {availableDocuments.length > 0 ? (
          availableDocuments.map((doc) => (
            <li key={doc.id}>{doc.title}</li>
          ))
        ) : (
          <li>No documents available</li>
        )}
      </ul>
    </div>
  );
};

export default DocumentsContainer;
