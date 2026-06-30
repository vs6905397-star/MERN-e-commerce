import Footer from "../components/Footer"
import NavBar from "../components/NavBar"
import { useEffect, useState } from "react"



const MainLayout = ({children, user, setSearch, search}) => {

        
    return (
        <>
        <NavBar user = {user} setSearch={setSearch} search={search}/>
        {children}
        <Footer/>
        </>
    )
}

export default MainLayout