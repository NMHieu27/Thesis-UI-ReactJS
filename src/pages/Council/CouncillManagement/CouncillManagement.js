import { FilterMatchMode } from 'primereact/api';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { InputText } from 'primereact/inputtext';
import { Tag } from 'primereact/tag';
import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Helmet from '~/components/Helmet/Helmet';
import config from '~/config';
import councilData from '~/fakedata/council';
import './CouncillManagement.scss'

function CouncilManagement() {
    const [councils, setCouncils] = useState();
    const [globalFilterValue, setGlobalFilterValue] = useState('');
    const [filters, setFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        id: { value: null, matchMode: FilterMatchMode.EQUALS },
        thesis_count: { value: null, matchMode: FilterMatchMode.EQUALS },
        status: { value: null, matchMode: FilterMatchMode.EQUALS },
        created_at: { value: null, matchMode: FilterMatchMode.CONTAINS },
        'major.name': { value: null, matchMode: FilterMatchMode.CONTAINS },
    });
    useEffect(() => {
        // Call API get councils
        setCouncils(councilData);
    }, []);
    const handleDeleteCouncil = (id) => {
        if (window.confirm('Do you want to delete this record?')) {
            // Call API delete
        }
    };
    // Render
    const getSeverity = (council) => {
        switch (council.status) {
            case 0:
                return 'danger';

            case 1:
                return 'success';
            default:
                return null;
        }
    };
    const statusBodyTemplate = (council) => {
        return <Tag value={council.status === 0 ? 'Đóng' : 'Mở'} severity={getSeverity(council)}></Tag>;
    };
    const renderMember = (rowData, field) => {
        return (
            <div className="text-center">
                <img
                    src={rowData[field].img}
                    alt={rowData[field].last_name +" "+ rowData[field].first_name }
                    style={{ width: 32, height: 32, borderRadius: '50%', marginRight: 8 }}
                />
                <p>{rowData[field].last_name +" "+ rowData[field].first_name}</p>
            </div>
        );
    };
    const renderMembers = (rowData) => {
        return (
            <>
            {rowData.members && rowData.members.map((member, index) =>
            <div key={index} className="text-center">
                <img
                    src={member.img}
                    alt={member.last_name +" "+ member.first_name }
                    style={{ width: 32, height: 32, borderRadius: '50%', marginRight: 8 }}
                />
                <p>{member.last_name +" "+ member.first_name}</p>
            </div>)}</>
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
            <Link to={config.routes.register}>
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
                        globalFilterFields={['id', 'thesis_count', 'status', 'created_at', 'major.name']}
                        emptyMessage="No councils found."
                    >
                        <Column field="id" header="ID" sortable></Column>
                        <Column header="Chainman" body={(rowData) => renderMember(rowData, 'chainman')}></Column>
                        <Column header="Secretary" body={(rowData) => renderMember(rowData, 'secretary')}></Column>
                        <Column header="Assessor" body={(rowData) => renderMember(rowData, 'assessor')}></Column>
                        <Column header="Members" body={renderMembers}></Column>
                        <Column header="Major" body={rowData => rowData.major.name}></Column>
                        <Column header="Thesis count" field='thesis_count' sortable></Column>
                        <Column header="Created at" body={(rowData)=>rowData.created_at} sortable></Column>
                        <Column body={statusBodyTemplate} header="Status"></Column>
                        <Column header="Action" body={actionBodyTemplate}></Column>
                    </DataTable>
                </div>
            </div>
        </Helmet>
    );
}

export default CouncilManagement;
