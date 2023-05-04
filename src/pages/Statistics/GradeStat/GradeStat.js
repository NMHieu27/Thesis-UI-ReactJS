import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { useEffect, useState } from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import ButtonSubmit from '~/components/Form/ButtonSubmit/ButtonSubmit';
import InputItem from '~/components/Form/InputItem/InputItem';
import Helmet from '~/components/Helmet/Helmet';
import { gradeStateData } from '~/fakedata/gradeState';
import BarChart from '~/components/Chart/BarChart';
function GradeStat() {
    const [gradeData, setGradeData] = useState();
    const [statData, setStatData] = useState();
    const [year, setYear] = useState(new Date().getFullYear());
    const [loading, setLoading] = useState(false);

    //Random color
    let colors = [];
    let borderColors = [];
    let r, g, b;
    for (const data in gradeData) {
        r = Math.random() * 255;
        g = Math.random() * 255;
        b = Math.random() * 255;
        colors.push(`rgba(${r}, ${g}, ${b}, 0.4)`);
        borderColors.push(`rgba(${r}, ${g}, ${b}, 1)`);
    }

    const handleStat = async () => {
        // const res = await ...; Call API get data for chart and table
        setGradeData(gradeStateData);
    };
    useEffect(() => {
        handleStat();
    }, []);

    useEffect(() => {
        setStatData({
            labels: gradeData?.map((data) => `Grade ${data.mark}`),
            datasets: [
                {
                    label: 'Số lượng',
                    data: gradeData?.map((data) => data.count),
                    backgroundColor: colors,
                    borderColor: borderColors,
                    borderWidth: 1,
                },
            ],
        });
    }, [gradeData]);

    const handleYearChange = (e) => {
        e.preventDefault();
        // Call handleStat to update
        handleStat();
        setLoading(true);
    };
    return (
        <Helmet title="Thống kê điểm số khóa luận">
            <div className="grade-stat-wrapper">
                <h2 className="text-center m-4" style={{ color: '#0841c3' }}>
                    THỐNG KÊ ĐIỂM SỐ KHÓA LUẬN
                </h2>
                <div className="grade-stat-container">
                    <div className="search-container" style={{ display: 'grid' }}>
                        <div className="card p-4" style={{ placeSelf: 'center' }}>
                            <Form onSubmit={handleYearChange}>
                                <InputItem
                                    type="number"
                                    value={year}
                                    setValue={(e) => setYear(e.target.value)}
                                    name="year"
                                    label="Nhập năm cần thống kê"
                                    min={1980}
                                />
                                <div className="btn-stat-container text-center">
                                    <ButtonSubmit content="Thống kê" loading={loading} />
                                </div>
                            </Form>
                        </div>
                    </div>
                    <div className="stat-content m-4">
                        <Row>
                            <Col xl={6} xs={12}>
                                {gradeData && (
                                    <>
                                        <h4 className="text-center m-4" style={{ color: '#0841c3' }}>
                                        Bảng thống kê
                                        </h4>
                                        <div className="card">
                                            <DataTable value={gradeData}>
                                                <Column field="mark" header="Grade"></Column>
                                                <Column field="count" header="Count"></Column>
                                            </DataTable>
                                        </div>
                                    </>
                                )}
                            </Col>
                            <Col xl={6} xs={12}>
                                {gradeData && (
                                    <>
                                        <h4 className="text-center m-4" style={{ color: '#0841c3' }}>
                                            Biểu đồ thống kê
                                        </h4>
                                        <BarChart chartData={statData} />
                                    </>
                                )}
                            </Col>
                        </Row>
                    </div>
                </div>
            </div>
        </Helmet>
    );
}

export default GradeStat;
