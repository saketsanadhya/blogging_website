import {Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar"
import UserAuthForm from "./pages/UserAuthForm.page";
import { createContext, useEffect, useState } from "react";
import { lookInSession } from "./common/session";
import Editor from "./pages/Editor.pages";
import HomePage from "./pages/home.page";
import SearchPage from "./pages/SearchPage";
import PageNotFound from "./pages/404.page";
import ProfilePage from "./pages/ProfilePage.page";
import BlogPage from "./pages/BlogPage.page";
import Sidenav from "./components/Sidenavbar";
import ChangePassword from "./pages/ChangePassword.page";
import EditProfile from "./pages/EditProfile.page";
import Notifications from "./pages/notifications.page";
import ManageBlogs from "./pages/ManageBlogs.page";
export const UserContext=createContext({})

export const ThemeContext=createContext({})
const App = () => {

    const[userAuth,setUserAuth]=useState({})
    const[theme,setTheme]=useState("light")

    useEffect(()=>{
        let userInSession=lookInSession("user")
        let themeInSession=lookInSession("theme")
        userInSession ? setUserAuth(JSON.parse(userInSession)) :setUserAuth({access_token : null})

        if(themeInSession){
            setTheme(()=>{
                document.body.setAttribute('data-theme',themeInSession)

                return themeInSession
            })
        }
        else{
            document.body.setAttribute('data-theme',theme)
        }

    },[])
    return (    
        <ThemeContext.Provider value={{theme,setTheme}}>
        <UserContext.Provider value={{userAuth,setUserAuth}}>
        <Routes>
            <Route path="/editor" element={<Editor/>}/>
            <Route path="/editor/:blog_id" element={<Editor/>}/>
            <Route path="/" element={<Navbar/>}>
                <Route index element={<HomePage/>}/>
                <Route path="dashboard" element={<Sidenav/>}>
                    <Route path="blogs" element={<ManageBlogs/>}/>
                    <Route path="notifications" element={<Notifications/>}/>
                </Route>
                <Route path="settings" element={<Sidenav/>}>
                    <Route path="edit-profile" element={<EditProfile/>}/>
                    <Route path="change-password" element={<ChangePassword/>}/>
                </Route>
                <Route path="signin" element={<UserAuthForm type="sign-in"/>} />
                <Route path="signup" element={<UserAuthForm type="sign-up"/>} />
                <Route path="search/:query" element={<SearchPage/>}/>
                <Route path="user/:id" element={<ProfilePage/>}/>
                <Route path="blog/:blog_id" element={<BlogPage/>}/>
                <Route path="*" element={<PageNotFound/>}/>
            </Route>
        </Routes>
        </UserContext.Provider> 
        </ThemeContext.Provider>
    )
}

export default App;