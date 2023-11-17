import { BsCart3, BsMoonFill, BsSunFill } from 'react-icons/bs';
import { FaBarsStaggered } from 'react-icons/fa6';
import { NavLink } from 'react-router-dom';
import { NavLinks } from '../components/index'
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '../features/user/userSlice';

const Navbar = () => {
    //dispatch declaration.
    const dispatch = useDispatch();

    /*Toggle theme and set theme state*/
    const handleTheme = () => {
        dispatch(toggleTheme());
    }

    //destructure numItemsInCart from store's cart.
    const { numItemsInCart } = useSelector((store) => store.cart);

    return (
        <nav className='bg-base-200'>
            <div className="navbar align-element">
                <div className="navbar-start">
                    {/*Logo*/}
                    <NavLink to='/' className='hidden lg:flex btn btn-primary text-3xl items-center'>C</NavLink>
                    {/*Mobile Menu*/}
                    <div className="dropdown">
                        <label tabIndex={0} className="btn btn-ghost lg:hidden"><FaBarsStaggered className='h-6 w-6' /></label>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-200 rounded-box w-52"><NavLinks /></ul>
                    </div>
                </div>
                {/*Desktop menu*/}
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal"><NavLinks /></ul>
                </div>
                {/*Theme toggle and cart*/}
                <div className="navbar-end">
                    {/*Theme toggle*/}
                    <label className="swap swap-rotate">
                        <input type="checkbox" onChange={handleTheme} />

                        <BsSunFill className='swap-on h-4 w-4' />

                        <BsMoonFill className='swap-off h-4 w-4' />
                    </label>
                    {/*Cart*/}
                    <NavLink to='/cart' className='btn btn-ghost btn-circle btn-md ml-4'>
                        <div className="indicator">
                            <BsCart3 className='h-6 w-6' />
                            <span className="badge badge-sm badge-primary indicator-item">{numItemsInCart}</span>
                        </div>
                    </NavLink>
                </div>
            </div>
        </nav>
    )
}

export default Navbar