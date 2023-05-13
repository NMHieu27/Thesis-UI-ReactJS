import React from 'react';
import { Form } from 'react-bootstrap';
import { Message } from 'primereact/message';

const InputItem = React.forwardRef(({ label=null, type, value, setValue, name, placeholder = '', error = null, pattern = null, ...props }, ref) => {
   let isValid = true;
    if(pattern && value) {
       isValid = new RegExp(pattern).test(value);
   }

    if (type === 'file')
        return (
            <Form.Group className="mb-3" controlId={name}>
                {label && <Form.Label>{label}</Form.Label>}
                <Form.Control type="file" ref={ref} onChange={setValue} className="form-control-lg" {...props}/>
            </Form.Group>
        );

    return (
        <Form.Group className="mb-3" controlId={name}>
            {label && <Form.Label className='form-control-placeholder'>{label}</Form.Label>}

            <Form.Control
                className="form-control-lg"
                type={type}
                value={value}
                name={name}
                onChange={setValue}
                placeholder={placeholder}
                {...props}
            />
        {!isValid && <Message className='mt-2' severity="error" text={error} />}
        </Form.Group>
    );
});

export default InputItem;
