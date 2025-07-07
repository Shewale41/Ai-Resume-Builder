import React from 'react'

function PersonalDetailPreview({resumeInfo}) {
  return (
    <>
    <div>
        <h2 className='text-lg text-center font-bold '
        style={{color:resumeInfo?.themeColor}} >{resumeInfo?.firstName} {resumeInfo?.lastName}</h2>
        <h2 className='text-sm text-center font-medium '>{resumeInfo?.jobTitle}</h2>
        <h2 className='text-center text-xs font-normal '
        style={{color:resumeInfo?.themeColor}}>{resumeInfo?.address}</h2>

      <div className=' flex justify-between '>
      <h2 className='text-xs font-noraml ' style={{color:resumeInfo?.themeColor}}>{resumeInfo?.phone}</h2>
      <h2 className='text-xs font-noraml ' style={{color:resumeInfo?.themeColor}}>{resumeInfo?.email}</h2>
    </div>
      <hr className='my-2 border-[1.5px]' style={{borderColor:resumeInfo?.themeColor}}></hr>
    </div>

    </>
  )
}

export default PersonalDetailPreview
