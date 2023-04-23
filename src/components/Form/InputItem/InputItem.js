import React from "react"
import { Form } from "react-bootstrap"

const InputItem = React.forwardRef(({label, type, value, setValue, name, placeholder=""}, ref) => {
    if (type === "file")
        return (
            <Form.Group className="mb-3" controlId={name}>
                <Form.Label>{label}</Form.Label>
                <Form.Control type="file" ref={ref}  />
            </Form.Group>
        )

    return (
        <Form.Group className="mb-3" controlId={name}>
            <Form.Label>{label}</Form.Label>
                                
            <Form.Control className="form-control-lg" type={type} value={value} name={name}
                          onChange={setValue} placeholder={placeholder}/>
        </Form.Group>
    )
}) 

export default InputItem