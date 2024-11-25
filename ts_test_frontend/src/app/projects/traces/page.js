'use client'

import React, { useState } from 'react'

import SpanComponent from './components/spanComponent';
import TracesList from './components/tracesList';

function Traces() {

    const [openSpans, setOpenSpans] = useState(false);

    const [selectedTrace, setSelectedTrace] = useState();

    const handleOpenSpans = () => {
        setOpenSpans(true)
    }

    return (
        <div className='flex flex-col w-full h-full p-6 relative'>
            <div className="sm:flex sm:items-center">
                <div className="sm:flex-auto">
                    <h1 className="text-base font-semibold text-gray-300">Traces</h1>
                    <p className="mt-2 text-sm text-gray-400">
                    A list of all the traces in project 1.
                    </p>
                </div>
                
            </div>

            <TracesList setSelectedTrace={setSelectedTrace}/>

            <SpanComponent open={selectedTrace} closeSpanComponent={() => setSelectedTrace()}/>
        </div>
    );
}

export default Traces