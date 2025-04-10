import React from 'react';

const Loading = () => {
    return (
        <div>
            <div class="flex items-center justify-center h-screen bg-gray-100">
                <div class="relative w-16 h-16">
                    <div class="w-full h-full rounded-full border-4 border-t-transparent border-indigo-500 animate-spin"></div>
                    <div class="absolute top-0 left-1/2 w-3 h-3 bg-indigo-500 rounded-full transform -translate-x-1/2 animate-ping"></div>
                </div>
            </div>

        </div>
    );
};

export default Loading;