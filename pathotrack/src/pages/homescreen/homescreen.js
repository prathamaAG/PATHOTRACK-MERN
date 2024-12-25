import React, { useEffect, useState, useRef } from 'react';
import './homescreen.css';
import LabPic from '../../assets/labscientist.webp';
import axios from 'axios';
import Modal from '../../commoncomponents/Modal/modal';

const Homescreen = () => {
  const [listofTest, setListofTest] = useState([]);
  const [activeIndexNav, setActiveIndexNav] = useState(0);
  const [selectedDetailedTest, setSelectedDetailtest] = useState(null);
  const [openCreate, setOpenCreate] = useState(false); // Modal state
  const feedbackRef = useRef(null); // Feedback section reference

  useEffect(() => {
    fetchDataonLoading();
  }, []);

  const fetchDataonLoading = async () => {
    try {
      const response = await axios.get('http://localhost:3000/test/get');
      const data = response.data.data || [];
      setListofTest(data);
      setSelectedDetailtest(data[0] || null);
      console.log('Fetched Data:', data);
    } catch (err) {
      console.error('Error fetching data:', err);
    }
  };

  const handleClickNavLink = (index) => {
    if (listofTest[index]) {
      setActiveIndexNav(index);
      setSelectedDetailtest(listofTest[index]);
    }
  };

  const scrollToFeedback = () => {
    feedbackRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="homescreen">
      {/* Modal - Render if openCreate is true */}
      {openCreate && <Modal setOpenCreate={setOpenCreate} item={null} />}

      <div className="introhomescreen">
        <div className="imghomescreenlogo">
          <div className="imgDiv">
            <img className='lablogohomescreen' src={LabPic} alt='Laboratory' />
          </div>
          <div className="intropart">
            <div className="titlemini">Enterprise Limited</div>
            <div className="titlemajor">Pathotrack</div>
            <div className="description1">
              Foundation of successful laboratory is comprehensive planning and management. This enables building and effectively executing an operating philosophy leading to scientific and business goals.
            </div>
            <div className="description2">
              Pathotrack is a web application that helps you to manage your laboratory and its operations. Our 40 years of experience in day-to-day lab operation using a proven set of methodologies, products, and services is now provided in a new manner to our users.
            </div>
            <div className="topBtnDiv">
              {/* <div className="btns-div" onClick={() => setOpenCreate(true)}> 
                Create
              </div> */}
              {/* <div className="btns-div" onClick={scrollToFeedback}> 
                Feedback
              </div> */}
            </div>
          </div>
        </div>
      </div>

      <div className='testhomescreen'>
        <div className="leftparttest">
          <div className="totaltest">{listofTest.length} Test Available</div>
          <div className="testNamediv">
            {listofTest.length > 0 ? (
              listofTest.map((item, index) => (
                <div
                  key={item.id}
                  onClick={() => handleClickNavLink(index)}
                  className={`testNameTitle ${activeIndexNav === index ? "activeNavLink" : ""}`}
                >
            {item.name}
          </div>
          ))
          ) : (
          <div>No tests available</div>
            )}
        </div>
      </div>
      <div className="rightparttest">
        <div className="topRightPart">
          {selectedDetailedTest?.name || "Select a test"}
        </div>
        <div className="bottomRightPart">
          <div className="topbottomRightPart">
            {selectedDetailedTest?.description || "No description available"}
          </div>
          <div className="bottombottomRightPart">
            <div className="bBRightPartLeftSide">
              <div className="detailsBlock">
                {"Fasting"} : <span className='spanColorChange'>{selectedDetailedTest?.fasting || "N/A"}</span>
              </div>
              <div className="detailsBlock">
                {"Abnormal Range"} : <span className='spanColorChange'>{selectedDetailedTest?.abnormalRange || "N/A"}</span>
              </div>
              <div className="detailsBlock">
                {"Normal Range"} : <span className='spanColorChange'>{selectedDetailedTest?.normalRange || "N/A"}</span>
              </div>
              <div className="detailsBlock">
                {"Price"} : <span className='spanColorChange'>{selectedDetailedTest?.price || "N/A"}</span>
              </div>
            </div>
            <div className="bBRightPartRightSide">
              <img
                src={selectedDetailedTest?.imglink || '/path/to/fallback-image.jpg'}
                alt='Test'
                className='bBRightImage'
              />
            </div>
          </div>
        </div>
      </div>
    </div>

      {/* Feedback Form */ }
      <div className='feedbackHomeScreen' ref={feedbackRef}> {/* Reference for feedback */}
        {/* <div className='feedbackFormTitle' id="feedback">Feedback Form</div>
        <div className='feedbackForm'>
          <div className='inputFields'>
            <input type='text' className='inputFieldsBox' placeholder='Enter your Name'/>
            <input type='number' className='inputFieldsBox' placeholder='Enter your Mobile Number'/>
            <input type='email' className='inputFieldsBox' placeholder='Enter your Email Id'/>
            <textarea className='inputTextareaMessage' placeholder='Type your message here ...' rows={10} />
          </div>
          <div className='sendEmailButton'>SEND</div>
        </div> */}
      </div>
      <footer />
    </div>
  );
}

export default Homescreen;
