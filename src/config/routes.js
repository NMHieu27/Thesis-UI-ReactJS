const routes = {
    // Client routes
    home: '/', 

    // Admin routes
    users: '/admin/danh-sach-tai-khoan', 
    register: '/admin/dang-ki-tai-khoan', 
    editUser: '/admin/tai-khoan/:userID',
    
    // Auth routes
    singin: '/auth/dang-nhap',

    // Assessor routes
    councils: '/academic-admin/danh-sach-hoi-dong',
    addCouncil: '/academic-admin/them-hoi-dong',
    editCouncil: '/academic-admin/cap-nhat-hoi-dong/:councilID',
};
export default routes;
