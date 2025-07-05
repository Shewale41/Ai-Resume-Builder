//this is my dashboard page

import AddResume from "@/components/ui/customMade/AddResume";
import { UserButton, useUser } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import GlobalApi from './../../Service/GlobalApi';
import ResumeCardItem from "@/components/ui/customMade/ResumeCardItem";

function DashBoard(){

    const {user} = useUser();
    const [resumeList,setResumeList]=useState([]);

    useEffect(()=>{
        user&&GetResumeList();
    },[user]);

    //to get user resumes list 
    const GetResumeList = ()=>{
        GlobalApi.GetUserResumes(user?.primaryEmailAddress?.emailAddress)
        .then(resp=>{
            console.log(resp.data);
            setResumeList(resp.data.data);
        })
    }


    return(
        <>
            <div className="p-10 md:px-20 lg:px-32">
                <h2 className="font-bold text-2xl">My Resume</h2>
                <p>Start creating Resume with AI for your next job role</p>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 mt-10 gap-5 ">
                    <AddResume/>
                    
                    {
                        //here used map to pass the resumes to create cards and display on dashboard (existing resumes of that user);
                        resumeList.length>0 && resumeList.map((resume,index)=>(<ResumeCardItem resume={resume} index={index}/>
                        ))
                    }
                </div>
            </div>
        </>
    );
}

export default DashBoard;