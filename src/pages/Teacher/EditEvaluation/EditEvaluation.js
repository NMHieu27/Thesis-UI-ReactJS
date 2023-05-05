import React, { useEffect, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputNumber } from 'primereact/inputnumber';
import { useParams } from 'react-router-dom';
import { criteriaData } from '~/fakedata/criteria';
import Helmet from '~/components/Helmet/Helmet';
import ButtonSubmit from '~/components/Form/ButtonSubmit/ButtonSubmit';
function EditEvaluation() {
    const { thesisID } = useParams();
    const [evaluationCriteria, setEvaluationCriteria] = useState(null);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        // Call api get evaluationCriteria by thesis id
        setEvaluationCriteria(criteriaData[thesisID - 1]);
    }, []);

    const handleSaveEvaluation = ()=>{
        // Call API here
        setLoading(true);
        console.log(evaluationCriteria);
    }
    const onRowEditComplete = (e) => {
        let _criteria = [...evaluationCriteria.criteria];
        let { newData, index } = e;

        _criteria[index] = newData;

        setEvaluationCriteria({ ...evaluationCriteria, criteria: _criteria });
    };

    const markEditor = (options) => {
        return (
            <InputNumber
                value={options.value}
                onValueChange={(e) => options.editorCallback(e.value)}
                min={0}
                max={10}
            />
        );
    };
    const footerTemplate = ()=>{
        return(<div className='btn-save-container' style={{textAlign:'right'}}>
            <ButtonSubmit content="Lưu" loading={loading} onClick={() => handleSaveEvaluation()}/>
        </div>)
    }
    return (
        <Helmet title="Chấm điểm">
            <div className="evaluation-wrapper">
            <h2 className="text-center m-4" style={{ color: '#0841c3' }}>
                    Chấm điểm
                </h2>
                <div className="card p-fluid">
                    {evaluationCriteria && (
                        <DataTable
                            value={evaluationCriteria.criteria}
                            editMode="row"
                            dataKey="name"
                            onRowEditComplete={onRowEditComplete}
                            footer={footerTemplate}
                        >
                            <Column field="name" header="Criteria"></Column>
                            <Column
                                field="percent"
                                header="Percent"
                                body={(rowData) => (rowData.percent * 100).toFixed(0) + '%'}
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
