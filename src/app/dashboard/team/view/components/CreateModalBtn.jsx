"use client"
import TeamCreateModal from '@/app/dashboard/component/Modals/TeamCreateModal';
import { useState } from 'react';

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
                className='border-2 p-4 rounded-lg'>
                <h1>Add New Board</h1>
                <p>Click here to add new board</p>
            </div>
            <TeamCreateModal
                closeModal={closeModal}
                isOpen={isOpen}
            ></TeamCreateModal>
        </>
    );
};

export default CreateModalBtn;