import styled from 'styled-components'
import { AiOutlineMail } from 'react-icons/ai'


export const Section = styled.section`

padding:0;
margin:50px;
position:relative;

svg{
    position:absolute;
    top:12px;
    left:10px;
}

label{
    position:absolute;
    top:7px;
    left:30px;
    font-size:14px;
}

h1{
    font-size:'Inter';
    
}

input{
outline:none;
 border-radius: 50px;
 height:40px;
 width:300px;
 padding:14px 30px;
 border: 1px solid #A2CAFF;
 font-size:14px;

}

span{
    position:relative;
    top:-20px;
    color:red;
}

div{
    height:0px;
}

input::placeholder{
    color:#82B2B7;
    transition:250ms ease-in-out;
}

input::hover{
    border:1px solid #78b2FF
    &::placeholder{
        color:8A8A8A; 
    } 
}

input:focus{
    border: 1px solid #3189FE;
    &::placeholder{
        color:#1D1D1D; 
    } 
}


`