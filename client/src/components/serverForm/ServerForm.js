import React, { useRef } from 'react'
import axios from 'axios'

export default function ServerForm({ renderTable, port, handleMessage }) {
    const nameRef = useRef(null);
    const ipRef = useRef(null);
    const typeRef = useRef(null);

    const handleSubmit = () => {
        const checkLength = ipRef.current.value.length && nameRef.current.value.length;
        if (!checkLength) {
            handleMessage('All Fildes are requierd!');
            setTimeout(() => handleMessage(null), 5000);
            return
        }
        const checkIp = /^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)(\.|$)){4}/.test(ipRef.current.value + '.');
        if (!checkIp) {
            handleMessage('Invalid IP Address!');
            setTimeout(() => handleMessage(null), 5000);
            return
        }
        const typeName = typeRef.current.value.split(',')[0];
        const pricePerMinute = typeRef.current.value.split(',')[1];
        const req = new URLSearchParams()

        req.append("name", nameRef.current.value);
        req.append("ipAddress", ipRef.current.value);
        req.append("typeName", typeName);
        req.append("pricePerMinute", pricePerMinute);

        axios.post(port, req).then((res, err) => {
            if (!err) {
                const uniqe = new Date()
                renderTable(uniqe.getTime());
                nameRef.current.value = '';
                ipRef.current.value = '';
            }
        })
    }

    return (
        <div className='row mt-3'>
            <div className='col-sm-6 col-md-3'>
                <span>Server Name</span>
                <input type='text' className='form-control' ref={nameRef} />
                <select ref={typeRef} className="form-select mt-3" aria-label="Default select example">
                    <option value='nano,0.03'>nano</option>
                    <option value='micro,0.05'>micro</option>
                    <option value='xl,0.07'>xl</option>
                    <option value='xxl,0.09'>xxl</option>
                </select>
            </div>
            <div className='col-sm-6 col-md-3'>
                <span>Server IP</span>
                <input type='text' className='form-control' ref={ipRef} />
                <button className='btn btn-success mt-3' onClick={() => handleSubmit()}>Add Server</button>
            </div>
        </div>
    )
}
