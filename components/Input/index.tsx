import { Field } from "formik";
import  Input  from "../../interfaces/input";
import { Section } from "./styles";
import { AiOutlineMail } from 'react-icons/ai'


export const Input = ({name,placeholder,type,error}:Input) => {


    return (
  <>
  <Section>
    <div>{!!error && <span> {error}</span>}</div>
    
    <AiOutlineMail/>
    <Field type={type}id={name} name={name} placeholder={placeholder}/>
  </Section>
  </>
    );
  };