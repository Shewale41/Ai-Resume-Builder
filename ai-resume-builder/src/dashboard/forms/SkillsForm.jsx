
import { Input } from '@/components/ui/input';
import { Rating } from '@smastrom/react-rating'
import '@smastrom/react-rating/style.css'
import {React,useState,useEffect,useContext} from 'react';
import { Button } from '@/components/ui/button';
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import GlobalApi from './../../../Service/GlobalApi'
import { useParams } from 'react-router-dom'
import { LoaderCircle } from 'lucide-react';


function SkillsForm({enableNext}){

    const [loading,setLoading] = useState(false);
    const {resumeId} = useParams();
    const {resumeInfo,setResumeInfo} = useContext(ResumeInfoContext);
    const [skillsList,setSkillsList] = useState([
        {
            name:'',
            rating:0
        }
    ]);


    const handleChange=(index,name,value)=>{
        const newList = skillsList.slice();
        newList[index][name] = value;
        setSkillsList(newList);
    }

    const AddNewSkills=()=>{
        setSkillsList([...skillsList,{
            name:'',
            rating:0
        }])
    }

    const RemoveSkills=()=>{
        if(skillsList.length > 1){
        setSkillsList(skillsList=>skillsList.slice(0,-1));
        }
    }

    const onSave=()=>{
        setLoading(true);
        const data={
            data:{
                skills:skillsList?.map(({ id, ...rest }) => rest)
            }
        }

        GlobalApi.UpdateResumeDetail(resumeId,data).then(resp=>{
            console.log(resp);
            setLoading(false);
            toast('Details updated')
        },(error)=>{
            setLoading(false);
            toast('Sever Error ,try again !');
        })
    }

    useEffect(()=>{
        setResumeInfo({
            ...resumeInfo,
            skills:skillsList
        })
    },[skillsList])

    return(
        <>
        <div className='p-5 shadow-lg rounded-lg border-t-purple-500 border-t-4 mt-10 '>
        <h2 className='font-bold text-lg '>Skills</h2>
        <p>Add your top professional key skills</p>
        <div>
            {
                skillsList.map((item,index)=>(
                    <div key={index}>
                        <div className="flex justify-between border rounded-lg p-3 gap-2 mb-2 ">
                            <div>
                                <label className="text-xs">Name</label>
                                <Input onChange={(e)=>handleChange(index,'name',e.target.value)}></Input>
                            </div>
                            <Rating style={{maxWidth:130}} value={item?.rating}
                            onChange={(v)=>handleChange(index,'rating',v)}/>

                        </div>    
                    </div>
                ))
            }
        </div>
        <div className='flex gap-2 mt-2'>
            <Button variant="outline" onClick={AddNewSkills} className="text-primary"> + Add More Skills</Button>
            <Button variant="outline" onClick={RemoveSkills} className="text-primary"> - Remove</Button>

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

export default SkillsForm;