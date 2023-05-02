import { Dropdown } from 'primereact/dropdown';

export default function SelectMember({ data, selected, setSelected, placeholder }) {
    const selectedTemplate = (option, props) => {
        if (option) {
            return (
                <div className="d-flex align-items-center">
                    <img alt={option.first_name} src={option.img} className="rounded" width={'40px'} height={'40px'} />
                    <div style={{ marginLeft: '15px' }}>{option.last_name + ' ' + option.first_name}</div>
                </div>
            );
        }

        return <span>{props.placeholder}</span>;
    };

    const optionTemplate = (option) => {
        return (
            <div className="d-flex align-items-center">
                <img alt={option.first_name} src={option.img} className="rounded" width={'40px'} height={'40px'} />
                <div style={{ marginLeft: '15px' }}>{option.last_name + ' ' + option.first_name}</div>
            </div>
        );
    };
    return (
        <div className="card flex justify-content-center">
            <Dropdown
                value={selected}
                onChange={(e) => setSelected(e.value)}
                options={data}
                optionLabel={(option) => `${option.last_name} ${option.first_name}`}
                placeholder={placeholder}
                filter
                valueTemplate={selectedTemplate}
                itemTemplate={optionTemplate}
                className="w-full md:w-14rem"
            />
        </div>
    );
}
