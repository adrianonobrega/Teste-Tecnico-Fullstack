

export const Input = ({label, name,register,error,type}) => {
    return(
        <div>
            <span>{!!error && <span> {error}</span>}</span>
        <label>{label}</label>  
        <input type={type}{...register(name)}></input>
        </div>
       
    )
}