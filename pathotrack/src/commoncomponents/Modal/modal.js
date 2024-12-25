import React, {useState,useEffect} from 'react';
import './modal.css';
import axios from 'axios';

const Modal = ({ setOpenCreate, item }) => {
  const [input, setInput] = useState({
      "name": item?item.name:"",
      "age": item?item.age:"",
      "address": item?item.address:"",
      "mobile": item?item.mobile:"",
      "examinedBy": item?item.examinedBy:"",
      "examinedDate": item?item.examinedDate:"",
      "test": item?item.test:"",  
      "reportedDate": item?item.reportedDate:""
  });

    const [listOfTest, setListOfTest] = useState([]); // Define state for listOfTest

    useEffect(() => {
      handleSelectOption(); // Fetch test data on component mount
  }, []);

  const handleSelectOption = async () => {
    try {
        const response = await axios.get('http://localhost:3000/test/get');
        const data = response.data.data || [];

        setListOfTest(data); // Update the state with test data

        setInput({...input, test:data[0]._id})

        // Set the first test as the default if no test is selected
        if (data.length > 0 && !input.test) {
            setInput((prevInput) => ({
                ...prevInput,
                test: data[0]._id  // Set the first test ID as default
            }));
        }
    } catch (err) {
        console.error('Error fetching data:', err); 
    }
};

    const handleInput = (event) => {
        setInput({ ...input, [event.target.name]: event.target.value });
    };

    const handleCreateNew = async () => {
        if(!item){
            await axios.post("http://localhost:3000/patient/post",input).then(resp=>{
              console.log(resp)
              window.location.reload();
            }).catch(err=>{
                alert("Please fill every Details");
                console.log(err)
            })
        }else{
            await axios.put(`http://localhost:3000/patient/${item?._id}`,input).then(resp=>{
                console.log(resp)
                window.location.reload();
              }).catch(err=>{
                  alert("Something went wrong");
                  console.log(err)
              })
        }
    };

    return (
        <div className="modal">
            <div className="modal-card">
                <div className="modal-titlebox">
                    <div className="modal-title">{item?"Update Patient":"Create New"} </div>
                    <div className="x-btn" onClick={() => setOpenCreate(prev => !prev)}>X</div>
                </div>
                <div className="modal-body">
                    <div className="inputRowModal">
                        <div className="inputBox">
                            <div className="input-label">Name</div>
                            <input type='text' name="name" value={input.name} onChange={(e) => { handleInput(e) }} className="input-modal" placeholder="Enter a Name" />
                        </div>
                        <div className="inputBox">
                            <div className="input-label">Age</div>
                            <input type='text' name="age" value={input.age} onChange={(e) => { handleInput(e) }} className="input-modal" placeholder="Enter Age" />
                        </div>
                    </div>

                    <div className="inputRowModal">
                        <div className="inputBox">
                            <div className="input-label">Address</div>
                            <input type='text' name="address" value={input.address} onChange={(e) => { handleInput(e) }} className="input-modal" placeholder="Enter Address" />
                        </div>
                        <div className="inputBox">
                            <div className="input-label">Mobile</div>
                            <input type='text' name="mobile" value={input.mobile} onChange={(e) => { handleInput(e) }} className="input-modal" placeholder="Enter mobile number" />
                        </div>
                    </div>

                    <div className="inputRowModal">
                        <div className="inputBox">
                            <div className="input-label">Examined By</div>
                            <input type='text' name="examinedBy" value={input.examinedBy} onChange={(e) => { handleInput(e) }} className="input-modal" placeholder="Examined by" />
                        </div>
                        <div className="inputBox">
                            <div className="input-label">Examine Date</div>
                            <input type='date' name="examinedDate" value={input.examinedDate} onChange={(e) => { handleInput(e) }} className="input-modal" />
                        </div>
                    </div>

                    <div className="inputRowModal">
                        <div className="inputBox">
                            <div className="input-label">test</div>
                            <select className='input-modal' name='test' value={input.test} onChange={(e) => { handleInput(e) }}>
                              {
                                listOfTest?.map((item) => {
                                  return(
                                    <option value={`${item._id}`}>{item.name}</option>
                                  );
                                })
                              }
                            </select>
                        </div>
                        <div className="inputBox">
                            <div className="input-label">Report Date</div>
                            <input type='date' name="reportedDate" value={input.reportedDate} onChange={(e) => { handleInput(e) }} className="input-modal" />
                        </div>
                    </div>
                    <div className="btnDivModal">
                        <div className="submit-modal" onClick={handleCreateNew}>Submit</div>
                        <div className="submit-modal">Clear</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;
