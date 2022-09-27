import * as yup from 'yup'
import { Input } from "../../components/Input"
import { useForm } from 'react-hook-form';
import {yupResolver} from "@hookform/resolvers/yup"
import { Api } from '../../services/api';
import { toast } from 'react-toastify';
import { Link, useNavigate, useLocation } from 'react-router-dom';

export const Login = ({authenticated, setAuthenticated}) => {

    const schema = yup.object().shape({
      email: yup.string().email('E-mail inválido').required('E-mail é obrigatório'),
      password: yup.string().required('Senha obrigatória')
    })

    const {register,handleSubmit,formState: {errors}} = useForm({resolver:yupResolver(schema)});
    const navigate = useNavigate()
    
    const submit = data => {
      
      Api.post('/users/login',data)
      .then(res => {
        const {token} = res.data
        const {user_id} = res.data
        setAuthenticated(true)
        localStorage.setItem("user_id",user_id)
        localStorage.setItem("token",token)
        toast.success("Login efetuado com sucesso")
        
        return navigate('/user')
      })
      .catch(() => {
        toast.error('Email ou senha invalidos')
      })
    }

    if(authenticated){
      return navigate('/user')
    }


    return(
      <div>
        <h1>Login</h1>
          <form onSubmit={handleSubmit(submit)}>
            <Input name="email" label="Email" register={register} error={errors.email?.message}/>
            <Input type="password" name="password" label="Senha" register={register} error={errors.password?.message}/>
            <button type="submit">clique aqui</button>
            <h2>Ainda não possui cadastro, <Link to="/cadastro">CLIQUE AQUI</Link> </h2>
            
          </form>

      </div>
        
    )
}