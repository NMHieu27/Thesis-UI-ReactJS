import { useEffect, useState } from 'react';
import { Button, ButtonGroup, Form, Row } from 'react-bootstrap';
import { toast } from 'react-toastify';
import thesisAPI from '~/api/thesisAPI/thesisAPI';
import ButtonSubmit from '~/components/Form/ButtonSubmit/ButtonSubmit';
import InputItem from '~/components/Form/InputItem/InputItem';
import Helmet from '~/components/Helmet/Helmet';
import ThesisCard from '~/components/ThesisCard/ThesisCard';
import { thesesData } from '~/fakedata/theses';

function ThesisEvaluation() {
    const [theses, setTheses] = useState(null);
    const [page, setPage] = useState(1);
    const [kw, setKW] = useState(null);
    const [q, setQ] = useState(null);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        // Call API get theses by user id (teacher)
        const fetchTheses = async () => {
            try {
                const res = await thesisAPI.getThesesByUser(q, page);
                setTheses(res.data.theses);
                setLoading(false);
            } catch {
                toast.error('Lấy danh sách khóa luận thất bại!');
                setLoading(false);
            }
        };
        fetchTheses();
        // setTheses(thesesData);
    }, [q, page]);
    const nextPage = () => setPage((current) => current + 1);
    const prevPage = () => setPage((current) => current - 1);
    const handleSearch = (evt) => {
        evt.preventDefault();
        setLoading(true);
        setQ(kw);
    };
    return (
        <Helmet title="Danh sách khóa luận">
            <div className="thesis-evaluation-wrapper">
                <ButtonGroup aria-label="Basic example" className="mt-2">
                    <Button onClick={prevPage}>&lt;&lt;</Button>
                    <Button onClick={nextPage}>&gt;&gt;</Button>
                </ButtonGroup>
                <div className="search-container" style={{ display: 'grid' }}>
                    <div className="p-4" style={{ placeSelf: 'center' }}>
                        <Form onSubmit={handleSearch} className="d-flex">
                            <InputItem
                                type="text"
                                value={kw}
                                setValue={(e) => setKW(e.target.value)}
                                name="kw"
                                placeholder="Nhập từ khóa"
                            />
                            <div className="btn-stat-container text-center ms-2">
                                <ButtonSubmit content="Tìm kiếm" loading={loading} />
                            </div>
                        </Form>
                    </div>
                </div>
                <Row>
                    {theses?.length > 0 ? (
                        theses.map((c) => <ThesisCard type={'thesisTeacher'} key={c.id} data={c} />)
                    ) : (
                        <div className="text-center">
                            <h2 className="txt-main-color">Không có khóa luận cần chấm</h2>
                        </div>
                    )}
                </Row>
            </div>
        </Helmet>
    );
}

export default ThesisEvaluation;
