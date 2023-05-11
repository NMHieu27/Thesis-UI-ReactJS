import React, { useEffect, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputNumber } from 'primereact/inputnumber';
import { useNavigate, useParams } from 'react-router-dom';
import { criteriaData } from '~/fakedata/criteria';
import Helmet from '~/components/Helmet/Helmet';
import ButtonSubmit from '~/components/Form/ButtonSubmit/ButtonSubmit';
import thesisAPI from '~/api/thesisAPI/thesisAPI';
import { toast } from 'react-toastify';
function EditEvaluation() {
    const nav = useNavigate();
    const { thesisID } = useParams();
    const [evaluationCriteria, setEvaluationCriteria] = useState(null);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        // Call api get evaluationCriteria by thesis id
        const fetchMarkForm = async () => {
            try {
                const res = await thesisAPI.thesisMarked(thesisID);
                setEvaluationCriteria(res.data);
            } catch {
                toast.error('Có lỗi xảy ra khi lấy form chấm điểm!');
            }
        };
        fetchMarkForm();
        // setEvaluationCriteria(criteriaData[thesisID - 1]);
    }, []);

    const handleSaveEvaluation = () => {
        // Call API here
        const process = async () => {
            try{
                const res = await thesisAPI.updateMark(thesisID, JSON.stringify(evaluationCriteria))
                toast.success("Đã hoàn tất chấm điểm!");
                setLoading(false);
                nav(-1);
            }catch{
                toast.error("Có lỗi xảy ra!");
                setLoading(false);
            }
        }
        setLoading(true);
        process();
        console.log(evaluationCriteria);
    };
    const onRowEditComplete = (e) => {
        let _criteria = [...evaluationCriteria.criteriaDetail];
        let { newData, index } = e;
        // let isMarked = newData.mark !== null ? true : false;
        // _criteria[index] = {...newData,isMarked: isMarked};
        _criteria[index] = newData;

        setEvaluationCriteria({ ...evaluationCriteria, criteriaDetail: _criteria });
    };

    const markEditor = (options) => {
        return (
            <InputNumber
                mode="decimal"
                value={options.value}
                onValueChange={(e) => options.editorCallback(e.value)}
                minFractionDigits={0}
                maxFractionDigits={2}
                min={0}
                max={10}
            />
        );
    };
    const footerTemplate = () => {
        return (
            <div className="btn-save-container" style={{ textAlign: 'right' }}>
                <ButtonSubmit content="Lưu" loading={loading} onClick={() => handleSaveEvaluation()} />
            </div>
        );
    };
    return (
        <Helmet title="Chấm điểm">
            <div className="evaluation-wrapper">
                <h2 className="text-center m-4" style={{ color: '#0841c3' }}>
                    Chấm điểm
                </h2>
                <div className="card p-fluid">
                    {evaluationCriteria && (
                        <DataTable
                            value={evaluationCriteria.criteriaDetail}
                            editMode="row"
                            dataKey="name"
                            onRowEditComplete={onRowEditComplete}
                            footer={footerTemplate}
                        >
                            <Column
                                header="Criteria"
                                body={(rowData) => (
                                    <p
                                        className="criteria-detail-container"
                                        dangerouslySetInnerHTML={{ __html: rowData.criteria.description }}
                                    ></p>
                                )}
                            ></Column>
                            <Column
                                header="Percent"
                                body={(rowData) => (rowData.criteria.percent * 100).toFixed(0) + '%'}
                            ></Column>
                            <Column
                                field="mark"
                                header="Mark"
                                editor={(options) => markEditor(options)}
                                style={{ width: '20%' }}
                            ></Column>
                            <Column
                                rowEditor
                                headerStyle={{ width: '10%', minWidth: '8rem' }}
                                bodyStyle={{ textAlign: 'center' }}
                            ></Column>
                        </DataTable>
                    )}
                </div>
            </div>
        </Helmet>
    );
}
export default EditEvaluation;
