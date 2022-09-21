export const Input = ({label, name,register,error}) => {
    return(
        <div>
            <span>{!!error && <span> {error}</span>}</span>
        <label>{label}</label>  
        <input {...register(name)}></input>
        </div>
       
    )
}