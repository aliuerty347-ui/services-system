'use client';
import { Link } from 'lucide-react';
import './navbar.css'
import { useAuth, SignInButton, SignOutButton, UserButton, SignUp, SignUpButton } from "@clerk/nextjs";
import { useRouter } from 'next/navigation';

export default function Navbar() {
    const { isSignedIn, isLoaded } = useAuth();
    const router = useRouter()
    if (!isLoaded) return null;
    function j() {
        router.push('/services')
    }
    function r() {

        router.push('/dash')

    }
    return (
        <nav>
            <div>
                Services System
            </div>
            <div>


                {!isSignedIn ? (<>
                    <SignInButton >
                        <button className="SignInButton">Sign in</button>
                    </SignInButton>
                    <SignUpButton mode="modal">
                        <button className="SignUpButton">Sign up</button>
                    </SignUpButton>
                </>


                ) : (<>
                    <button className='btn-serv' onClick={j}>services</button>
                    <button className='btn-serv' onClick={r}> create services</button>
                    <UserButton />
                </>
                )}
            </div>
        </nav>
    );
}