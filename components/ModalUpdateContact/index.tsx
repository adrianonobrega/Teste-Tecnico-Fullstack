import { Form, Formik } from "formik"
import { toast } from 'react-toastify'
import * as yup from 'yup'
import { Api } from "../../services/api"
import { Input } from "../Input"
import { ModalUpdate } from "../ModalUpdateContact/styles"

interface inputRegistration{
    email:string
    phone:string
    name:string
    
}

interface modal{
    setModalUpdate:boolean | any
    returnDataContact:[] | any
    contact_id:string | any
}

export const ModalUpdateContact = ({contact_id,setModalUpdate,returnDataContact}:modal) => {

    const initialValues : inputRegistration = {email: "",name:"",phone:""}

    const token = localStorage.getItem("token")

    const submit = (data: any) => {
        Api.patch(`contacts/${contact_id}`,data,{
            headers: {
              'Authorization': `Bearer ${token}`
            }
          })
            .then((res => {
                returnDataContact()
              
                toast.success("Contato cadastrado com sucesso")
            }))
            .catch((err => {
                toast.error("Contato não foi cadastrado,tente novamente mais tarde")
                console.log(err)

            }))
    }
    

    function closeModal(){
        setModalUpdate(false)
    }

    return (
  <>            <ModalUpdate>
                    <h3 onClick={closeModal}>X</h3>
                     <h1>Atualizar Contato</h1>
                <Formik 
                     
                     initialValues={initialValues}
                     onSubmit={submit}
                >   

                    {() => (
                         <Form>
                        <Input
                            label="Nome"
                            type="text"
                            placeholder="Digite o nome do contato"
                            name="name"
                            error=""
                        />
                        
                        <Input
                            label="Email"
                            type="text"
                            placeholder="Digite o email do contato"
                            name="email"
                            error=""
                        />
                         <Input
                            label="Telefone"
                            type="text"
                            placeholder="Digite o telefone do contato"
                            name="phone"
                            error=""
                        />

                        <button>Atualizar Contato</button>
                         </Form>
                    )}
                </Formik>
  </ModalUpdate>
   
               
  </>
    );
  };