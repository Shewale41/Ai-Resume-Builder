import React from 'react'

function SkillsPreview({resumeInfo}) {
  return (
    <div className='my-2'>
      <h2 className='text-center font-semibold text-md ' style={{color:resumeInfo?.themeColor}}>Skills</h2>
      <hr className='my-1 ' style={{borderColor:resumeInfo?.themeColor}}></hr>

      <div className='grid grid-cols-2 gap-3 my-4'>
        {
          resumeInfo?.skills.map((skills,index)=>(
            <div className='flex justify-between items-center '>
              <h2 className='text-xs'>{skills?.name}</h2>
              <div className='h-2 bg-gray-200 w-[120px]'>
                <div className='h-2' 
                style={{backgroundColor:resumeInfo?.themeColor,
                        width:skills.rating+'%'
                }}   >
                </div>
              </div>
            </div>
          ))
        }
      </div>
      </div>
  )
}

export default SkillsPreview
