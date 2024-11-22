'use client'

import React, { useState } from 'react'
import SpanComponent from './spanComponent';

function Traces() {

    const [openSpans, setOpenSpans] = useState(false);

    const handleOpenSpans = () => {
        setOpenSpans(true)
    }

    return (
        <div className='flex flex-col w-full h-full p-6 relative'>
            <div className="flex flex-row gap-3">
                <p>Traces</p>
                <button onClick={handleOpenSpans} className='group'>
                    <p className='text-blue-500 group-hover:underline'>Open Spans</p>
                </button>
            </div>

            <SpanComponent open={openSpans} closeSpanComponent={() => setOpenSpans(false)}/>
        </div>
    );
}

export default Traces