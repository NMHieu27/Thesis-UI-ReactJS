import { FilterMatchMode } from 'primereact/api';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { InputText } from 'primereact/inputtext';
import { Tag } from 'primereact/tag';
import { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import Moment from 'react-moment';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import councilAPI from '~/api/councilAPI/councilAPI';
import ButtonSubmit from '~/components/Form/ButtonSubmit/ButtonSubmit';
import InputItem from '~/components/Form/InputItem/InputItem';
import Helmet from '~/components/Helmet/Helmet';
import config from '~/config';
import councilData from '~/fakedata/council';

function CouncilManagement() {
    const majorID = useSelector((state) => state.auth.user.major.id);
    const nav = useNavigate();
    const [loading, setLoading] = useState(false);
    const [isDelete, setIsDelete] = useState(false);
    const [year, setYear] = useState(new Date().getFullYear());
    const [yearValue, setYearValue] = useState(new Date().getFullYear());
    const [councils, setCouncils] = useState(null);
    const [globalFilterValue, setGlobalFilterValue] = useState('');
    const [isChangeActive, setIsChangeActive] = useState(false);
    const [filters, setFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        id: { value: null, matchMode: FilterMatchMode.EQUALS },
        thesis_count: { value: null, matchMode: FilterMatchMode.EQUALS },
        active: { value: null, matchMode: FilterMatchMode.EQUALS },
        created_date: { value: null, matchMode: FilterMatchMode.CONTAINS },
        'major.name': { value: null, matchMode: FilterMatchMode.CONTAINS },
        'chairman.first_name': { value: null, matchMode: FilterMatchMode.CONTAINS },
        'secretary.first_name': { value: null, matchMode: FilterMatchMode.CONTAINS },
        'assessor.first_name': { value: null, matchMode: FilterMatchMode.CONTAINS },
    });
    useEffect(() => {
        // Call API get councils
        const fetchCouncils = async () => {
            try {
                const res = await councilAPI.getCouncilsByMajorID(majorID, year);
                setCouncils(res.data.councils);
                setLoading(false);
            } catch {
                toast.error('Không thể lấy danh sách hội đồng');
                setLoading(false);
            }
        };
        // setCouncils(councilData);
        fetchCouncils();
    }, [isDelete, isChangeActive, year]);
    console.log(councils);
    const handleDeleteCouncil = async (id) => {
        if (window.confirm('Do you want to delete this council?')) {
            // Call API delete
            try {
                const res = await councilAPI.deleteCouncil(id);
                toast.success('Xóa hội đồng thành công');
                setIsDelete(!isDelete);
            } catch {
                toast.error('Xóa hội đồng thất bại');
            }
        }
    };
    const handleBlockCouncil = async (id) => {
        if (window.confirm('Do you want to block this council?')) {
            // Call API block council
            try {
                const res = await councilAPI.closeCouncil(id);
                toast.success(`Đã đóng hội đồng khoa ${id}`);
                setIsChangeActive(!isChangeActive);
            } catch {
                toast.error(`Đóng hội ${id} thất bại!`);
            }
        }
    };
    const handleUnBlockCouncil = async (id) => {
        if (window.confirm('Do you want to unblock this council?')) {
            // Call API unblock council
            try {
                const res = await councilAPI.openCouncil(id);
                toast.success(`Đã mở hội đồng khoa ${id}`);
                setIsChangeActive(!isChangeActive);
            } catch {
                toast.error(`Mở hội ${id} thất bại!`);
            }
        }
    };
    const handleYearChange = (evt) => {
        evt.preventDefault();
        setLoading(true);
        if (year === yearValue) {
            setLoading(false);
        } else {
            setYear(yearValue);
        }
    };
    // Render
    const getSeverity = (council) => {
        switch (council.active) {
            case false:
                return 'danger';

            case true:
                return 'success';
            default:
                return null;
        }
    };
    const activeBodyTemplate = (council) => {
        return <Tag value={council.active === false ? 'Đóng' : 'Mở'} severity={getSeverity(council)}></Tag>;
    };
    const renderMember = (rowData, field) => {
        return (
            <div className="text-center">
                <img
                    src={rowData[field]?.avatar}
                    alt={rowData[field]?.last_name + ' ' + rowData[field]?.first_name}
                    style={{ width: 40, height: 40, borderRadius: '50%', marginRight: 8 }}
                />
                <p>{rowData[field]?.last_name + ' ' + rowData[field]?.first_name}</p>
            </div>
        );
    };
    const renderMembers = (rowData) => {
        return (
            <>
                {rowData?.members &&
                    rowData.members.map((member, index) => (
                        <div key={index} className="text-center">
                            <img
                                src={member?.avatar}
                                alt={member?.last_name + ' ' + member?.first_name}
                                style={{ width: 40, height: 40, borderRadius: '50%', marginRight: 8 }}
                            />
                            <p>{member?.last_name + ' ' + member?.first_name}</p>
                        </div>
                    ))}
            </>
        );
    };
    const actionBodyTemplate = (rowData) => {
        return (
            <div className="d-flex action-container">
                {/* <Link to={`/academic-admin/cap-nhat-hoi-dong/${rowData.id}`}> */}
                <Button
                    disabled={rowData.count !== 0}
                    variant="success"
                    onClick={() => nav(`/academic-admin/cap-nhat-hoi-dong/${rowData.id}`)}
                >
                    <i className="fa-solid fa-pen-to-square"></i>
                </Button>
                {/* </Link> */}
                <Button variant="danger" onClick={() => handleDeleteCouncil(rowData.id)}>
                    <i className="fa-solid fa-trash"></i>
                </Button>
                {rowData.active === false ? (
                    <Button variant="warning" onClick={() => handleUnBlockCouncil(rowData.id)}>
                        <i className="fa-solid fa-lock"></i>
                    </Button>
                ) : (
                    <Button variant="warning" onClick={() => handleBlockCouncil(rowData.id)}>
                        <i className="fa-solid fa-lock-open"></i>
                    </Button>
                )}
            </div>
        );
    };
    const onGlobalFilterChange = (e) => {
        const value = e.target.value;
        let _filters = { ...filters };

        _filters['global'].value = value;

        setFilters(_filters);
        setGlobalFilterValue(value);
    };
    const header = (
        <div className="d-flex justify-content-between">
            <Link to={config.routes.addCouncil}>
                <Button style={{ background: '#0841c3' }}>
                    <i className="fa-solid fa-plus"></i> Add
                </Button>
            </Link>
            <span className="p-input-icon-left">
                <i className="fa-solid fa-magnifying-glass"></i>
                <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Keyword Search" />
            </span>
        </div>
    );
    return (
        <Helmet title="Danh sách hội đồng">
            <div className="councils-wrapper">
                <h2 className="text-center m-4" style={{ color: '#0841c3' }}>
                    Quản lí hội đồng khoa
                </h2>
                <div className="search-container" style={{ display: 'grid' }}>
                    <div className="p-4" style={{ placeSelf: 'center' }}>
                        <Form onSubmit={handleYearChange} className="d-flex">
                            <InputItem
                                type="number"
                                value={yearValue}
                                setValue={(e) => setYearValue(e.target.value)}
                                name="year"
                                placeholder="Nhập năm"
                                // label="Nhập năm cần thống kê"
                                min={1980}
                            />
                            <div className="btn-stat-container text-center ms-2">
                                <ButtonSubmit content="Tìm" loading={loading} />
                            </div>
                        </Form>
                    </div>
                </div>
                <div className="card">
                    <DataTable
                        header={header}
                        value={councils}
                        paginator
                        rows={5}
                        rowsPerPageOptions={[5, 10, 25, 50]}
                        dataKey="id"
                        filters={filters}
                        globalFilterFields={[
                            'id',
                            'thesis_count',
                            'active',
                            'created_date',
                            'major.name',
                            'chairman.first_name',
                            'secretary.first_name',
                            'assessor.first_name',
                        ]}
                        emptyMessage="No councils found."
                    >
                        <Column field="id" header="ID" sortable></Column>
                        <Column header="Chairman" body={(rowData) => renderMember(rowData, 'chairman')}></Column>
                        <Column header="Secretary" body={(rowData) => renderMember(rowData, 'secretary')}></Column>
                        <Column header="Assessor" body={(rowData) => renderMember(rowData, 'assessor')}></Column>
                        <Column header="Members" body={renderMembers}></Column>
                        <Column header="Major" body={(rowData) => rowData.major?.name}></Column>
                        <Column header="Thesis count" field="count" sortable></Column>
                        <Column
                            header="Created date"
                            body={(rowData) => <Moment format="DD/MM/YYYY">{rowData.created_date}</Moment>}
                            sortable
                        ></Column>
                        <Column body={activeBodyTemplate} header="Active"></Column>
                        <Column header="Action" body={actionBodyTemplate}></Column>
                    </DataTable>
                </div>
            </div>
        </Helmet>
    );
}

export default CouncilManagement;
