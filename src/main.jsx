import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import store from './store/store.js'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import AllPost from './pages/AllPost.jsx'
import AddPost from './pages/AddPost.jsx'
import Post from './pages/Post.jsx'
import EditPost from './pages/EditPost.jsx'
const route=createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App/>}>
      <Route path='' element={<Home/>}/>
      <Route path='/login' element={<Login/>} />
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/allPosts' element={<AllPost/>} />
      <Route path='/addpost' element={<AddPost/>} />
      <Route path='/post/:slug' element={<Post/>}/>
      <Route path='/edit-post/:slug' element={<EditPost/>}/>

    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
    <RouterProvider router={route}/>
    </Provider>
  </React.StrictMode>,
)
