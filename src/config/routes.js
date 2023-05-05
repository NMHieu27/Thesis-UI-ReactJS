const routes = {
    // Client routes
    home: '/', 

    // Admin routes
    users: '/admin/danh-sach-tai-khoan', 
    register: '/admin/dang-ki-tai-khoan', 
    editUser: '/admin/cap-nhat-tai-khoan/:userID',
    
    // Auth routes
    singin: '/auth/dang-nhap',

    // Academic admin routes
    councils: '/academic-admin/danh-sach-hoi-dong',
    addCouncil: '/academic-admin/them-hoi-dong',
    editCouncil: '/academic-admin/cap-nhat-hoi-dong/:councilID',

    theses: '/academic-admin/danh-sach-khoa-luan',
    addThesis: '/academic-admin/them-khoa-luan',
    editThesis: '/academic-admin/cap-nhat-khoa-luan/:thesisID',

    // Teacher routes
    evaluation: '/teacher/danh-sach-khoa-luan-cham-diem',
    evaluationThesis: '/teacher/danh-sach-khoa-luan-cham-diem/khoa-luan/:thesisID',

    // Student routes
    studentTheses:'/student/danh-sach-khoa-luan',
    studentThesisDetail:'/student/danh-sach-khoa-luan/khoa-luan/:thesisID',

    // Statistics routes
    gradeStat:'/statistics/thong-ke-diem-khoa-luan',
    frequencyStat:'/statistics/thong-ke-tan-suat-tham-gia-khoa-luan'
};
export default routes;
