import { Input } from "../Input"


const UpdateUser = ({label, name,register,error,type}) => {

    function submit(data){
        console.log(data)
    }

return (
    <div>
        <form>
        <Input/>
        <button type="submit">Atualizar usuario</button>
        </form>
      
    </div>
)

}
export default UpdateUser