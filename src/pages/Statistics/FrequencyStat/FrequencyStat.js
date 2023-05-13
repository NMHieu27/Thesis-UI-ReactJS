import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { useEffect, useState } from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import ButtonSubmit from '~/components/Form/ButtonSubmit/ButtonSubmit';
import InputItem from '~/components/Form/InputItem/InputItem';
import Helmet from '~/components/Helmet/Helmet';
import { frequencyStateData } from '~/fakedata/frequency';
import PieChart from '~/components/Chart/PieChart';
import statsAPI from '~/api/statsAPI/statsAPI';
import { toast } from 'react-toastify';
function FrequencyStat() {
    const [frequencyData, setFrequencyData] = useState();
    const [statData, setStatData] = useState();
    const [year, setYear] = useState(new Date().getFullYear());
    const [loading, setLoading] = useState(false);

    //Random color
    let colors = [];
    let borderColors = [];
    let r, g, b;
    for (const data in frequencyData) {
        r = Math.random() * 255;
        g = Math.random() * 255;
        b = Math.random() * 255;
        colors.push(`rgba(${r}, ${g}, ${b}, 0.4)`);
        borderColors.push(`rgba(${r}, ${g}, ${b}, 1)`);
    }

    const handleStat = async () => {
        // const res = await ...; Call API get data for chart and table
        try {
            const res = await statsAPI.getFrequencyStat(year);
            setFrequencyData(res.data);
            setLoading(false);
        } catch {
            toast.error('Không thể lấy dữ liệu thống kê!');
            setLoading(false);
        }
    };
    useEffect(() => {
        handleStat();
    }, []);

    useEffect(() => {
        setStatData({
            labels: frequencyData?.map((data) => `Ngành ${data?.major__name}`),
            datasets: [
                {
                    label: 'Tham gia',
                    data: frequencyData?.map((data) => data?.count),
                    backgroundColor: colors,
                    borderColor: borderColors,
                    borderWidth: 1,
                },
            ],
        });
    }, [frequencyData]);

    const handleYearChange = (e) => {
        e.preventDefault();
        setLoading(true);
        if (year) {
            handleStat();
        } else {
            toast.error('Vui lòng nhập năm thống kê');
            setLoading(false);
        }
    };
    return (
        <Helmet title="Thống kê điểm số khóa luận">
            <div className="frequency-stat-wrapper">
                <h2 className="text-center m-4" style={{ color: '#0841c3' }}>
                    Thống kê tần suất tham gia khóa luận
                </h2>
                <div className="frequency-stat-container">
                    <div className="search-container" style={{ display: 'grid' }}>
                        <div className="p-4" style={{ placeSelf: 'center' }}>
                            <Form onSubmit={handleYearChange} className='d-flex'>
                                <InputItem
                                    type="number"
                                    value={year}
                                    setValue={(e) => setYear(e.target.value)}
                                    name="year"
                                    placeholder="Nhập năm"
                                    min={1980}
                                />
                                <div className="btn-stat-container text-center ms-2">
                                    <ButtonSubmit content="Thống kê" loading={loading} />
                                </div>
                            </Form>
                        </div>
                    </div>
                    <div className="stat-content m-4">
                        <Row>
                            <Col xl={6} xs={12}>
                                {frequencyData && (
                                    <>
                                        <h4 className="text-center m-4" style={{ color: '#0841c3' }}>
                                        Bảng thống kê
                                        </h4>
                                        <div className="card">
                                            <DataTable value={frequencyData}>
                                                <Column field="major__name" header="Major"></Column>
                                                <Column field="count" header="Count"></Column>
                                            </DataTable>
                                        </div>
                                    </>
                                )}
                            </Col>
                            <Col xl={6} xs={12}>
                                {frequencyData && (
                                    <>
                                        <h4 className="text-center m-4" style={{ color: '#0841c3' }}>
                                            Biểu đồ thống kê
                                        </h4>
                                        <PieChart chartData={statData} />
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

export default FrequencyStat;
