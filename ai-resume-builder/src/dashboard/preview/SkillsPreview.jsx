import React from 'react'

function SkillsPreview({resumeInfo}) {
  return (
    <div className='my-2'>
      <h2 className='text-center font-semibold text-md ' style={{color:resumeInfo?.themeColor}}>Skills</h2>
      <hr className='my-1 ' style={{borderColor:resumeInfo?.themeColor}}></hr>

      <div className='grid grid-cols-2 gap-3 my-4'>
        {
          Array.isArray(resumeInfo?.skills) && resumeInfo.skills.map((skills,index)=>(
            <div className='flex justify-between items-center ' key={index}>
              <h2 className='text-xs'>{skills?.name}</h2>
              <div className='h-2 bg-gray-200 w-[120px]'>
                <div className='h-2' 
                // here the background color is set to black for testing purspose remember it has to be resumeInfo.themeColor
                style={{
                    backgroundColor:'black',
                    width: (Math.max(0, Math.min(100, (skills.rating <= 5 ? skills.rating * 20 : (skills.rating / 20) * 20))) + '%')
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
