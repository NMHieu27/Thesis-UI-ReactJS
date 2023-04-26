import React from 'react';
import { Form } from 'react-bootstrap';

const InputItem = React.forwardRef(({ label, type, value, setValue, name, placeholder = '', error = null, pattern = null }, ref) => {
   let isValid = true;
    if(pattern && value) {
       isValid = new RegExp(pattern).test(value);
   }

    if (type === 'file')
        return (
            <Form.Group className="mb-3" controlId={name}>
                <Form.Label>{label}</Form.Label>
                <Form.Control type="file" ref={ref} />
            </Form.Group>
        );

    return (
        <Form.Group className="mb-3" controlId={name}>
            <Form.Label className='form-control-placeholder'>{label}</Form.Label>

            <Form.Control
                className="form-control-lg"
                type={type}
                value={value}
                name={name}
                onChange={setValue}
                placeholder={placeholder}
            />
        {!isValid && <p className='text-danger mt-2'>{error}</p>}
        </Form.Group>
    );
});

export default InputItem;
