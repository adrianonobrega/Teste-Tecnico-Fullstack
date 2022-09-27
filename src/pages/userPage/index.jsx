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
import { useNavigate } from "react-router-dom"
import UpdateUser from "../../components/updateUser"





export const UserPage = ({ authenticated, setAuthenticated}) => {
    
    const user_id = localStorage.getItem('user_id')
    const [modalContact,setModalContact] = useState(false)
    const [modalUpdateContact,setModalUpdateContact] = useState(false)
    const [user,setUser] = useState([])
    const[contacts,setContacts] = useState([])
    const [removeStatus,setRemoveStatus] = useState([])
    const [contactUpdateId,setContactUpdateId] = useState()
    const [state,setStare] = useState(false)
    const {register,handleSubmit} = useForm([])


    const navigate = useNavigate()

    function returnData(){
      
      
      ApiGet.get(`contacts/${user_id}`).then((res) => {
        setContacts(res.data)
        
      }).catch((error) => {
        console.log(error)
      })
    }

    function returnDataUser(){
     
        ApiGet.get(`users/${user_id}`).then((res) => {
            
            setUser([res.data])
        }).catch((error) => {
          console.log(error)
        })
 
    }
    
    useEffect(() => {
      returnData()
      returnDataUser()
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

  function logof() {
    setAuthenticated(false);
    localStorage.clear();
    return navigate('/')
  }

  if (!authenticated) {
    setAuthenticated(false)
    return navigate('/')
  }

  function update2(){
    setStare(true)
  }

  function OnchangeUpdateUser(data){

    

    const userOne = user.filter((item) => {
      return item.id === user_id
  })
    userOne.map((item) => {
      const obj = {
       
        name : data.name,
        phone : item.phone,
        email : item.email,
        password:"12345"
      }

      console.log(obj)

      ApiGet.patch(`users/${user_id}`,obj).then((res) => {
        returnData()
        
        toast.success("Contato atualizado com sucesso!")
      }).catch((error) => { 
        console.log(error)    
        toast.error("Contato não foi atualizado, por favor tente novamente mais tarde")
      })
      
    })
   

    
    
  }
  
   
    return (
      <div>
        <button onClick={logof}>Sair</button>
         {
          user.map((item,i) => (
            <>
            <h1 key={i}>Nome do usuario: </h1> {state === false ? (<h1>{item.name}</h1>) : 
          <form onSubmit={handleSubmit(OnchangeUpdateUser)}>
          <input {...register("name")} type="text" id="inputUpdate"/> <button type="submit">Atualizar usuario</button>
          </form> }
            <Img src={excluir}/>
            <Img onClick={() => update2()} src={update}/>
              <br></br>
            </>
            
          ))
        }
        <button onClick={openModal}>Cadastrar Contato</button>
        {modalContact === true && <ModalContact contact={contacts} setContacts={setContacts} close={closeModal}/>}
        {modalUpdateContact === true && <ModalContactUpdate returnData={returnData} contactUpdateId={contactUpdateId} contact={contacts} setContacts={setContacts} close={closeModalUpdate}/>}
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