import React, { useState } from 'react'
import PersonalDetailForm from './forms/PersonalDetailForm'
import { Button } from '@/components/ui/button'
import { ArrowLeft, ArrowRight, LayoutGrid , Home } from 'lucide-react'
import SummaryForm from './forms/SummaryForm';
import ExperienceForm from './forms/ExperienceForm';
import EducationPreview from './preview/EducationPreview';
import EducationalForm from './forms/EducationalForm';
import SkillsForm from './forms/SkillsForm';
import {Link,Navigate} from 'react-router-dom';
import { useParams } from 'react-router-dom';
import View from '../../src/View';

function FormSection() {
  const [activeFormIndex,setActiveFormIndex] = useState(6);
  const [enableNext,setEnableNext] = useState(false);
  const {resumeId} = useParams();

  return (
    <div>
      <div className='flex justify-between items-center '>
        <div className="flex gap-5">
          <Link to={'/dashboard'}>
          <Button><Home/></Button>
          </Link>
        <Button variant="outline" size="sm" 
        className="flex gap-2" ><LayoutGrid/> Theme</Button>
        </div>
      <div className='flex gap-2'> 
        {
          activeFormIndex>1&&<Button size="sm" onClick={()=>setActiveFormIndex(activeFormIndex-1)}><ArrowLeft/> </Button>
        }
        <Button className="flex gap-2" size="sm"
        disabled={!enableNext}
        onClick={()=>setActiveFormIndex(activeFormIndex+1)}>Next
          <ArrowRight/>
        </Button>
      </div>
      </div>
      {/* Personal Details  */}
      {
        activeFormIndex==1 ? <PersonalDetailForm enableNext={(v)=>setEnableNext(v)}/> : 
        activeFormIndex==2 ?  <SummaryForm enableNext={(v)=>setEnableNext(v)}/>:
        activeFormIndex==3 ? <ExperienceForm enableNext={(v)=>setEnableNext(v)}/>:
        activeFormIndex==4?  <EducationalForm enableNext={(v)=>setEnableNext(v)}/>:
        activeFormIndex==5? <SkillsForm enableNext={(v)=>setEnableNext(v)}/>:
        activeFormIndex==6? <Navigate to={'/my-resume/'+resumeId+'/view'}/>:
        null }
      {/* Summary  */}

      {/* Professional Experience */}

      {/* Education  */}

      {/* Skills */}

    </div>
  )
}

export default FormSection
