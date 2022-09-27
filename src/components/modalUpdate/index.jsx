import * as yup from 'yup'
import {yupResolver} from "@hookform/resolvers/yup"
import {Input} from "../Input"
import { useForm } from 'react-hook-form';
import MaskedInput from '../masketInput';
import { Api,ApiGet } from "../../services/api"
import { toast } from 'react-toastify';
import { useState } from 'react';


export const ModalContactUpdate = ({close,contact,setContacts}) => {

 
    const {register,handleSubmit} = useForm();
    const {contactId,setContactId} = useState()
    const user_id = localStorage.getItem('user_id')


    function submit(data){
        
       
    }
    
    return (
        <div>
            <button onClick={close}>X</button>
            <h3>Cadastro de usuario</h3>
            
            <form onSubmit={handleSubmit(submit)}>

       
            <Input
                name="name"
                label="Nome"
                register={register}
            
            
            />
            <Input
                name="email"
                label="Email"
                register={register}
                placeholder="email"
            />

            <MaskedInput
                name="phone"
                label="Telefone"
                    register={register}
                    
                    />        
    
   

        

           

           
            
                    
            
            <button type='submit'>Atualizar</button>
        </form>
         
        </div>
        
    
       
    )
}