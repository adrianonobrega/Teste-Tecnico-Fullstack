
import Link from "next/link"
import {SectionAll,SectionLi,SectionButton,Div} from "./styles"
import { useState,useEffect } from "react"
import { AuthContext } from "../../providers/auth"
import { useContext } from "react"


interface HeaderInt{
    user:object | any
    letter: string | any
}


export const Header = ({user,letter}:HeaderInt) => {

    const [modal,setModal] = useState(false)

    const {auth} = useContext(AuthContext)

    return (

        <SectionAll>
           
       <SectionLi>
       <div className="divRight"></div>
       
          {auth === true &&
          <>
          <div className="divAll">
          <Div>
           
           <h2>
               {letter}
           </h2>
           </Div>
           <h6>{user?.name}</h6>
          </div>
          
          </>
          }
          <div className="divRight"></div>
       </SectionLi>
       
        </SectionAll>
    )      
}