import { Tooltip } from 'primereact/tooltip';
function InfoTooltip({ data, ...props }) {
    return (
        <>
            <Tooltip target=".image-info" />
            <div {...props}>
                <img
                    className="image-info"
                    data-pr-tooltip={data.last_name + ' ' + data.first_name}
                    data-pr-position="mouse"
                    src={data.img}
                    alt={data.last_name + ' ' + data.first_name}
                    style={{ width: 40, height: 40, borderRadius: '50%', marginRight: 8 }}
                />
            </div>
        </>
    );
}

export default InfoTooltip;
