import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate, RouteObject, createBrowserRouter, RouterProvider } from "react-router-dom"
import Layout from "./components/Layout"

const CrmLazy = lazy(() => import("./components/Crm"));

const routes: RouteObject[] = [
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Navigate to={`/crm`} />,
      },
      {
        path: `/crm/*`,
        element: <Suspense fallback="Loading Crm..."><CrmLazy /></Suspense>,
      }
    ],
  }
];

const browserRouter = createBrowserRouter(routes);

const App = () => {
  return (
    <>
      <RouterProvider router={browserRouter} />
      {/* <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route path='crm/*' element={<Suspense fallback="Loading Crm..."><CrmLazy /></Suspense>} />
        </Route>
      </Routes>
    </BrowserRouter> */}
    </>
  )
}

export default App

//https://github.com/module-federation/module-federation-examples/blob/ScriptedAlchemy-patch-1/react-nested-routers/shell/src/App.tsx