import { Link, isRouteErrorResponse, useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  if (isRouteErrorResponse(error)) {
    return (
      <main className="grid place-content-center h-screen bg-slate-900">
        <div className="text-center bg-slate-100 p-8 rounded-lg text-lg">
          <h1 className="font-bold text-xl">Oops! There was an error</h1>
          <h2 className="">{error.status}</h2>
          <p className="font-black mb-4">{error.statusText}</p>
          {error.data?.message && <p>{error.data.message}</p>}
          <Link
            to="/"
            className="bg-green-600 p-3 rounded font-bold hover:bg-slate-900 hover:text-green-600"
          >
            Go Home
          </Link>
        </div>
      </main>
    );
  } else {
    return (
      <main className="grid place-content-center h-screen bg-slate-900">
        <div className="text-center bg-slate-100 p-8 rounded-lg text-lg">
          <h1 className="font-bold text-xl">404</h1>
          <h2 className="mb-5">This page could not be found</h2>
          <Link
            to="/"
            className="bg-green-600 p-3 rounded font-bold hover:bg-slate-900 hover:text-green-600"
          >
            Go Home
          </Link>
        </div>
      </main>
    );
  }
}
