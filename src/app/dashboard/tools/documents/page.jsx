import React from 'react';
import CreateDocuments from './components/CreateDocuments';
import DocumentsContainer from './components/DocumentsContainer';

const documents = () => {
    return (
        <div>
           <CreateDocuments></CreateDocuments>
           <DocumentsContainer></DocumentsContainer>
        </div>
    );
};

export default documents;