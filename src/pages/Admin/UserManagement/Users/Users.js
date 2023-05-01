import Helmet from '~/components/Helmet/Helmet';
import './Users.scss';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser, fetchUsers } from '~/redux/actions/usersActions';
import { usersData } from '~/fakedata/users';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Tag } from 'primereact/tag';
import { InputText } from 'primereact/inputtext';
import { FilterMatchMode } from 'primereact/api';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import config from '~/config';
function Users() {
    const users = useSelector((state) => state.users.data);
    const dispatch = useDispatch();
    // const [users, setUsers] = useState();
    const [globalFilterValue, setGlobalFilterValue] = useState('');
    const [filters, setFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        id: { value: null, matchMode: FilterMatchMode.EQUALS },
        username: { value: null, matchMode: FilterMatchMode.CONTAINS },
        first_name: { value: null, matchMode: FilterMatchMode.CONTAINS },
        last_name: { value: null, matchMode: FilterMatchMode.CONTAINS },
        status: { value: null, matchMode: FilterMatchMode.CONTAINS },
        email: { value: null, matchMode: FilterMatchMode.CONTAINS },
        'role.name': { value: null, matchMode: FilterMatchMode.CONTAINS },
        'major.name': { value: null, matchMode: FilterMatchMode.CONTAINS },
    });
    useEffect(() => {
        // setUsers(users)
        dispatch(fetchUsers(usersData));
    }, []);

    const handleDeleteUser = (id) => {
        if (window.confirm('Do you want to delete this record?')) {
            dispatch(deleteUser(id));
        }
    };
    // Render
    const getSeverity = (user) => {
        switch (user.status) {
            case 0:
                return 'danger';

            case 1:
                return 'success';
            default:
                return null;
        }
    };
    const imageBodyTemplate = (user) => {
        return <img src={user.img} width="40" height="40" className="rounded-circle" alt="err" />;
    };
    const roleBodyTemplate = (user) => {
        return user.role.name;
    };
    const majorBodyTemplate = (user) => {
        return user.major.name;
    };
    const statusBodyTemplate = (user) => {
        return <Tag value={user.status === 0 ? 'Khóa' : 'Không khóa'} severity={getSeverity(user)}></Tag>;
    };
    const actionBodyTemplate = (rowData) => {
        return (
            <div className="d-flex action-container">
                <Link to={`/admin/tai-khoan/${rowData.id}`}>
                    <Button variant="success">
                        <i className="fa-solid fa-pen-to-square"></i>
                    </Button>
                </Link>
                <Button variant="danger" onClick={() => handleDeleteUser(rowData.id)}>
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
        <Helmet title="Danh sách tài khoản">
            <div className="users-wrapper">
                <h2 className="text-center m-4" style={{ color: '#0841c3' }}>
                    Quản lí tài khoản
                </h2>
                <div className="card">
                    <DataTable
                        header={header}
                        value={users}
                        paginator
                        rows={5}
                        rowsPerPageOptions={[5, 10, 25, 50]}
                        dataKey="id"
                        filters={filters}
                        globalFilterFields={[
                            'id',
                            'username',
                            'first_name',
                            'last_name',
                            'status',
                            'email',
                            'role.name',
                            'major.name',
                        ]}
                        emptyMessage="No users found."
                    >
                        <Column field="id" header="ID" sortable></Column>
                        <Column body={imageBodyTemplate} header="Image"></Column>
                        <Column field="username" header="Username" sortable></Column>
                        <Column field="first_name" header="First name" sortable></Column>
                        <Column field="last_name" header="Last name" sortable></Column>
                        <Column field="email" header="Email" sortable></Column>
                        <Column body={roleBodyTemplate} header="Role"></Column>
                        <Column body={majorBodyTemplate} header="Major"></Column>
                        <Column body={statusBodyTemplate} header="Status"></Column>
                        <Column header="Action" body={actionBodyTemplate}></Column>
                    </DataTable>
                </div>
            </div>
        </Helmet>
    );
}

export default Users;
