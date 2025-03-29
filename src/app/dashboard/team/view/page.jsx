
import Image from 'next/image';
import React from 'react';
import Filter from './components/Filter';
import CreateModalBtn from './components/CreateModalBtn';


export default function Page() {

const cards =[
    {title: 'Card 1', description: 'Description 1', date: '2021-09-01'},
    {title: 'Card 2', description: 'Description 2', date: '2021-09-02'},
    {title: 'Card 3', description: 'Description 3', date: '2021-09-03'},
    {title: 'Card 4', description: 'Description 4', date: '2021-09-04'},
    {title: 'Card 5', description: 'Description 5', date: '2021-09-05'},
]
// dynamic color for card
const bgColors = ["bg-pink-200", "bg-green-200", "bg-blue-200", "bg-purple-200" , "bg-yellow-200"];

    return (
        <div>
            <div className=' flex lg:pl-20  border-b-2 border-gray-600 mb-4'>
                <div className='mt-2'>
                <Image src="/assets/images/logo-xynexa.png" alt='logo-img' width={100} height={100}></Image>
                </div>
                <div className='flex flex-col justify-center items-center'>
                <h2 className='font-bold text-xl lg:text-3xl'>XY<span className='text-purple-500'>nexa</span></h2>
                
                </div>
            </div>
            <div className=''>
                <h1 className='text-xl lg:text-2xl font-semibold'>Teams</h1>
                <div>
                    <div>
                       <Filter></Filter>
                    </div>
                </div>
                <div></div>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4 lg:p-8 mt-5 lg:mt-10'>
                {/* add new board */}
               <CreateModalBtn></CreateModalBtn>
                {
                    cards.map((card, index) => {
                        return (
                            <div key={index} className={`p-4 rounded-lg shadow ${bgColors[index % bgColors.length]}`}>
                                <h1>{card.title}</h1>
                                <p>{card.description}</p>
                                <p>{card.date}</p>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
}
