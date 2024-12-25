import React, { useState, useEffect } from 'react';
import './status.css';
import UpdateIcon from '@mui/icons-material/Update';
import DeleteIcon from '@mui/icons-material/Delete';
import ArticleIcon from '@mui/icons-material/Article';
import { Modal } from '@mui/material';
import noDataImg from '../../../assets/nodata.jpeg';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Status = () => {
  const [activeBar, setActiveBar] = useState('Pending');
  const [data, setData] = useState([]);
  const [clickedUpdate, setClickedUpdate] = useState(false);
  const [clickedPatient, setClickedpat] = useState(null);

  useEffect(() => {
    fetchPatient();
  }, [activeBar]);

  const fetchPatient = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/patient/getStatus/${activeBar}`);
      setData(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  const UpdateIconClick = (item) => {
    setClickedUpdate(true);
    setClickedpat(item);
  }

  const deletePatient = async (id) => {
    try {
      const resp = await axios.delete(`http://localhost:3000/patient/${id}`);
      setData(resp.data.data);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className='statusPage'>
      <div className='statusPageWorkDiv'>
        <div className='statusBar'>
          <div className={`statusTitle ${activeBar === 'Pending' ? 'activeBarStatus' : ''}`} onClick={() => setActiveBar('Pending')}>Pending</div>
          <div className={`statusTitle ${activeBar === 'Completed' ? 'activeBarStatus' : ''}`} onClick={() => setActiveBar('Completed')}>Completed</div>
        </div>
        <div className='statusList'>
          {data.length > 0 ? (
            data.map((item) => (
              <div key={item._id} className='statusRowList'>
                <div className='statusName'>{item?.name}</div>
                <div className='statusDrDetails'>
                  <div className='statusDrName'>{item?.examinedBy}</div>
                  <div className='statusDrName'>{item?.examinedDate}</div>
                </div>
                <div className='statusBtns'>
                  <div className='icons' style={{ backgroundColor: 'yellowgreen' }} onClick={() => UpdateIconClick(item)}><UpdateIcon /></div>
                  <div className='icons' style={{ backgroundColor: 'red' }} onClick={() => deletePatient(item._id)}><DeleteIcon /></div>
                  <Link to={activeBar === 'Completed' ? `/prescription/${item._id}` : `/report/${item._id}`} className='icons'><ArticleIcon /></Link>
                </div>
              </div>
            ))
          ) : (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
              <img width={350} src={noDataImg} alt="No data available" />
            </div>
          )}
        </div>
      </div>
      {clickedUpdate && <Modal item={clickedPatient} setOpenCreate={setClickedUpdate} />}
    </div>
  );
};

export default Status;
