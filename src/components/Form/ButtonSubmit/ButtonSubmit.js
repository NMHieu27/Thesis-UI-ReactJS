import { Button } from "react-bootstrap";
import Loading from "~/components/Loading/Loading";
import './ButtonSubmit.scss'

function ButtonSubmit({loading = null, content=null, size='btn-lg'}) {
    return (
        <Button className={`${size} btn-submit`} variant="primary" type="submit" disabled={loading}>
            {content}{loading && <span>&nbsp;</span>}
            {loading && <Loading />}
        </Button>
    );
}

export default ButtonSubmit;
