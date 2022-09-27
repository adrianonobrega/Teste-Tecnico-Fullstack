import * as yup from 'yup'
import {yupResolver} from "@hookform/resolvers/yup"
import {Input} from "../Input"
import { useForm } from 'react-hook-form';
import MaskedInput from '../masketInput';
import { Api,ApiGet } from "../../services/api"
import { toast } from 'react-toastify';


export const ModalContact = ({close,contact,setContacts}) => {

    const schema = yup.object().shape({
        
        phone:yup.string().required("Campo telefone é obrigatório"),
        name: yup.string().required("Campo nome é obrigatório"),  
        email: yup.string().email('E-mail inválido').required('E-mail é obrigatório'),
    })
    const {register,handleSubmit,formState: {errors}} = useForm({resolver:yupResolver(schema)});
    const user_id = localStorage.getItem('user_id')


    function submit(data){
        
        ApiGet.post(`contacts/${user_id}`,data).then((res) => {
            setContacts([...contact,res.data])
            toast.success("Contato cadastrado com sucesso")
            
          
          })
          .catch((error) => {
        
            console.log(error)    
            toast.error("Contato não foi cadastrado, por favor tente novamente mais tarde")
            
          })
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
                    error={errors.name?.message}/>

            <Input
                name="email"
                label="Email"
                register={register}
                error={errors.email?.message}/>        

            <MaskedInput
                    name="phone"
                    label="Telefone"
                    register={register}
                    error={errors.phone?.message}/>
            
            <button type='submit'>clique aqui</button>
        </form>
         
        </div>
        
    
       
    )
}