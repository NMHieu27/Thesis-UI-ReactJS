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
import { thesesData } from '~/fakedata/theses';

function ThesisManagement() {
    const [theses, setTheses] = useState();
    const [globalFilterValue, setGlobalFilterValue] = useState('');
    const [filters, setFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        name: { value: null, matchMode: FilterMatchMode.CONTAINS },
        id: { value: null, matchMode: FilterMatchMode.EQUALS },
        status: { value: null, matchMode: FilterMatchMode.EQUALS },
        mark: { value: null, matchMode: FilterMatchMode.EQUALS },
        created_date: { value: null, matchMode: FilterMatchMode.CONTAINS },
        'major.name': { value: null, matchMode: FilterMatchMode.CONTAINS },
        'criteriaForm.name': { value: null, matchMode: FilterMatchMode.CONTAINS },
    });
    useEffect(() => {
        // Call API get theses
        setTheses(thesesData);
    }, []);
    const handleDeleteThesis = (id) => {
        if (window.confirm('Do you want to delete this record?')) {
            // Call API delete
        }
    };
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
        return <Tag value={council.status === 0 ? 'Chưa chấm' : 'Đã chấm'} severity={getSeverity(council)}></Tag>;
    };

    const renderMembers = (rowData, field) => {
        return (
            <>
                {rowData[field] &&
                    rowData[field].map((member, index) => (
                        <div key={index} className="text-center">
                            <img
                                src={member.img}
                                alt={member.last_name + ' ' + member.first_name}
                                style={{ width: 40, height: 40, borderRadius: '50%', marginRight: 8 }}
                            />
                            <p>{member.last_name + ' ' + member.first_name}</p>
                        </div>
                    ))}
            </>
        );
    };
    const actionBodyTemplate = (rowData) => {
        return (
            <div className="d-flex action-container">
                <Link to={`/academic-admin/cap-nhat-khoa-luan/${rowData.id}`}>
                    <Button variant="success">
                        <i className="fa-solid fa-pen-to-square"></i>
                    </Button>
                </Link>
                <Button variant="danger" onClick={() => handleDeleteThesis(rowData.id)}>
                    <i className="fa-solid fa-trash"></i>
                </Button>
                <Button variant="secondary" onClick={() => handleDeleteThesis(rowData.id)}>
                    <i className="fa-solid fa-file-pdf"></i>
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
            <Link to={config.routes.addThesis}>
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
        <Helmet title="Danh sách khóa luận">
            <div className="theses-wrapper">
                <h2 className="text-center m-4" style={{ color: '#0841c3' }}>
                    Quản lí khóa luận khoa
                </h2>
                <div className="card">
                    <DataTable
                        header={header}
                        value={theses}
                        paginator
                        rows={5}
                        rowsPerPageOptions={[5, 10, 25, 50]}
                        dataKey="id"
                        filters={filters}
                        globalFilterFields={[
                            'name',
                            'id',
                            'status',
                            'mark',
                            'created_date',
                            'major.name',
                            'criteriaForm.name',
                        ]}
                        emptyMessage="No theses found."
                    >
                        <Column field="id" header="ID" sortable></Column>
                        <Column field="name" header="Name" sortable></Column>
                        <Column header="Students" body={(rowData) => renderMembers(rowData, 'students')}></Column>
                        <Column header="Teachers" body={(rowData) => renderMembers(rowData, 'teachers')}></Column>
                        <Column field="major.name" header="Major" body={(rowData) => rowData.major.name}></Column>
                        <Column
                            field="criteriaForm.name"
                            header="Criteria"
                            body={(rowData) => rowData.criteriaForm.name}
                            sortable
                        ></Column>
                        <Column
                            field="council.id"
                            header="Council"
                            body={(rowData) => `Hội đồng ${rowData.council.id}`}
                            sortable
                        ></Column>
                        <Column
                            field="mark"
                            header="Mark"
                            body={(rowData) => (rowData.mark === null ? 'Chưa chấm' : rowData.mark)}
                            sortable
                        ></Column>
                        <Column header="Created date" body={(rowData) => rowData.created_date} sortable></Column>
                        <Column body={statusBodyTemplate} header="Status" field="status" sortable></Column>
                        <Column header="Action" body={actionBodyTemplate}></Column>
                    </DataTable>
                </div>
            </div>
        </Helmet>
    );
}

export default ThesisManagement;
