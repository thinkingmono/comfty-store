import { useRouteError } from 'react-router-dom'

const ErrorElement = () => {
    //Error page for Landing page.
    const error = useRouteError();
    console.log(error);
    return (
        <h4 className='font-bold text-4xl'>There was an error...</h4>
    )
}

export default ErrorElement