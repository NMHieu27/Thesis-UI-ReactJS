function Info({ data, ...props }) {
    return (
        <div {...props} className="d-flex align-items-center mb-4">
            <img
                src={data.img}
                alt={data.last_name + ' ' + data.first_name}
                style={{ width: 40, height: 40, borderRadius: '50%', marginRight: 8 }}
            />
            <p style={{ marginBottom: '0' }}>{data.last_name + ' ' + data.first_name}</p>
        </div>
    );
}

export default Info;
