import { useState } from "react"

//La responsabilidad de el hook useForm es manejar la logica del formulario
function useForm({onSubmit, initial_form_state}) {
    //Logica del estado, efecto lo quieras manejar
    const [form_state, setFormState] = useState(initial_form_state)

     const handleSubmit = async (event) => {
        event.preventDefault()
        onSubmit()
        
    }

    const handleChange = (event) => {
        const value = event.target.value
        const field_name = event.target.name
        setFormState(
            (prevFormState) => {
                return {
                    ...prevFormState,
                    [field_name]: value
                }
            }
        )
    }
    return {
        form_state,
        handleSubmit,
        handleChange
    }
}

export default useForm