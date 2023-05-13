import { useEffect, useState } from 'react';
import { Button, ButtonGroup, Row } from 'react-bootstrap';
import { toast } from 'react-toastify';
import thesisAPI from '~/api/thesisAPI/thesisAPI';
import Helmet from '~/components/Helmet/Helmet';
import ThesisCard from '~/components/ThesisCard/ThesisCard';
import { thesesData } from '~/fakedata/theses';

function MyTheses() {
    const [theses, setTheses] = useState(null);
    const [page, setPage] = useState(1);
    const [q, setQ] = useState(null);
    useEffect(() => {
        // Call API get theses by user id (teacher)
        const fetchTheses = async () =>{
            try{
                const res = await thesisAPI.getThesesByUser(q, page);
                setTheses(res.data);
            }catch{
                toast.error("Lấy danh sách khóa luận thất bại!");
            }
        }
        fetchTheses();
        // setTheses(thesesData);
    }, [q, page]);
    const nextPage = () => setPage((current) => current + 1);
    const prevPage = () => setPage((current) => current - 1);
    return (
        <Helmet title="Danh sách khóa luận của tôi">
            <div className="my-theses-wrapper">
                {/* <ButtonGroup aria-label="Basic example" className="mt-2">
                    <Button onClick={prevPage}>&lt;&lt;</Button>
                    <Button onClick={nextPage}>&gt;&gt;</Button>
                </ButtonGroup> */}
                <Row>
                    {theses?.length > 0 ? (
                        theses.map((c) => <ThesisCard type={'studentThesis'} key={c.id} data={c} />)
                    ) : (
                        <div className='text-center'>
                            <h2 className='txt-main-color'>Hiện tại bạn chưa có khóa luận nào</h2>
                        </div>
                    )}                    
                </Row>
            </div>
        </Helmet>
    );
}

export default MyTheses;
