import './MultiSelectUser.scss';
import React, { useState, useEffect } from 'react';
import { MultiSelect } from 'primereact/multiselect';
import Image from '../Image/Image';

export default function MultiSelectUser({ data, placeholder, selected, setSelected, maxSelected }) {
    const [hideFilter, setHideFilter] = useState(false);

    const userTemplate = (option) => {
        return (
            <div className="d-flex align-items-center">
                <Image alt={option.first_name} src={option.avatar} className="rounded" width={'40px'} height={'40px'} />
                <div style={{ marginLeft: '15px' }}>{option.last_name + ' ' + option.first_name}</div>
            </div>
        );
    };

    const panelFooterTemplate = () => {
        const length = selected ? selected.length : 0;

        return (
            <div className="py-2 px-3">
                <b>{length}</b> user{length > 1 ? 's' : ''} selected.
            </div>
        );
    };

    useEffect(() => {
        if (selected?.length >= maxSelected) {
            setHideFilter(true);
        } else {
            setHideFilter(false);
        }
    }, [selected]);

    const handleOnChange = (e) => {
        setSelected(e.value);
        if (e.value && e.value?.length >= maxSelected) {
            const options = document.querySelectorAll('.p-multiselect-item:not(.p-highlight)');
            console.log(options);
            options.forEach((option, index) => {
                option.classList.add('hidden-option');
            });
        } else {
            const options = document.querySelectorAll('.p-multiselect-item');
            options.forEach((option) => {
                option.classList.remove('hidden-option');
            });
        }
    };
    const handleClick = ()=>{
        if (selected !== null && selected.length >= maxSelected) {
            const options = document.querySelectorAll('.p-multiselect-item:not(.p-highlight)');
            console.log(options);
            options.forEach((option, index) => {
                option.classList.add('hidden-option');
            });
        } else {
            const options = document.querySelectorAll('.p-multiselect-item');
            options.forEach((option) => {
                option.classList.remove('hidden-option');
            });
        }
    }
    const handleOnRemoveTag = (e, option) => {
        setSelected(selected.filter((user) => user.id !== option.id));
    };
    const selectedItemTemplate = (option) => {
        return (
            selected !== null && selected.length > 0 && (
                <div className="p-multiselect-token">
                    <span className="p-multiselect-token-label">
                        <div className="d-flex align-items-center">
                            <Image
                                alt={option.first_name}
                                src={option.avatar}
                                className="rounded"
                                width={'40px'}
                                height={'40px'}
                            />
                            <div style={{ marginLeft: '15px' }}>{option.last_name + ' ' + option.first_name}</div>
                        </div>
                    </span>
                    <span
                        className="p-multiselect-token-icon fa-solid fa-circle-xmark"
                        onClick={(e) => handleOnRemoveTag(e, option)}
                    ></span>
                </div>
            )
        );
    };
    return (
        <div className="card flex justify-content-center">
            <MultiSelect
                value={selected}
                options={data}
                onShow ={()=> handleClick()}
                onChange={handleOnChange}
                optionLabel={(option) => `${option.last_name} ${option.first_name}`}
                placeholder={placeholder}
                itemTemplate={userTemplate}
                panelFooterTemplate={panelFooterTemplate}
                className="w-full md:w-20rem"
                display="chip"
                filter={!hideFilter}
                filterPlaceholder="Search"
                maxSelectedLabels={maxSelected}
                selectedItemTemplate={selectedItemTemplate}
                showSelectAll={false}
            />
        </div>
    );
}
