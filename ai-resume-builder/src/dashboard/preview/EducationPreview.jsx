import React from 'react'

function EducationPreview({resumeInfo}) {
  return (
    <div className='my-2'>
      <h2 className='text-center font-semibold text-md ' style={{color:resumeInfo?.themeColor}}>Education</h2>
      <hr className=' my-1 ' style={{borderColor:resumeInfo?.themeColor}}></hr>
      {
        resumeInfo?.education.map((education,index)=>(
            <div key={index} className='my-5'>
                <h2 className='text-sm font-bold ' style={{color:resumeInfo?.themeColor}}>{education?.universityName}</h2>
                <h2 className='text-xs flex justify-between'>
                    {education?.degree} in {education?.major}
                    <span>{education?.startDate}-{education.endDate}</span>
                </h2>
                <p className="text-xs my-2 ">{education?.description}</p>
            </div>
        ))
      }
    </div>  
  )
}

export default EducationPreview
