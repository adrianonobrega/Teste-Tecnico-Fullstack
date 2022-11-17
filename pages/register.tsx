import { yupResolver } from "@hookform/resolvers/yup"
import Link from "next/link"
import { useRouter } from "next/router"
import { toast } from 'react-toastify'
import * as yup from 'yup'
import {Formik,Form,Field, useField} from "formik"
import {Api} from "../services/api"
import {Input} from "../components/Input/index"
import {Section} from "../styles/register"
import Button from "../components/Button"


interface inputRegistration{
    name:string
    email:string
    password:string
    phone:string
}


const Register = () => {

    const schema = yup.object().shape({
        email: yup.string().email('E-mail inválido').required('E-mail é obrigatório'),
        password: yup.string().required('Senha obrigatória'),
        name: yup.string().required('Nome obrigatório'),
        phone: yup.string().required('Telefone é obrigatória')
    })

    const initialValues : inputRegistration = {email: "",password:"",name:"",phone:""}

    const navigate = useRouter()

    const submit = (data: any) => {
        console.log(data,"data")
        Api.post(`/users/`, data)
            .then((res => {
                  toast.success("Usuario cadastrado com sucesso")
                navigate.push("/")
            }))
            .catch((err => {
                toast.error("Usuario não foi cadastrado,por favor tente novamente mais tarde")
                console.log(err)
            }))
    }

    function returnLogin(){
        navigate.push("/")
    }

    return (
        <>  
            <Section>
                <Button onClick={returnLogin} className="buttonSair" purpleSchema>Sair</Button>
            <h1>Cadastrar Usuario</h1>
                <Formik 
                    validationSchema={schema}
                     initialValues={initialValues}
                     onSubmit={submit}
                >   
                    {({errors}) => (
                         <Form>
                         <Input
                            label="Nome"
                            type="text"
                            placeholder="Digite seu nome"
                            name="name"
                            error={errors.name}
                        />
                        <Input
                            label="Email"
                            type="text"
                            placeholder="Digite seu email"
                            name="email"
                            error={errors.email}
                        />
                        <Input
                            label="Senha"
                            type="password"
                            placeholder="Digite sua senha"
                            name="password"
                            error={errors.password}
                        />
                        <Input
                            label="Telefone"
                            type="text"
                            placeholder="Digite seu telefone"
                            name="phone"
                            error={errors.phone}
                        />
                        <Button type="submit">Cadastrar</Button>
                         </Form>
                    )}
                </Formik>
            </Section>
                
        </>
    )
}

export default Register