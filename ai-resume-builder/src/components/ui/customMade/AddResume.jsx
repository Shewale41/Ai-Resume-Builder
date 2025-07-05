import { Loader2, PlusSquare, User } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useState } from "react";
import { Button } from "../button";
import { Input } from "@/components/ui/input"
import { v4 as uuidv4 } from 'uuid';
import { useUser } from "@clerk/clerk-react";
import GlobalApi from './../../../../Service/GlobalApi';
import { useNavigate } from "react-router-dom";


function AddResume(){

    const[openDialog,setOpenDialog]=useState(false);
    const[resumeTitle,setResumeTitle]=useState();
    const { user } =useUser();
    const[loading,setLoading]=useState(false);
    const navigation = useNavigate();

    const onCreate=async()=>{
        setLoading(true);
        const uuid=uuidv4();
        const data={
          data:{
            title:resumeTitle,
            resumeId:uuid,
            userEmail: user?.primaryEmailAddress?.emailAddress,
            userName: user?.fullName
          }
        }
        console.log(data);
        GlobalApi.createNewResume(data).then(resp=>{
          console.log(resp);
          //if information stored then set loading false
          if(resp){
            setLoading(false);
            navigation('/dashboard/resume/'+uuid+'/edit');
          }

        },(error)=>{
          setLoading(false);
        });

    }

    return(
        <>
        <div className="px-14 py-24 flex items-center justify-center bg-secondary 
        rounded-lg h-[280px] hover:scale-108 hover:shodow-md transition-all  
        border-dashed border-1 cursor-pointer " onClick={()=>{setOpenDialog(true)}}>
            <PlusSquare/>
        </div>
        <Dialog open={openDialog}>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Create new Resume</DialogTitle>
      <DialogDescription>
        Add a title for your new Resume
        <Input className="mx-2 my-2 " placeholder="Ex.Full Stack Developer with 3yr experience" onChange={(e)=>{setResumeTitle(e.target.value)}} />
      </DialogDescription>
      <div className="flex justify-end gap-5">
        <Button variant={"ghost"} onClick={()=>{setOpenDialog(false)}}>Cancel</Button>
        <Button disabled={!resumeTitle || loading}
        onClick={()=>{onCreate()}}>
          {loading?
          <Loader2 className="animate-spin"/>:'Create'
        }
        </Button>
      </div>
      
    </DialogHeader>
  </DialogContent>
</Dialog>
        </>
    );
}

export default AddResume;