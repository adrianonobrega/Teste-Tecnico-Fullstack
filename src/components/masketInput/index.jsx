import InputMask from 'react-input-mask'

const MaskedInput = ({label,name,register,error}) => {

return (
    <div>
        <div>{!!error && <span> {error}</span>}</div>
        <label>{label}</label>
        <InputMask mask="(99)99999-9999" {...register(name)}/>
    </div>
)

}
export default MaskedInput