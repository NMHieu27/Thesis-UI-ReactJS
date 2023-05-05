import { Button } from "react-bootstrap";
import Loading from "~/components/Loading/Loading";
import './ButtonSubmit.scss'

function ButtonSubmit({loading = false, content=null, size='btn-lg', ...props}) {
    return (
        <Button className={`${size} btn-submit`} variant="primary" type="submit" {...props} disabled={loading}>
            {content}{loading && <span>&nbsp;</span>}
            {loading && <Loading />}
        </Button>
    );
}

export default ButtonSubmit;
