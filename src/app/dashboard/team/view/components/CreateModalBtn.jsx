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
                onClick={openModal}
                className='border-2 p-4 rounded-lg cursor-pointer'>
                <h1>Add New Team</h1>
                <p>Click here to make new Team</p>
            </div>
            <TeamCreateModal
                closeModal={closeModal}
                isOpen={isOpen}
            ></TeamCreateModal>
        </>
    );
};

export default CreateModalBtn;