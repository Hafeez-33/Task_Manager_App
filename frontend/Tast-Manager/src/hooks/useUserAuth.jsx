import { useContext } from 'react'
import { UserContext } from '../context/userContext';
import {useNavigate} from 'react-router-dom';
import { useEffect } from 'react';

const useUserAuth = () => {
    const {user,loading,clearUser} = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        if(loading) return; // Wait until loading is complete
        if(user) return; // User is authenticated, no need to redirect

        if(!user){
            clearUser();
            navigate('/login');
        }
    },[user,loading,navigate,clearUser]);
}

export default useUserAuth