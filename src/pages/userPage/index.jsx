import { useState } from "react"
import { Api,ApiGet } from "../../services/api"
import { useEffect } from "react"
import { ModalContact } from "../../components/modalContact"
import excluir from "../../image/1966291.png"
import update from "../../image/atualizar.png"
import { Img } from "./style"
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { ModalContactUpdate } from "../../components/modalUpdate"


export const UserPage = () => {
    
    const user_id = localStorage.getItem('user_id')
    const [modalContact,setModalContact] = useState(false)
    const [modalUpdateContact,setModalUpdateContact] = useState(false)
    const [user,setUser] = useState([])
    const[contacts,setContacts] = useState([])
    const [removeStatus,setRemoveStatus] = useState([])
    const [contactUpdateId,setContactUpdateId] = useState()

    console.log(contactUpdateId)


    function returnData(){
      ApiGet.get(`contacts/${user_id}`).then((res) => {
        setContacts(res.data)
        
      }).catch((error) => {
        console.log(error)
      })
    }
   
    ApiGet.get(`contacts/${user_id}`).then((res) => {
      setContacts(res.data)
      
    }).catch((error) => {
      console.log(error)
    })

    useEffect(() => {
        ApiGet.get(`users/${user_id}`).then((res) => {
            
            setUser([res.data])
        }).catch((error) => {
          console.log(error)
        })
    },[])

    function openModal(){
      setModalContact(true)
    }
    function closeModal(){
      setModalContact(false)
    }

    function openModalUpdate(contact_id,e){
      e.preventDefault()
      setContactUpdateId(contact_id)
      setModalUpdateContact(true)
    }

    function closeModalUpdate(){
      setModalUpdateContact(false)
    }

   function removeContact(contact_id,e){
    e.preventDefault()
    ApiGet.delete(`contacts/${contact_id}`).then((res) => {
      returnData()
      toast.success("Contato deletado com sucesso!")
    }).catch((error) => {
        
      console.log(error)    
      toast.error("Contato não foi deletado, por favor tente novamente mais tarde")
      
    })

   }
   
   
    return (
      <div>
         {
        user.map((item,i) => (
                <h1 key={i}>Nome do usuario: {item.name}</h1>      
        ))
      }
      <button onClick={openModal}>Cadastrar Contato</button>
      {modalContact === true && <ModalContact contact={contacts} setContacts={setContacts} close={closeModal}/>}
      {modalUpdateContact === true && <ModalContactUpdate contact={contacts} setContacts={setContacts} close={closeModalUpdate}/>}
      <h2>Contatos cadastrados</h2>
      <ul>
      {
        
        contacts.map((item) => (
            
              <li key={item.id}>
              <Img onClick={(e) => removeContact(item.id,e)} src={excluir}/>
              <Img onClick={(e) => openModalUpdate(item.id,e)} src={update}/>
              <h3>Nome: {item.name}</h3> 
              <h4>Email: {item.email}</h4>
              <h4>Telefone: {item.phone}</h4>
              </li>
            
      ))
      
      }
      </ul>

      </div>
      
     

      
    )
}