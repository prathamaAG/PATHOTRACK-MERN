import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './navbar.css'; // Ensure the path is correct
import imgLogo from '../../assets/pathologo.jpg'; // Ensure the path is correct
import Modal from '../Modal/modal'; // Ensure Modal component exists
import axios from 'axios';

const Navbar = () => {
  const [openCreate, setOpenCreate] = useState(false);
  const [clickAddTest, setClickAddTest] = useState(false);
  const [input, setInput] = useState({
    name: '',
    description: '',
    price: '',
    imgLink: '', 
    fasting: '',
    normalRange: '',
    abnormalRange: ''
  });
  const ref = useRef();

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (clickAddTest && ref.current && !ref.current.contains(e.target)) {
        setClickAddTest(false);
      }
    };
    document.addEventListener('mousedown', checkIfClickedOutside);
    return () => {
      document.removeEventListener('mousedown', checkIfClickedOutside);
    };
  }, [clickAddTest]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({ ...prev, [name]: value }));
  };

  const onClickCreate = async () => {
    try {
      const res = await axios.post("http://localhost:3000/test/post", input);
      window.location.reload();  
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="navbar-container">
      <div className="navbar">
        <Link to='/'className="left-navbar">
          <img src={imgLogo} className="img-logo-navbar" alt="Pathotrack logo" />
          <h1>PATHOTRACK</h1>
        </Link>
        <div className="right-navbar">
          <div className="nav-link" onClick={() => setOpenCreate((prev) => !prev)}>
            Create new
          </div>
          <div className="nav-link" onClick={() => setClickAddTest(true)}>
            Add Test
          </div>
          {clickAddTest && (
            <div className="addtest-modal" ref={ref}>
              <div className="input-addtest-model">
                <label className="input-addtest-label">Name</label>
                <input
                  type="text"
                  name="name"
                  value={input.name}
                  onChange={handleInputChange}
                  placeholder="Enter test name"
                />
              </div>
              <div className="input-addtest-model">
                <label className="input-addtest-label">Description</label>
                <input
                  type="text"
                  name="description"
                  value={input.description}
                  onChange={handleInputChange}
                  placeholder="Enter description"
                />
              </div>
              <div className="input-addtest-model">
                <label className="input-addtest-label">Price</label>
                <input
                  type="text"
                  name="price"
                  value={input.price}
                  onChange={handleInputChange}
                  placeholder="Enter price"
                />
              </div>
              <div className="input-addtest-model">
                <label className="input-addtest-label">Image Link</label>
                <input
                  type="text"
                  name="imgLink" // Changed to match your server's expected field name
                  value={input.imgLink}
                  onChange={handleInputChange}
                  placeholder="Enter image URL"
                />
              </div>
              <div className="input-addtest-model">
                <label className="input-addtest-label">Fasting</label>
                <input
                  type="text"
                  name="fasting"
                  value={input.fasting}
                  onChange={handleInputChange}
                  placeholder="Enter fasting status"
                />
              </div>
              <div className="input-addtest-model">
                <label className="input-addtest-label">Normal Range</label>
                <input
                  type="text"
                  name="normalRange"
                  value={input.normalRange}
                  onChange={handleInputChange}
                  placeholder="Enter normal range"
                />
              </div>
              <div className="input-addtest-model">
                <label className="input-addtest-label">Abnormal Range</label>
                <input
                  type="text"
                  name="abnormalRange"
                  value={input.abnormalRange}
                  onChange={handleInputChange}
                  placeholder="Enter abnormal range"
                />
              </div>
              <button className="create-add-test" onClick={onClickCreate}>Create</button>
            </div>
          )}
          <Link to='/status' className="linksrightnavbar">
          Report
          </Link>
          <div className="nav-link">
            <Link to="/billing">Billing</Link>
          </div>
        </div>
      </div>
      {openCreate && <Modal setOpenCreate={setOpenCreate} />}
    </div>
  );
};

export default Navbar;
