import { useEffect, useState } from 'react';
import { Button, ButtonGroup, Row } from 'react-bootstrap';
import Helmet from '~/components/Helmet/Helmet';
import ThesisCard from '~/components/ThesisCard/ThesisCard';
import { thesesData } from '~/fakedata/theses';

function MyTheses() {
    const [theses, setTheses] = useState(null);
    const [page, setPage] = useState(1);
    useEffect(() => {
        // Call API get theses by user id (teacher)
        setTheses(thesesData);
    }, []);
    const nextPage = () => setPage((current) => current + 1);
    const prevPage = () => setPage((current) => current - 1);
    return (
        <Helmet title="Danh sách khóa luận của tôi">
            <div className="my-theses-wrapper">
                <ButtonGroup aria-label="Basic example" className="mt-2">
                    <Button onClick={prevPage}>&lt;&lt;</Button>
                    <Button onClick={nextPage}>&gt;&gt;</Button>
                </ButtonGroup>
                <Row>{theses && theses.map((c) => <ThesisCard type={'studentThesis'} key={c.id} data={c} />)}</Row>
            </div>
        </Helmet>
    );
}

export default MyTheses;
