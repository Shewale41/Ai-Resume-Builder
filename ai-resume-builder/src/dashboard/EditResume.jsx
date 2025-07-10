import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import FormSection from './FormSection';
import ResumePreview from './ResumePreview';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import dummy from '@/data/dummy';
import GlobalApi from '../../Service/GlobalApi';

function EditResume() {
    const {resumeId} =useParams();
    const [resumeInfo,setResumeInfo] = useState();

    useEffect(()=>{
        GetResumeInfo();
    },[])

    const GetResumeInfo=()=>{
      GlobalApi.GetResumeById(resumeId).then(resp=>{
        console.log(resp.data.data);
        setResumeInfo(resp.data.data);
      })
    }

  return (
    <ResumeInfoContext.Provider value={{resumeInfo,setResumeInfo}}>
    {/*here we building resume form along with live preview of resume */}
    <div className='grid grid-cols-1 md:grid-cols-2 p-10 gap-10'>
      {/* Form Section  */}
      <FormSection/>
      {/* Preview Section*/}
      <ResumePreview/>
    </div>
    </ResumeInfoContext.Provider>
  )
}

export default EditResume
