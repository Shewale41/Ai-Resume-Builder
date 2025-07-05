import { Link } from "react-router-dom";
import { Button } from "../button";
import { UserButton, useUser } from "@clerk/clerk-react";

function Header() {
  const { user, isSignedIn } = useUser();

  return (
    <>
      <div className="px-5 py-5  flex  justify-between shadow-md ">
        <img src="logo.svg" height={100} width={100}></img>

        {isSignedIn ? (
          <div className="flex items-center gap-2 justify-center ">
            <Link to={"/dashboard"}>
              <Button variant="outline">DashBoard</Button>
            </Link>
            <UserButton></UserButton>
          </div>
        ) : (
          <Link to={"/auth/sign-in"}>
            <Button>Get Started</Button>
          </Link>
        )}
      </div>
    </>
  );
}

export default Header;
