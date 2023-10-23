import { Link, useRouteError } from "react-router-dom"

const Error = () => {
  const error = useRouteError();
  console.log(error);
  if (error.status === 404) {
    return (
      <main className="grid min-h-[100vh] place-items-center px-8">
        <div className="text-center">
          <p className="text-9xl text-primary font-semibold">404</p>
          <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-5xl">Page not found</h1>
          <p className="mt-6 text-lg leading-7">Seem that we can't find the page you are looking for</p>
          <div className="mt-10">
            <Link className="btn btn-secondary" to='/'>Go Back Home</Link>
          </div>
        </div>
      </main>
    )
  }
  return (
    <main className="grid min-h-[100vh] place-items-center px-8">
      <div className="text-center">
        <h4 className="text-center font-bold text-4xl">There was an error</h4>
      </div>
    </main>
  )
}

export default Error