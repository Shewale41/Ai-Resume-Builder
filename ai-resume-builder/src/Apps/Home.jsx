//this is here my landing page first page

import Header from "@/components/ui/customMade/Header";
import { UserButton } from "@clerk/clerk-react";

function Home(){
    return(
        <>
            <div>
                <Header/>
                Landing Page
            </div>
        </>
    );
}

export default Home;