import { useEffect, useState } from "react"
import { BsPencil, BsTrash } from 'react-icons/bs'
import { toast } from 'react-toastify'
import { Header } from "../components/Header"
import { ModalContact } from "../components/ModalContact"
import { Api } from "../services/api"
import { Section } from "../styles/user"
import {ModalUpdateContact} from "../components/ModalUpdateContact"
import Button from "../components/Button"
import { useRouter } from "next/router"


type List = {
        id:string | any
   
        listContact:[],
        setListContact: () => {},
        name:string
        email:string
        phone:string
    
}

const User =  () => {

    const [user,setUser] = useState()
    const [letter,setLetter] = useState()
    const [modal,setModal] = useState<boolean>()
    const [listContact,setListContact] = useState<List[]>([])
    const [modalUpdate,setModalUpdate] = useState<boolean>()
    const [contact_id,setContact_id] = useState()
    
 
    const navigate = useRouter()

    function returnDataUser(){

            

            Api.get(`users/${localStorage.getItem('user_id')}`, {
                headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            }).then((res) => {
                setUser(res.data)
                const name = res.data.name.match(/\b(\w)/gi);
                if (name !== null && name !== undefined) {
                    const letter1 = name[0]
                    const letter2 = name[1]
                    
                        if(name.length > 1){
                            setLetter(letter1 + letter2)
                    }
                        else{
                            setLetter(letter1)
                    }
                
                
                }
            })
                .catch((err) => console.log(err))
            
    }

   
    function returnDataContact(){
    
        Api.get(`contacts/${localStorage.getItem('user_id')}`, {
            headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        }).then((res) => {
            setListContact((listContact) => [
                ...res.data,
            ])
        })
            .catch((err) => console.log(err))
        
    }
       
    function modalOpen(){
        setModal(true)
    }

    useEffect(() => {
        returnDataContact()
        returnDataUser()
      },[])

    function removeList(contact_id: any){
        
        Api.delete(`contacts/${contact_id}`,{

            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
        }).then((res) => {
            returnDataContact()
            toast.success("Contato deletado com sucesso!")
          }).catch((error) => { 
            console.log(error)    
            toast.error("Contato não foi deletado, por favor tente novamente mais tarde")
          })
    }

    function openModalUpdate(contact_id:any){
        setContact_id(contact_id)
        setModalUpdate(true)
    }

    function returnLogin(){
        localStorage.clear();
        navigate.push("/")
    }
    
    return (
       <>
       
       <Section>
       <Header user={user} letter={letter} />
       <Button className="buttonSair" onClick={returnLogin} purpleSchema>Sair</Button>
       <h1>Contatos Cadastrados</h1>

<Button className="button" onClick={modalOpen}>Cadastrar Contato</Button>
{modal === true && <ModalContact returnDataContact={returnDataContact} setModal={setModal}/>}
{modalUpdate === true && <ModalUpdateContact contact_id={contact_id} returnDataContact={returnDataContact} setModalUpdate={setModalUpdate}/>}
<ul>
{listContact.map((item) => (
    <>
     <li key={item.id}>
     
        <h6 className="name">Nome: {item?.name}</h6>
        <h6>Email: {item.email}</h6>
        <h6>Telefone: {item.phone}</h6>
        <BsTrash className="trash" onClick={() => removeList(item.id)}/>
        <BsPencil className="update" onClick={() => openModalUpdate(item.id)}/>
        
    </li>
    
    </>
   
))}
</ul>
       </Section>
       
       </>
    )
}

export default User