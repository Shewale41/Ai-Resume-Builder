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
    const [summary, setSummary] = useState();
    const [loading,setLoading] = useState(false);
    const params = useParams();
    const [aiGeneratedSummaryList,setAiGeneratedSummaryList] = useState([]);

    useEffect(()=>{
        summary && setResumeInfo({
            ...resumeInfo,
            summary: summary
        })
    },[summary])

    const GenerateSummaryFromAI=async()=>{
        setLoading(true)
        const PROMPT = "Job Title: {jobTitle} , Depends on job title give me list of  summery for 3 experience level, Mid Level and Freasher level in 3 -4 lines in array format, With summery and experience_level Field in JSON Format".replace('{jobTitle}',resumeInfo?.jobTitle);
        try {
            const result = await AIChatSession.sendMessage(PROMPT);
            const text = await result.response.text();
            console.log('AI response :',text);
            const parsed = JSON.parse(text);
            setAiGeneratedSummaryList(parsed.summaries || []);
        } catch (e) {
            setAiGeneratedSummaryList([]);
        }
        setLoading(false);
    }

    const onSave=(e)=>{
        e.preventDefault();
        setLoading(true)
        const data={
            data:{
                summary: summary
            }
        }
        GlobalApi.UpdateResumeDetail(params?.resumeId,data).then(resp=>{
            enableNext && enableNext(true);
            setLoading(false);
            toast("Details updated")
        },(error)=>{
            setLoading(false);
        })
    }

    return (
    <div>
         <div className='p-5 shadow-lg rounded-lg border-t-purple-500 border-t-4 mt-10'>
        <h2 className='font-bold text-lg'>Summary</h2>
        <p>Add Summary for your job title</p>

        <form className='mt-7' onSubmit={onSave}>
            <div className='flex justify-between items-end'>
                <label>Add Summary</label>
                <Button variant="outline" onClick={GenerateSummaryFromAI} 
                type="button" size="sm" className="border-[#9156ff] flex gap-2"> 
                <Brain className='h-4 w-4' />  Generate from AI</Button>
            </div>
            <Textarea className="mt-5" required
            value={summary || ''}
            defaultValue={summary ? summary : resumeInfo?.summary}
            onChange={(e)=>setSummary(e.target.value)}
            />
            <div className='mt-2 flex justify-end'>
            <Button type="submit"
                disabled={loading}>
                    {loading?<LoaderCircle className='animate-spin' />:'Save'}
                    </Button>
            </div>
        </form>
        </div>

        {Array.isArray(aiGeneratedSummaryList) && aiGeneratedSummaryList.length > 0 && <div className='my-5'>
            <h2 className='font-bold text-lg'>Suggestions</h2>
            {aiGeneratedSummaryList.map((item,index)=>(
                <div key={index} 
                onClick={()=>setSummary(item?.summary)}
                className='p-5 shadow-lg my-4 rounded-lg cursor-pointer'>
                    <h2 className='font-bold my-1 text-primary'>Level: {item?.experience_level}</h2>
                    <p>{item?.summary}</p>
                </div>
            ))}
        </div>}

    </div>
  )
}

export default SummaryForm
