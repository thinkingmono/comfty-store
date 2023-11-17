import { Form, Link, redirect, useNavigate } from "react-router-dom"
import { FormInput, SubmitBtn } from "../components/index"
import { authFetch } from "../utils";
import { loginUser } from "../features/user/userSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

//loginAction to handle login form submit.
export const action = (store) => async ({ request }) => {
  //capture data from form request.
  const formData = await request.formData();
  //transform form data entries into an object.
  const data = Object.fromEntries(formData);
  try {
    //send api post request to check if username and password stored in data, are already register in the server.
    const response = await authFetch.post('/auth/local', data);
    //Call dispatch to run loginUser action.
    store.dispatch(loginUser(response.data));
    toast.success('Login successfully')
    return redirect('/');
  } catch (error) {
    //Error handling with optional chaining
    const errorMsg = error?.response?.data?.message || 'Please check your credentials';
    toast.error(errorMsg);
    return null;
  }
}

const Login = () => {
  //dispatch and navigate declaration.
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //Function to log as a default guest user.
  const loginAsGuestUser = async () => {
    try {
      //send api post request with default credentials to log into the server.
      const response = await authFetch.post('/auth/local', { identifier: 'test@test.com', password: 'secret' });
      //call dispatch to run loginUser action.
      dispatch(loginUser(response.data));
      toast.success('Welcome guest user');
      navigate('/');
    } catch (error) {
      //handling errors with optional chaining and throws a notification.
      const errorMsg = error?.response?.data?.message || 'Guest User Login Error. Please try again later';
      toast.error(errorMsg);
    }
  }

  return (
    <section className="h-screen grid place-items-center">
      <Form method="POST" className="card w-96 p-8 bg-base-100 shadow-lg flex flex-col gap-y-4">
        <h4 className="text-center text-3xl font-bold">Login</h4>
        <FormInput label='Email' name='identifier' type='email' defaultValue='alejo6@mail.com' />
        <FormInput label='Password' name='password' type='password' defaultValue='1234567' />
        <div className="mt-4">
          <SubmitBtn text='Login' />
        </div>
        <button type="button" className="btn btn-secondary btn-block" onClick={loginAsGuestUser}>Guest User</button>
        <p className="text-center">
          Not a member yet?
          <Link to='/register' className="ml-2 link link-hover link-primary capitalize">Register</Link>
        </p>
      </Form>
    </section>
  )
}

export default Login