"use client"

import { useState } from 'react';
import TeamCreateModal from './TeamCreateModal';

const CreateModalBtn = () => {
    const [isOpen, setIsOpen] = useState(false)

    function closeModal() {
        setIsOpen(false)
    }

    function openModal() {
        setIsOpen(true)
    }

    return (
        <>
            <div
                
                className=' rounded-lg  flex flex-col justify-center items-center'>
               
                <div onClick={openModal} className="p-4 cursor-pointer rounded-lg shadow border-dashed border-2 border-gray-400 flex items-center justify-center ">
            <div className="text-center">
            
            <p>Create a new team</p>
            </div>
        </div>
            </div>
            <TeamCreateModal
                closeModal={closeModal}
                isOpen={isOpen}
            ></TeamCreateModal>
        </>
    );
};

export default CreateModalBtn;
