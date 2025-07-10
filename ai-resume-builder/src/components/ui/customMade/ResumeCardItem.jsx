import { Notebook } from 'lucide-react';
import React from 'react'
import { Link } from 'react-router-dom';

function ResumeCardItem({resume}) {
  return (
    <Link to={'/dashboard/resume/'+resume.documentId+'/edit'}>
    <div>
      <div className='p-14  bg-gradient-to-b form-pink-100 via-purple-200
      to-blue-200 flex justify-center 
      items-center h-[280px] border border-[#9156ff] rounded-lg
      hover:scale-105 transition-all hover:shadow-md shadow-[#9156ff] '>
        {/* <Notebook/> */}
        <img src="cv.png" width={80} height={80}></img>
      </div>
      <h2 className='text-center my-1 '>{resume.title}</h2>
    </div>
    </Link>
  )
}

export default ResumeCardItem;
