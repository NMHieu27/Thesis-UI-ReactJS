import { useEffect, useState } from 'react';
import { Button, ButtonGroup, Row } from 'react-bootstrap';
import Helmet from '~/components/Helmet/Helmet';
import ThesisCard from '~/components/ThesisCard/ThesisCard';
import { thesesData } from '~/fakedata/theses';

function ThesisEvaluation() {
    const [theses, setTheses] = useState(null);
    const [page, setPage] = useState(1);
    useEffect(() => {
        // Call API get theses by user id (teacher)
        setTheses(thesesData);
    }, []);
    const nextPage = () => setPage((current) => current + 1);
    const prevPage = () => setPage((current) => current - 1);
    return (
        <Helmet title="Danh sách khóa luận">
            <div className="thesis-evaluation-wrapper">
                <ButtonGroup aria-label="Basic example" className="mt-2">
                    <Button onClick={prevPage}>&lt;&lt;</Button>
                    <Button onClick={nextPage}>&gt;&gt;</Button>
                </ButtonGroup>
                <Row>{theses && theses.map((c) => <ThesisCard type={'thesisTeacher'} key={c.id} data={c} />)}</Row>
            </div>
        </Helmet>
    );
}

export default ThesisEvaluation;
