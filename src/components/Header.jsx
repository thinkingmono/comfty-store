import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { logoutUser } from "../features/user/userSlice"
import { clearCart } from "../features/cart/cartSlice"
import { useQueryClient } from "@tanstack/react-query"

const Header = () => {
    //navigate declaration
    const navigate = useNavigate();
    //dispatch declaration to access store actions.
    const dispatch = useDispatch();
    //useSelector to capture user from store's user.
    const { user } = useSelector((store) => store.user);
    //Query client declaration
    const queryClient = useQueryClient();

    //function to handle user's logout.
    const handleLogout = () => {
        //Navigate to home
        navigate('/');
        //Clear cart to 0 items
        dispatch(clearCart());
        //Logout user session.
        dispatch(logoutUser())
        /*Remove Cached Queries*/
        queryClient.removeQueries();
    }

    return (
        //Topbar links. Display register and login links or username if there is a user.
        <header className="bg-neutral py-2 text-neutral-content">
            <div className="align-element flex justify-center sm:justify-end">
                {user ?
                    <div className="flex gap-x-2 sm:gap-x-8 items-center">
                        <p className="text-xs sm:text-sm">Hello, {user.username}</p>
                        <button type="button" className="btn btn-xs btn-outline btn-primary" onClick={handleLogout}>Logout</button>
                    </div>
                    :
                    <div className="flex gap-x-6 justify-center items-center">
                        <Link to='/login' className="link link-hover text-xs sm:text-sm">Sign in / Guest</Link>
                        <Link to='/register' className="link link-hover text-xs sm:text-sm">Create an Account</Link>
                    </div>
                }
            </div>
        </header>
    )
}

export default Header