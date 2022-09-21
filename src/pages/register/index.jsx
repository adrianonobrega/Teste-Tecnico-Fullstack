import * as yup from 'yup'
import { Input } from "../../components/Input"
import { useForm } from 'react-hook-form';
import {yupResolver} from "@hookform/resolvers/yup"
import { useState } from 'react';
import { HiEye,HiEyeOff } from "react-icons/hi";
import MaskedInput from '../../components/masketInput';

export const Register = () => {

    const schema = yup.object().shape({
        
        phone:yup.string().required("Campo CPF é obrigatório"),
        name: yup.string().required("Campo nome é obrigatório"),  
        email: yup.string().email('E-mail inválido').required('E-mail é obrigatório'),
        password:yup.string().oneOf([yup.ref('password')], 'Senhas diferentes').required('Campo senha é obrigatório'),
        passwordConfirm:yup.string().oneOf([yup.ref('password')], 'Senhas diferentes').required('Campo confirmar senha é obrigatório')

    })

    const {register,handleSubmit,formState: {errors}} = useForm({resolver:yupResolver(schema)});
    const [password,setPassword] = useState(false)
    const [confirmPassword,setConfirmPassword] = useState(false)
    

    function submit(data){
    
      console.log(data,"onSubmit")
    }

    const handleClick = (e) => {
        setPassword(!password) 
      }

    const handleClickConfirmPassword = (e) => {
        setConfirmPassword(!confirmPassword,"handleClickConfirmPassword")
      }

    return(
      <div>
        <h1>Cadastro</h1>
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
                <Input
                    type={password ? "text" : "password"}
                    label="Senha"
                    name="password"
                    register={register}
                    error={errors.password?.message}/>

                    {password ? (<HiEye onClick={handleClick}/>) : (<HiEyeOff onClick={handleClick}/>)}

                <Input
                    type={confirmPassword ? "text" : "password"}
                    label="Confirmar senha"
                    name="passwordConfirm"
                    register={register}
                    error={errors.passwordConfirm?.message}/>
                    
                    {confirmPassword ? (<HiEye onClick={handleClickConfirmPassword}/>) : (<HiEyeOff onClick={handleClickConfirmPassword}/>)}


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