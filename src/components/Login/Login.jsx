import { getAuth, signInWithPopup, signOut } from "firebase/auth";
import app from "../../firebase/firebase.init";
import { GoogleAuthProvider } from "firebase/auth";
import { useState } from "react";
import { GithubAuthProvider } from "firebase/auth/web-extension";

const Login = () => {

    const [user, setUser] = useState(null);
    const auth = getAuth(app);
    const provider = new GoogleAuthProvider();
    const githubProvider = new GithubAuthProvider();

    const handleGoogleSignin = () => {
        signInWithPopup(auth, provider)
            .then(result => {
                const loggedInUser = result.user;
                console.log(loggedInUser);
                setUser(loggedInUser);
            })
            .catch(error => console.log(error.message))

    }
    const handleGithubSignIn = () => {
        signInWithPopup(auth, githubProvider)
            .then(result => {
                const loggedInUser = result.user;
                console.log(loggedInUser);
                setUser(loggedInUser);
            })
            .catch(error => console.log(error.message))
    }
    const handleSignOut = () => {
        signOut(auth)
            .then(result => {
                console.log(result);
                setUser(null);
            })
            .catch(error => {
                console.log(error)
            })
    }


    return (
        <div>

            {
                user ?
                    <button onClick={handleSignOut}>Sign out</button> :
                    <>
                        <button onClick={handleGoogleSignin}>Google login</button>
                        <button onClick={handleGithubSignIn}>Github Login</button>
                    </>
            }
            {user && <div>
                <h3>User: {user.displayName}</h3>
                <p>Email: {user.email}</p>
                <img src={user.photoURL} alt="" />
            </div>
            }
        </div>
    );
};

export default Login;