import { ChangeEvent, useState } from "react"

export const useForm = (initData:any) => {
    const [formData, setFormData] = useState(initData);
    const [emptyInputs, setEmptyInputs] = useState({
        name:false,
        image:false
    })

    const onChange = (event:ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [event.target.name]:event.target.value,
        })
    }

    const resetForm = () => { 
        setFormData({...initData})
        setEmptyInputs({
            name:false,
            image:false
        })
    }

    const validateForm = ()=>{
        const errors = [];
        if (formData.name=='') {
            setEmptyInputs({...emptyInputs,name:true})
            errors.push('name')
        }
        if (formData.image=='') {
            setEmptyInputs({...emptyInputs,image:true})
            errors.push('image')
        }
        return errors;
    }

    return { 
        formData,
        onChange,
        resetForm,
        validateForm,
        emptyInputs,
    }
}