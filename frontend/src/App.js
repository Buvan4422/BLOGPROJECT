import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import AddArticle from './Components/add-article/AddArticle';
import ArticlesofAuthors from './Components/articles-of-authors/ArticlesofAuthors';
import AuthorProfile from './Components/author-profile/AuthorProfile';
import Home from './Components/Home/Home';
import Signin from './Components/Signin/Signin';
import Signup from './Components/Signup/Signup';
import UserProfile from './Components/user-profile/UserProfile';
import RootLayout from './RootLayout';

function App() {
  const browserRouter = createBrowserRouter([
    {
      path: '/',
      element: <RootLayout />,
      children: [
        {
          path: '/',
          element: <Home />,
        },
        {
          path: 'signup',
          element: <Signup />,
        },
        {
          path: 'signin',
          element: <Signin />,
        },
        {
          path: 'user-profile',
          element: <UserProfile />,
        },
        {
          path: 'author-profile',
          element: <AuthorProfile />,
          children: [
            {
              path: 'add-article',
              element: <AddArticle />,
            },
            {
              path: 'article-of-author',
              element: <ArticlesofAuthors />,
            },
          ],
        },
      ],
    },
  ]);
  return (
    <div className="App">
      <RouterProvider router={browserRouter}></RouterProvider>
    </div>
  );
}

export default App;
