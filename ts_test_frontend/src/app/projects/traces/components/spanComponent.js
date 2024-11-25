'use client'

import React, { useState } from 'react'
import {
    XMarkIcon,
    CodeBracketIcon,
    ViewColumnsIcon
  } from '@heroicons/react/24/outline'

const spanData = [
    {name: 'Parent Span', id:1, parentId:null},
]

const children = {
    1: [{name: 'PromptInjection', id:2, parentId:1},
        {name: 'Regex', id:3, parentId:1},
        {name: 'ReadingTime', id:4, parentId:1}]
}

function SpanComponent({open, closeSpanComponent}) {

    const [selectedParent, setSelectedParent] = useState();
    const [selectedChild, setSelectedChild] = useState();

    const [showBasicDetailsColumn, setShowBasicDetailsColumn] = useState();

    return (
        <div className={`z-50 fixed top-0 right-0 w-full lg:w-[90%] xl:w-[80%] h-full bg-gray-800 border-l-[1px] border-white border-opacity-15 shadow-lg rounded-l-xl transition-transform duration-300 ${open ? 'translate-x-0' : 'translate-x-full'}`}>
            <div className="flex flex-col w-full h-full">
                <div className="flex flex-row p-3 gap-4 border-b border-gray-600">
                    <button onClick={closeSpanComponent}>
                        <XMarkIcon className='size-5 text-red-500'/>
                    </button>
                    <p className='text-lg'>Span Details</p>
                </div>

                <div className="grid grid-cols-4 xl:grid-cols-5 h-full">
                    <div className="flex flex-col col-span-1 p-3">
                        {spanData.map((item) => {
                            return (
                                <div key={item.id} className='flex flex-col'>
                                    <button onClick={() => {
                                        if(selectedParent===item.id){
                                            setSelectedParent()
                                        }else{
                                            setSelectedParent(item.id);
                                        }
                                        setSelectedChild()
                                    }} className={`flex flex-row gap-3 px-2 py-1.5 hover:bg-gray-900 hover:bg-opacity-50 mb-2 rounded-lg items-center`}>
                                        <div className='size-7 bg-blue-500 rounded-md flex justify-center items-center'>
                                            <CodeBracketIcon className='size-4 text-white'/>
                                        </div>
                                        <p className='text-base'>{item.name}</p>
                                        <div className='flex-grow'></div>
                                        <p className='text-green-500 text-sm'>12 ms</p>
                                    </button>
                                    {selectedParent===item.id && (
                                        <div className='flex flex-row'>
                                            <div className="relative w-10">
                                                {children[item.id].map((childItem, index) => {
                                                    const percentage = 100 * ((index+1)/children[item.id].length);                                                
                                                    return (
                                                        <div key={childItem.id} className={`absolute top-0 w-full flex justify-end items-start pb-6 ${selectedChild===childItem.id ? 'z-10' : 'z-0'}`} style={{height: `${percentage}%`}}>
                                                            <div className={`w-1/2 h-full border-l-2 border-b-2 rounded-bl-2xl ${selectedChild===childItem.id ? 'border-blue-500' : 'border-gray-700'}`}></div>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                            <div className='flex flex-col flex-grow'>
                                                {children[item.id].map((childItem) => {
                                                    return (
                                                        <button key={childItem.id} 
                                                        onClick={() => setSelectedChild(childItem.id)} 
                                                        className={`flex flex-row gap-3 pl-2 px-1.5 py-1.5 bg-gray-900 hover:bg-opacity-30 rounded-lg items-center mb-2 ${selectedChild===childItem.id ? 'border-blue-500 bg-opacity-50' : 'border-transparent bg-opacity-0'}`}>
                                                            <div className='size-6 bg-red-500 rounded-md flex justify-center items-center'>
                                                                <CodeBracketIcon className='size-4 text-white'/>
                                                            </div>
                                                            <p className='text-sm'>{childItem.name}</p>
                                                        </button>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                    <div className="flex flex-col col-span-2 xl:col-span-3 border-l border-r border-gray-600 p-3">
                        <p>Scanner Details List</p>
                    </div>
                    <div className="flex flex-col col-span-1 p-3">
                        <div className="flex flex-row justify-between">
                            <p>Basic Details</p>
                            <button onClick={closeSpanComponent}>
                                <ViewColumnsIcon className='size-5 text-blue-500'/>
                            </button>
                        </div>
                    </div>
                </div>


            </div>
        </div>
    );
}

export default SpanComponent