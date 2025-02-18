// App.js

import './App.css'
import Navbar from './components/Navbar'
import Loading from './components/Loading';

// import About from './components/About'
// import TaskInputContainer from './components/TaskInputContainer'
// import TasksDisplayContainer from './components/TasksDisplayContainer'
// import UpdateTaskPopUp from './components/UpdateTaskPopUp'
// import ToTopButton from './components/ToTopButton';

import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom'
import { Suspense, lazy } from 'react';


const About = lazy(() => import('./components/About'));
const TaskInputContainer = lazy(() => import('./components/TaskInputContainer'));
const TasksDisplayContainer = lazy(() => import('./components/TasksDisplayContainer'));
const UpdateTaskPopUp = lazy(() => import('./components/UpdateTaskPopUp'));
const ToTopButton = lazy(() => import('./components/ToTopButton'));
const NotFound = lazy(() => import('./components/NotFound'));


function Layout() {
  return (
    <>
      <Navbar />
      <Suspense fallback={<Loading/>}>
        <Outlet />
      </Suspense>
    </>
  );
}


function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      children: [
        {
          index: true,
          element: (
            <>
              <div className="task-input-container">
                <TaskInputContainer />
              </div>
              <div className="tasks-display-container">
                <TasksDisplayContainer />
              </div>
              <ToTopButton />
              <UpdateTaskPopUp />
            </>
          ),
        },
        {
          path: 'about',
          element: (
            <About />
          ),
        },
        {
          path: '*',
          element: (
            <NotFound/>
          ),
        },
      ],
    },
  ],
  { basename: '/task-manager/' }
);

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App




// const router = createHashRouter([
//   {
//     path: '/',
//     element: <Layout />,
//     children: [
//       {
//         index: true,
//         element: (
//           <>
//             <div className="task-input-container">
//               <TaskInputContainer />
//             </div>
//             <div className="tasks-display-container">
//               <TasksDisplayContainer />
//             </div>
//             <ToTopButton />
//             <UpdateTaskPopUp />
//           </>
//         ),
//       },
//       {
//         path: 'about',
//         element: (
//           <About />
//         ),
//       },
//     ],
//   },
// ],
// );