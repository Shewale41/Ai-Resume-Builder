//this is my dashboard page

import AddResume from "@/components/ui/customMade/AddResume";
import { UserButton } from "@clerk/clerk-react";

function DashBoard(){
    return(
        <>
            <div className="p-10 md:px-20 lg:px-32">
                <h2 className="font-bold text-2xl">My Resume</h2>
                <p>Start creating Resume with AI for your next job role</p>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 mt-10  ">
                    <AddResume/>
                </div>
            </div>
        </>
    );
}

export default DashBoard;