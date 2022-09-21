import * as yup from 'yup'
import { Input } from "../../components/Input"
import { useForm } from 'react-hook-form';
import {yupResolver} from "@hookform/resolvers/yup"


export const Login = () => {

    const schema = yup.object().shape({
      email: yup.string().email('E-mail inválido').required('E-mail é obrigatório'),
      password: yup.string().required('Senha obrigatória')
    })

    const {register,handleSubmit,formState: {errors}} = useForm({resolver:yupResolver(schema)});
    
    function onSubmit(data){
      console.log(data)
    }

    return(
      <div>
        <h1>Login</h1>
          <form onClick={handleSubmit(onSubmit)}>
            <Input name="email" label="Email" register={register} error={errors.email?.message}/>
            <Input type="password" name="password" label="Senha" register={register} error={errors.password?.message}/>
            <button type="submit">clique aqui</button>
          </form>

      </div>
        
    )
}