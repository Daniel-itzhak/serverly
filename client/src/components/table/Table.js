import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import ServerForm from '../serverForm/ServerForm';
import Counter from '../counter/Counter';

export default function Table() {
    const port = 'http://localhost:5000/api/servers';
    const [servers, setServers] = useState(null);
    const [currentTime, setCurrentTime] = useState(new Date());
    const [index, setindex] = useState(0);
    const [message, setMessage] = useState(null);
    const [convert, setConvert] = useState(1);
    const selectList = useRef(null);
    const moneySymble = {
        USD : '$',
        ILS : '₪',
        EUR : '€'
    }


    useEffect(() => {
        axios.get(port).then(res => {
            setServers(res.data);
        })
    }, [index]);

    useEffect(() => {
        const timeInterval = setInterval(() => {
            setCurrentTime(new Date())
        }, 1000)
        return () => {
            clearInterval(timeInterval);
        }
    }, [])

    const handleToggle = (isRunning, id) => {
        const req = new URLSearchParams()
        req.append("isRunning", isRunning)
        axios.put(port + "/" + id, req).then((res, err) => {
            if (!err) setindex(index + 1)
        })
    }

    const handleDelete = (id, isRunning) => {
        if (isRunning) {
            setMessage('Running server can not be deleted');
            setTimeout(() => setMessage(null), 5000)
        }
        else {
            axios.delete(port + "/" + id).then((res, err) => {
                if (!err) setindex(index + 1)
            })
        }
    }

    const handleConverter = () => {
        axios.get(`https://free.currconv.com/api/v7/convert?q=USD_${selectList.current.value}&compact=ultra&apiKey=fdd4d0eda42dc08dcf38`).then(res => {
            setConvert(res.data['USD_' + selectList.current.value])
        })
    }

    return (
        <div className='mt-5 row'>
            {message &&
                <div className='col-sm-12 col-md-4 offset-md-4 bg-danger text center mb-2 p-3 text-white rounded-3'>
                    {message}
                </div>
            }
            <table className='col-12 table table-bordered border-primary'>
                <thead>
                    <tr>
                        <th scope="col">IP</th>
                        <th scope="col">Server Name</th>
                        <th scope="col">Time Running</th>
                        <th scope="col">Toggle</th>
                        <th scope="col">Type</th>
                        <th scope="col">Price</th>
                        <th scope="col">Delete</th>
                    </tr>
                    {servers && servers.map(server => (<tr key={server._id} className={`${server.Running.isRunning ? 'bg-info' : ''}`}>
                        <td>{server.ipAddress}</td>
                        <td>{server.Name}</td>
                        <td>{server.Running.isRunning ? <Counter dif={currentTime-new Date(server.Running.startTime)} /> : "---"}</td>
                        <td>{server.Running.isRunning ? <button className='btn btn-danger w-100' onClick={() => { handleToggle(!server.Running.isRunning, server._id) }}>Turn Off</button> : <button className='btn btn-success w-100' onClick={() => { handleToggle(!server.Running.isRunning, server._id) }}>Turn On</button>}</td>
                        <td>{server.Type.Name}</td>
                        <td>{server.Running.isRunning ? `${(convert * server.Type.pricePerMinute * Math.floor(((currentTime - new Date(server.Running.startTime)) / (1000 * 60)))).toFixed(4)}${selectList?moneySymble[selectList.current.value]:'$'}` : `${(convert*server.Type.pricePerMinute).toFixed(4)}${selectList?moneySymble[selectList.current.value]:'$'}/m`}</td>
                        <td><button className='btn btn-danger w-100' onClick={() => handleDelete(server._id, server.Running.isRunning)}>Delete</button></td>
                    </tr>))}
                </thead>
            </table>
            <div className='col-sm-12 col-md-3 offset-md-9'>
                <select ref={selectList} className="form-select" aria-label="Default select example" onChange={() => handleConverter()}>
                    <option defaultValue='USD'>USD</option>
                    <option value="ILS">ILS</option>
                    <option value="EUR">EUR</option>
                </select>
            </div>
            <ServerForm renderTable={setindex} port={port} handleMessage={setMessage} />
        </div>
    )
}
