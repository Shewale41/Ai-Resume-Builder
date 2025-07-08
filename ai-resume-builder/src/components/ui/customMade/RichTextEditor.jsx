import { Brain, LoaderCircle } from 'lucide-react';
import React, { useContext, useState } from 'react'
import { BtnBold, BtnBulletList, BtnClearFormatting, BtnItalic, BtnLink, BtnNumberedList, BtnStrikeThrough, BtnUnderline, Editor, EditorProvider, Separator, Toolbar } from 'react-simple-wysiwyg'
import { Button } from '../button';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import { toast } from 'sonner';
import { AIChatSession } from '../../../../Service/AIModal';

function RichTextEditor({ value, onRichTextEditorChange, index }) {

    const {resumeInfo,setResumeInfo}=useContext(ResumeInfoContext);
    const [loading,setLoading]=useState(false);
    const  PROMPT ="job title : {positionTitle} depends on position title give me 4-5 bullet points for my work experince in resume , give me the result in html fromat"

    const GenerateSummaryWithAi=async()=>{
      setLoading(true);
      if(!resumeInfo.experience[index].title){
        toast('Please Add position title');
        return;
      }
      const prompt=PROMPT.replace('{positionTitle}',resumeInfo.experience[index].title);
      const result = await AIChatSession.sendMessage(prompt);
      console.log(result.response.text());
      const resp = JSON.parse(result.response.text());
      console.log('AI Response:', resp);
      let aiText = '';
      if (Array.isArray(resp)) {
        aiText = resp[0];
      } else if (typeof resp === 'object' && resp !== null && resp.text) {
        aiText = resp.text;
      } else if (typeof resp === 'string') {
        aiText = resp;
      }
      onRichTextEditorChange({ target: { value: aiText } }, 'workSummary', index);
      setLoading(false);      
    }

  return (
    <div>
            
              <div className='flex justify-between my-2'>
                <label className='text-xs'>Summary</label>
                <Button variant="outline" size="sm"  
                className="flex gap-2 border-[#9156ff] text-[#9156ff]" onClick={GenerateSummaryWithAi} >
                  {
                  loading?<LoaderCircle className="animate-spin" />:<><Brain/>Generate With AI</>
                  }
                  </Button>
              </div>
            <EditorProvider>
                <Editor value={value} onChange={e => onRichTextEditorChange(e, 'workSummary', index)}>
                <Toolbar>
                <BtnBold />
                <BtnItalic />
                <BtnUnderline />
            <BtnStrikeThrough />
            <Separator />
            <BtnNumberedList />
            <BtnBulletList />
            <Separator />
            <BtnLink />
            <BtnClearFormatting />
            </Toolbar>
            </Editor>    
            </EditorProvider>
    </div>
  )
}

export default RichTextEditor
