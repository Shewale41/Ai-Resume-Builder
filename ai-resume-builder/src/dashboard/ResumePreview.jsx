import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import React, { useContext } from 'react'
import PersonalDetailPreview from './preview/PersonalDetailPreview';
import SummaryPreview from './preview/SummaryPreview';
import ExperiencePreview from './preview/ExperiencePreview';
import EducationPreview from './preview/EducationPreview';
import SkillsPreview from './preview/SkillsPreview';

//we need context folder to share the data from form section to ResumePreview section (and also share data where needed)

function ResumePreview() {

    const {resumeInfo,setResumeInfo} = useContext(ResumeInfoContext);
  return (
    <div className='shadow-lg h-full p-14 border-t-[20px]'
     style={{borderColor:resumeInfo?.themeColor}}>

      {/*Personal Detail */}
      <PersonalDetailPreview resumeInfo={resumeInfo}/>
      {/*Summary */}
      <SummaryPreview resumeInfo={resumeInfo}/>
      {/*Professional Experience */}
      <ExperiencePreview resumeInfo={resumeInfo}/>
      {/*Educational */}
      <EducationPreview resumeInfo={resumeInfo}/>
      {/* Skills */}
      <SkillsPreview resumeInfo={resumeInfo}/>
    </div>
  )
}

export default ResumePreview
