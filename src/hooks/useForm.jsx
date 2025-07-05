import { useState } from "react"

//Hook useForm will manage the form logic
const useForm = ({onSubmit, initial_form_state}) => {
    //State logic for the form
    const [form_state, setFormState] = useState(initial_form_state)

    const handleSubmit = async (event) => {
        event.preventDefault()
        onSubmit()
        // Rsend the form when the submit button is clicked
        setFormState(initial_form_state)
    }

    const handleChange = (event) => {
        const value = event.target.value
        const field_name = event.target.name
        setFormState(
            (prevFormState) => ({
                    ...prevFormState,
                    [field_name]: value
        }))
    }

    return {
        form_state,
        handleSubmit,
        handleChange,
        setFormState
    }
}

export default useForm