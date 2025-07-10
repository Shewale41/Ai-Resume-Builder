import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import GlobalApi from './../../../Service/GlobalApi'
import { useParams } from 'react-router-dom'
import React, { useEffect,useContext, useState } from 'react'
import { LoaderCircle } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';

function EducationalForm({ enableNext }) {

    const [loading,setLoading]=useState(false);
    const params = useParams();
    const {resumeInfo,setResumeInfo}=useContext(ResumeInfoContext);
    const [educationList,setEducationList]=useState([
        {
            universityName:'',
            degree:'',
            major:'',
            startDate:'',
            endDate:'',
            description:''
        }
    ]);

    const handleInputChange=(index, event)=>{
        const { name, value } = event.target;
        const newList = [...educationList];
        newList[index][name] = value;
        setEducationList(newList);
    }

    const AddNewEducation=()=>{
        setEducationList([...educationList,{
            universityName:'',
            degree:'',
            major:'',
            startDate:'',
            endDate:'',
            description:''
        }])
    }

    const RemoveEducation=()=>{
        if (educationList.length > 1) {
            setEducationList(educationList.slice(0, -1));
        }
    }

    useEffect(()=>{
        setResumeInfo({
            ...resumeInfo,
            education:educationList
        });
     
    },[educationList]);

    const onSave=(e)=>{
        if (e) e.preventDefault();
        setLoading(true)
        enableNext && enableNext(false);
        const data={
            data:{
                education:educationList?.map(({ id, ...rest }) => rest)
            }
        }

         console.log(educationList)

        GlobalApi.UpdateResumeDetail(params?.resumeId,data).then(res=>{
            console.log(res);
            setLoading(false);
            enableNext && enableNext(true);
            toast('Details updated !')
        },(error)=>{
            setLoading(false);
            toast('Server Error,please try again')
        })
    }

  return (
    <>
    <div className='p-5 shadow-lg rounded-lg border-t-purple-500 border-t-4 mt-10 '>
        <h2 className='font-bold text-lg '>Education</h2>
        <p>Add educational details</p>
    <div>
        {
            educationList.map((item,index)=>
                <div key={index}>
                    <div className='grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg'>
                    <div className='col-span-2'>
                        <label>University Name</label>
                        <Input name='universityName' value={item.universityName} 
                        defaultValue={item?.universityName} onChange={(event)=>handleInputChange(index,event)}></Input>
                    </div>
                    <div>
                        <label>Degree</label>
                        <Input name='degree' value={item.degree} onChange={(event)=>handleInputChange(index,event)}></Input>
                    </div>
                    <div>
                        <label>Major</label>
                        <Input name='major' value={item.major} onChange={(event)=>handleInputChange(index,event)}></Input>
                    </div>
                    <div>
                        <label>Start Date</label>
                        <Input name='startDate' type="date" value={item.startDate} onChange={(event)=>handleInputChange(index,event)}></Input>
                    </div>
                    <div>
                        <label>End Date</label>
                        <Input name='endDate' type="date" value={item.endDate} onChange={(event)=>handleInputChange(index,event)}></Input>
                    </div>
                    <div className="col-span-2">
                        <label>Description</label>
                        <Textarea name='description' value={item.description} onChange={(event)=>handleInputChange(index,event)}></Textarea>
                    </div>
                    </div>
                </div>
            )
        }
    </div>
            <div className='flex gap-2'>
            <Button variant="outline" onClick={AddNewEducation} className="text-primary"> + Add More Education</Button>
            <Button variant="outline" onClick={RemoveEducation} className="text-primary"> - Remove</Button>

            </div>
            <div className="my-3">
            <Button disabled={loading} onClick={onSave}>
            {loading?<LoaderCircle className='animate-spin' />:'Save'}    
            </Button>
            </div>
            
    </div>
    </>    
  )
}

export default EducationalForm