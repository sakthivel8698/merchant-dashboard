import Form from 'react-bootstrap/Form';

export default function SelectComponent(props) {
    const {
        className,
        options = [],
        value = "",
        onChange,
        name = "",
        disabled = false,
        error = "",
        label = "",
        required = false,
        placeholder = "Select"
    } = props;

    return (
        <Form.Group className="customInpGrp">
            {label && (
                <Form.Label>
                    {label}
                    {required && (
                        <span className="label-mandatory ps-1">*</span>
                    )}
                </Form.Label>
            )}

            <Form.Select
                className={`customInput ${className ? className : ""}`}
                name={name}
                value={value}
                onChange={onChange}
                disabled={disabled}
            >
                {/* <option value="">{placeholder}</option> */}

                {options.map((opt, index) => (
                    <option key={index} value={opt.value}>
                        {opt.label}
                    </option>
                ))}
            </Form.Select>

            {error && (
                <Form.Label className="text-danger">
                    {error}
                </Form.Label>
            )}
        </Form.Group>
    );
}
