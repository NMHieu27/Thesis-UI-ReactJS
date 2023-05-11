import { FilterMatchMode } from 'primereact/api';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { InputText } from 'primereact/inputtext';
import { Tag } from 'primereact/tag';
import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import Moment from 'react-moment';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import councilAPI from '~/api/councilAPI/councilAPI';
import Helmet from '~/components/Helmet/Helmet';
import config from '~/config';
import councilData from '~/fakedata/council';

function CouncilManagement() {
    const majorID = useSelector(state => state.auth.user.major.id);
    const [isDelete, setIsDelete] = useState(false);
    const [councils, setCouncils] = useState(null);
    const [globalFilterValue, setGlobalFilterValue] = useState('');
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
        const fetchCouncils = async () =>{
            try{
                const res = await councilAPI.getCouncilsByMajorID(majorID);
                setCouncils(res.data.councils);
            }
            catch{
                toast.error('Không thể lấy danh sách hội đồng')
            }
        }
        // setCouncils(councilData);
        fetchCouncils();
    }, [isDelete]);
    console.log(councils);
    const handleDeleteCouncil = async (id) => {
        if (window.confirm('Do you want to delete this council?')) {
            // Call API delete
            try{
                const res = await councilAPI.deleteCouncil(id);
                toast.success('Xóa hội đồng thành công');
                setIsDelete(!isDelete);
            }
            catch{
                toast.error('Xóa hội đồng thất bại');
            }
        }
    };
    const handleBlockCouncil = (id) => {
        if (window.confirm('Do you want to block this council?')) {
            // Call API block council
        }
    };
    const handleUnBlockCouncil = (id) => {
        if (window.confirm('Do you want to unblock this council?')) {
            // Call API unblock council
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
                <Link to={`/academic-admin/cap-nhat-hoi-dong/${rowData.id}`}>
                    <Button variant="success">
                        <i className="fa-solid fa-pen-to-square"></i>
                    </Button>
                </Link>
                <Button variant="danger" onClick={() => handleDeleteCouncil(rowData.id)}>
                    <i className="fa-solid fa-trash"></i>
                </Button>
                {rowData.active === 0 ? (
                    <Button variant="warning" onClick={() => handleUnBlockCouncil(rowData.id)}>
                        <i className="fa-solid fa-lock-open"></i>
                    </Button>
                ) : (
                    <Button variant="warning" onClick={() => handleBlockCouncil(rowData.id)}>
                        <i className="fa-solid fa-lock"></i>
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
                        <Column header="Created date" body={(rowData) => <Moment format='DD/MM/YYYY'>{rowData.created_date}</Moment>} sortable></Column>
                        <Column body={activeBodyTemplate} header="Active"></Column>
                        <Column header="Action" body={actionBodyTemplate}></Column>
                    </DataTable>
                </div>
            </div>
        </Helmet>
    );
}

export default CouncilManagement;
