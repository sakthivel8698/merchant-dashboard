import Form from 'react-bootstrap/Form';


export default function InputComponent(props) {
    const {
        className,
        type = "text",
        placeholder = "",
        value = "",
        onChange,
        name = "",
        disabled = false,
        error = "",
        label = '',
        required = false
    } = props;
    return (
        <Form.Group className='customInpGrp'>
            {
                label &&
                <Form.Label>
                    {label}
                    {
                        required &&
                        <span className='label-mandatory ps-1'>*</span>
                    }
                </Form.Label>
            }

            <Form.Control
                className={`customInput ${className ? className : ''}`}
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                name={name}
                disabled={disabled}
            />
            {
                error &&
                <Form.Label className='text-danger'>{error}</Form.Label>
            }
        </Form.Group>
    )
}

