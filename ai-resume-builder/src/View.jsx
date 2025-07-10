
import { useEffect, useState } from 'react';
import Header from '../src/components/ui/customMade/Header';
import { Button } from './components/ui/button';
import { ResumeInfoContext } from './context/ResumeInfoContext';
import ResumePreview from './dashboard/ResumePreview';
import { useParams } from 'react-router-dom';
import GlobalApi from '../Service/GlobalApi';
import { RWebShare } from 'react-web-share';

function View(){

    const [resumeInfo,setResumeInfo]=useState([]);
    const {resumeId} = useParams();

    const GetResumeInfo = ()=>{
        GlobalApi.GetResumeById(resumeId).then(resp=>{
            console.log(resp.data.data);
            setResumeInfo(resp.data.data);
        })
    }

    useEffect(()=>{
        GetResumeInfo();
    },[resumeInfo]);

    //too easy used here to download in future i'll use some other SDK maybe ;)
    //chnages are made in the css file to only download the ResumePreview and not whole webpage

    const HandleDownload = ()=>{
        window.print();
    }

    return(
        <>
        <ResumeInfoContext.Provider value={{resumeInfo,setResumeInfo}}>
            <div id="no-print">
            <Header/>
        <div className='my-10 mx-10 md:mx-20 lg:mx-35'>
                <h2 className='text-center text-2xl font-medium'>Congrats! Your Ai generated resume is ready! </h2>
                <p className='text-center text-gray-400 '>You're ready to download and share your resume with freinds and collegues with url</p>
                <div className='flex justify-between px-44 my-10'>
                    <Button onClick={HandleDownload}>Download</Button>
                    <RWebShare
        data={{
          text: "Hello everyone,This is my resume open url to see it",
          url: import.meta.env.VITE_BASE_URL+"/my-resume/"+resumeId+"/view" ,
          title: resumeInfo?.firstName+" "+resumeInfo?.lastName+" resume" ,
        }}
        onClick={() => console.log("shared successfully!")}
      >
        <Button>Share 🔗</Button>
                   </RWebShare>
                </div>
                </div>
                
            </div>
        <div className='my-10 mx-10 md:mx-20 lg:mx-35'>
            <div id="print-area">
                    <ResumePreview/>
            </div>
            </div>
            
        </ResumeInfoContext.Provider>    
        </>
    );
}

export default View; 