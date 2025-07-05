import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import React, { useContext } from 'react'

//we need context folder to share the data from form section to ResumePreview section (and also share data where needed)

function ResumePreview() {

    const {resumeInfo,setResumeInfo} = useContext(ResumeInfoContext);
  return (
    <div>

      {/*Personal Detail */}

      {/*Summary */}

      {/*Professional Experience */}

      {/*Educational */}

      {/* Skills */}

    </div>
  )
}

export default ResumePreview
