import React from 'react'

function ExperiencePreview({resumeInfo}) {
  return (
    <div className='my-2'>
      <h2 className='text-center font-semibold text-md ' style={{color:resumeInfo?.themeColor}}>Professional Experience</h2>
      <hr className='my-1 ' style={{borderColor:resumeInfo?.themeColor}}></hr>
      {
        resumeInfo?.experience.map((experience,index)=>(
            <div key={index} className='my-5'>
                <h2 className='font-bold text-sm' style={{color:resumeInfo?.themeColor}}>{experience?.title}</h2>
                <h2 className='flex justify-between text-xs font-semibold '>
                {experience?.companyName},
                {experience?.city},
                {experience?.state}
                <span>{experience.startDate} - {experience?.currentlyWorking?'Presenet':experience.endDate}</span>
                </h2>
                <p className='text-xs my-2'>{experience?.workSummery}</p>
            </div>
        ))
      }
    </div>
  )
}

export default ExperiencePreview
