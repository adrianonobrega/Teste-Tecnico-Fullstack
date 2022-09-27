import {Input} from "../Input"
import { useForm } from 'react-hook-form';
import MaskedInput from '../masketInput';
import { ApiGet } from "../../services/api"
import { toast } from 'react-toastify';

export const ModalContactUpdate = ({close,contact,setContacts,returnData,contactUpdateId}) => {

    const {register,handleSubmit} = useForm();

 
    function submit(data){
    [data].map((item) => {

        const name = item.name !== ""
        const email = item.email !== ""
        const phone = item.phone !== ""
        
        const nameVerify = name ? item.name : undefined
        const phoneVerify = phone  ? item.phone : undefined
        const emailVerify = email? item.email : undefined

        const contactOne = contact.filter((item) => {
            return item.id === contactUpdateId
        })

        contactOne.map((contact) => {

            const obj = {
                name: nameVerify === undefined ? contact.name : item.name,
                phone: phoneVerify === undefined ? contact.phone : item.phone,
                email: emailVerify === undefined ? contact.email : item.email
            }
            
            ApiGet.patch(`contacts/${contactUpdateId}`,obj).then((res) => {
                returnData()
                
                toast.success("Contato atualizado com sucesso!")
              }).catch((error) => { 
                console.log(error)    
                toast.error("Contato não foi atualizado, por favor tente novamente mais tarde")
              })
        })
    })
    }
    return (
        <div>
            <button onClick={close}>X</button>
            <h3>Atualizar usuario</h3>
            
            <form onSubmit={handleSubmit(submit)}>

       
            <Input
                name="name"
                label="Nome"
                register= {Input.value === ' ' ? "contact.name" : register}
            
            
            />
            <Input
                name="email"
                label="Email"
                register={Input.value === "" ? contact.email : register}
                placeholder="email"
            />

            <MaskedInput
                name="phone"
                label="Telefone"
                    register={Input.value === "" ? contact.phone : register}
                    
                    />        
            
            <button type='submit'>Atualizar</button>
        </form>
         
        </div>
        
    )
}