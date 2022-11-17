import Link from "next/link"
import { useRouter } from "next/router"
import { toast } from 'react-toastify'
import * as yup from 'yup'
import {Formik,Form} from "formik"
import {Api} from "../services/api"
import {Input} from "../components/Input/index"
import {SectionAll} from "../styles/login"
import { AuthContext } from "../providers/auth"
import { useContext } from "react"
import Button from "../components/Button"

interface inputRegistration{
    email:string
    password:string
}


const Login = () => {

    const schema = yup.object().shape({
        email: yup.string().email('E-mail inválido').required('E-mail é obrigatório'),
        password: yup.string().required('Senha obrigatória')
    })

    const initialValues : inputRegistration = {email: "",password:""}
    const {setAuth} = useContext(AuthContext)

    const navigate = useRouter()
    const submit = (data: any) => {
        Api.post(`users/login`, data)
            .then((res => {
                
                const { token, user_id } = res.data
                localStorage.setItem("token", token)
                localStorage.setItem("user_id", user_id)
                setAuth(true)
                toast.success("Login efetuado com sucesso")
                navigate.push("/user")
            }))
            .catch((err => {
                toast.error("Email ou senha invalidos")
                console.log(err)

            }))
    }

    return (
        <>
            <SectionAll>
               
                <h1>Login</h1>
                <Formik 
                    validationSchema={schema}
                     initialValues={initialValues}
                     onSubmit={submit}
                >   

                    {({errors}) => (
                         <Form>
                        
                        <Input
                            label="Usuario"
                            type="text"
                            placeholder="Digitar Usuario"
                            name="email"
                            error={errors.email}
                       />
                        
                        <Input
                            label="Senha"
                            type="password"
                            placeholder="Digitar Senha"
                            name="password"
                            error={errors.password}
                        />

                        <Button type="submit" >Entrar</Button>
                         </Form>

                    )}
                </Formik>

                <h4>Ainda não possui conta?</h4>
                <Link href="/register">Cadastre-se</Link>

            </SectionAll>
        </>
    )
}

export default Login