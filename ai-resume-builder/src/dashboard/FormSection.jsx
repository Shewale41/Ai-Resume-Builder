import React, { useState } from 'react'
import PersonalDetailForm from './forms/PersonalDetailForm'
import { Button } from '@/components/ui/button'
import { ArrowLeft, ArrowRight, LayoutGrid } from 'lucide-react'

function FormSection() {
  const [activeFormIndex,setActiveFormIndex] = useState(1);
  const [enableNext,setEnableNext] = useState(false);
  return (
    <div>
      <div className='flex justify-between items-center '>
        <Button variant="outline" size="sm" 
        className="flex gap-2" ><LayoutGrid/> Theme</Button>
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
      {activeFormIndex==1 ? <PersonalDetailForm enableNext={(v)=>setEnableNext(v)}/> : null}
      {/* Summary  */}

      {/* Professional Experience */}

      {/* Education  */}

      {/* Skills */}

    </div>
  )
}

export default FormSection
