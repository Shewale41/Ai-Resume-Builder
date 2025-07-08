import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import GlobalApi from '../../../Service/GlobalApi';
import { toast } from 'sonner';
import { Brain, LoaderCircle } from 'lucide-react';
import {AIChatSession} from '../../../Service/AIModal';

function SummaryForm({enableNext}) {

    const {resumeInfo,setResumeInfo} = useContext(ResumeInfoContext);

    const [summary, setSummary] = useState("");
    const [loading,setLoading] = useState(false);
    const [AiGeneratedSummaryList,setAiGeneratedSummaryList] = useState();

    const prompt ="job title : {jobTitle} , Depends on the job title give me awesome summary for my resume within 4-5 lines in JSON format with field experience level and summary with experience level for fresher,Mid-level , Experience ";

    const params = useParams(); 

    const handleChange = (e) => {
        setSummary(e.target.value);
        setResumeInfo({
            ...resumeInfo,
            summary: e.target.value
        });
    };

     const onSave=(e)=>{
        e.preventDefault();
       
        setLoading(true)
        const data={
            data:{
                summary:summary
            }
        }
        GlobalApi.UpdateResumeDetail(params?.resumeId,data).then(resp=>{
            console.log(resp);
            enableNext(true);
            setLoading(false);
            toast("Details updated")
        },(error)=>{
            setLoading(false);
        })
    }

    const GenerateSummaryFromAI = async()=>{
      setLoading(true);
        const PROMPT = prompt.replace('{jobTitle}',resumeInfo?.jobTitle);
        console.log(PROMPT);
        const result = await AIChatSession.sendMessage(PROMPT);
        console.log(JSON.parse(result.response.text()));
        setAiGeneratedSummaryList(JSON.parse([result.response.text()]));
      setLoading(false);  
    }

  return (
    <div>
      <div className='p-5 shadow-lg rounded-lg border-t-purple-500 border-t-4 mt-10 '>
        <h2 className='font-bold text-lg '>Summary</h2>
        <p>Add Summary to your job title</p>

        <form className='mt-7' onSubmit={onSave}>
            <div className='flex justify-between items-end '>
                <label>Add Summary</label>
                <Button variant="outline" type="button" size="sm" className="border-[#9156ff] flex gap-2 "    onClick={GenerateSummaryFromAI}>  <Brain className='h-4 w-4 '/> Generate With AI</Button>
            </div>
            <Textarea className="mt-5" required
            value={summary}
            onChange={handleChange} />
            <div className='mt-3 flex justify-end'>
              <Button type="submit"
              disabled={loading}>{loading?<LoaderCircle className='animate-spin'/>: 'Save' } 
              </Button>
          </div>              
        </form>
      </div>
      {
        AiGeneratedSummaryList&& <div>
          <h2 className='font-bold text-lg '>Suggestions</h2>
          {
            AiGeneratedSummaryList&&AiGeneratedSummaryList.map((item,index)=>(
              <div>
                <h2 className='font-bold my-1'>Level : {item?.experienceLevel}</h2>
                <p>{item?.summary}</p>
              </div>
            ))
          }
        </div>  
      }
      </div>
  )
}

export default SummaryForm
