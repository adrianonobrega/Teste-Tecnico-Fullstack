import { Form, Formik } from "formik"
import { toast } from 'react-toastify'
import * as yup from 'yup'
import { Api } from "../../services/api"
import { Input } from "../Input"
import { Modal } from "../ModalContact/styles"
import Button from "../../components/Button"

interface inputRegistration{
    email:string
    phone:string
    name:string
    
}

interface modal{
    setModal:boolean | any
    returnDataContact:[] | any
}

export const ModalContact = ({setModal,returnDataContact}:modal) => {

    const schema = yup.object().shape({
        email: yup.string().email('E-mail inválido').required('E-mail é obrigatório'),
        name: yup.string().required('Nome é obrigatório'),
        phone: yup.string().required('Phone é obrigatório'),
        
    })

    const initialValues : inputRegistration = {email: "",name:"",phone:""}

    const user_id = localStorage.getItem("user_id")
    const token = localStorage.getItem("token")
  
    const submit = (data: any) => {
        Api.post(`contacts/${user_id}`,data,{
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
        setModal(false)
    }

    return (
  <>            <Modal>
                    <h3 onClick={closeModal}>X</h3>
                     <h1>Cadastrar Contato</h1>
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
                            placeholder="Digite o nome do contato"
                            name="name"
                            error={errors.name}
                        />
                        
                        <Input
                            label="Email"
                            type="text"
                            placeholder="Digite o email do contato"
                            name="email"
                            error={errors.email}
                        />
                         <Input
                            label="Telefone"
                            type="text"
                            placeholder="Digite o telefone do contato"
                            name="phone"
                            error={errors.phone}
                        />

                        <button className="button" type="submit">Cadastrar Contato</button>
                         </Form>
                    )}
                </Formik>


  </Modal>
   
               
  </>
    );
  };