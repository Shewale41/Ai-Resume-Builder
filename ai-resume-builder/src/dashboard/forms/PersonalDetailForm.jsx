import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import GlobalApi from '../../../Service/GlobalApi';
import { LoaderCircle } from 'lucide-react';
import { toast } from 'sonner';

function PersonalDetailForm({enableNext}) {

    const params=useParams();
    const {resumeInfo,setResumeInfo} = useContext(ResumeInfoContext);
    const [formData,setFormData] = useState();
    const [loading,setLoading] = useState(false);

    useEffect(()=>{
      console.log(params);
    },[])

    const handleInputChnage=(e)=>{
      enableNext(false);
        const {name,value} = e.target;

        setFormData({
          ...formData,
          [name]:value
        })

        setResumeInfo({
          ...resumeInfo,
          [name]:value
        })
    }

    const onSave=(e)=>{
      e.preventDefault();
      setLoading(true);
      const data={
        data:formData
      }
      GlobalApi.UpdateResumeDetail(params?.resumeId,data).then(resp=>{
        console.log(resp);
        enableNext(true);
        setLoading(false);
        toast("Event has been created.");
      },(error)=>{
        setLoading(false);
      })
    }
 
  return (
    
    <div className='p-5 shadow-lg rounded-lg border-t-purple-500 border-t-4 mt-10 '>
        <h2 className='font-bold text-lg '>Personal Details</h2>
        <p>Get started with the basic personal information</p>

        <form onSubmit={onSave}>
          <div className='grid grid-cols-2 mt-5 gap-3'>
          <div>
            <label className='text-sm'>First Name</label>
            <Input name="firstName" required defaultValue={resumeInfo?.firstName} onChange={handleInputChnage}/>
          </div>
          <div>
            <label className='text-sm'>Last Name</label>
            <Input name="lastName" required defaultValue={resumeInfo?.lastName} onChange={handleInputChnage}/>
          </div>
          <div className='col-span-2'>
            <label className='text-sm'>Job Title</label>
            <Input name="jobTitle" required defaultValue={resumeInfo?.jobTitle} onChange={handleInputChnage}/>
          </div>
          {/* col-span-2 means take the two cols as span */}
          <div className='col-span-2'>
            <label className='text-sm'>Address</label>
            <Input name="address" required defaultValue={resumeInfo?.address} onChange={handleInputChnage}/>
          </div>
          <div>
            <label className='text-sm'>Phone</label>
            <Input name="phone" required defaultValue={resumeInfo?.phone} onChange={handleInputChnage}/>
          </div>
          <div>
            <label className='text-sm'>Email</label>
            <Input name="email" required defaultValue={resumeInfo?.email} onChange={handleInputChnage}/>
          </div>
          </div>
          <div className='mt-3 flex justify-end'>
              <Button type="submit"
              disabled={loading}>{loading?<LoaderCircle className='animate-spin'/>: 'Save' } 
              </Button>
          </div>
        </form>
    </div>
  )
}

export default PersonalDetailForm
