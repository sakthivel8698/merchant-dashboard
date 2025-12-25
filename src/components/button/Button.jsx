import { Button } from 'react-bootstrap';

const ButtonComponent = (props) => {
    const {
        className = 'defaultBtn',
        disabled = false,
        type = "button",
        onClick
    } = props;


    return (
        <Button
            className={`${className} btn btn-primary`}
            disabled={disabled}
            type={type}
            onClick={onClick}
        >
            {props.btnText}
        </Button>
    )
}

export default ButtonComponent;