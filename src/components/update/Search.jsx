// import React, { useState } from 'react';
// import axios from 'axios';
// import Topnav from '../homepage/Topnav';

// const FindBirthByUserId = () => {
//   const [userId, setUserId] = useState('');
//   const [birthData, setBirthData] = useState(null);
//   const [error, setError] = useState(null);

//   const handleInputChange = (event) => {
//     setUserId(event.target.value);
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     setError(null); // Reset any previous errors
//     setBirthData(null); // Reset previous data

//     try {
//       const response = await axios.get(`http://localhost:9952/birth/findBirthByUserId/${userId}`);
//       setBirthData(response.data);
//     } catch (err) {
//       setError('Error fetching birth data. Please try again.');
//       console.error(err);
//     }
//   };

//   return (
//     <>
//     <Topnav></Topnav>
//     <div>
//       <h1>Find Birth by User ID</h1>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="number"
//           value={userId}
//           onChange={handleInputChange}
//           placeholder="Enter User ID"
//           required
//         />
//         <button type="submit">Find Birth</button>
//       </form>

//       {error && <p style={{ color: 'red' }}>{error}</p>}

//       {birthData && (
//         <div>
//           <h2>Birth Data</h2>
//           <p><strong>Child's Name:</strong> {birthData.childName}</p>
//           <p><strong>Father's Name:</strong> {birthData.fatherName}</p>
//           <p><strong>Mother's Name:</strong> {birthData.motherName}</p>
//           <p><strong>Place of Birth:</strong> {birthData.placeOfBirth}</p>
//           <p><strong>Gender:</strong> {birthData.gender}</p>
//           <p><strong>District:</strong> {birthData.district}</p>
//           <p><strong>Date of Birth:</strong> {birthData.dob}</p>
//         </div>
//       )}
//     </div>
//     </>
//   );
// };

// export default FindBirthByUserId;

import React, { useState } from 'react';
import axios from 'axios';
import Topnav from '../homepage/Topnav';

const FindBirthByUserId = () => {
  const [userId, setUserId] = useState('');
  const [birthData, setBirthData] = useState(null);
  const [error, setError] = useState(null);

  const [gender, setGender] = useState('');
  const [district, setDistrict] = useState('');
  const [placeOfBirth, setPlaceOfBirth] = useState('');
  const [hospitalName, setHospitalName] = useState('');
  const [dob, setDob] = useState('');
  const [filterData, setFilterData] = useState(null);
  const [filterError, setFilterError] = useState(null);

  const handleUserIdChange = (event) => {
    setUserId(event.target.value);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === 'gender') setGender(value);
    else if (name === 'district') setDistrict(value);
    else if (name === 'placeOfBirth') setPlaceOfBirth(value);
    else if (name === 'hospitalName') setHospitalName(value);
    else if (name === 'dob') setDob(value);
  };

  const handleUserIdSubmit = async (event) => {
    event.preventDefault();
    setError(null);
    setBirthData(null);

    try {
      const response = await axios.get(`http://localhost:9952/birth/findBirthByUserId/${userId}`);
      setBirthData(response.data);
    } catch (err) {
      setError('Error fetching birth data. Please try again.');
      console.error(err);
    }
  };

  const handleFilterSubmit = async (event) => {
    event.preventDefault();
    setFilterError(null);
    setFilterData(null);

    try {
      const response = await axios.get(`http://localhost:9952/birth/allBirths`, {
        params: { gender, district, placeOfBirth, hospitalName, dob }
      });
      setFilterData(response.data);
    } catch (err) {
      setFilterError('Error fetching filtered birth data. Please try again.');
      console.error(err);
    }
  };

  return (
    <>
      <Topnav />
      <div style={styles.container}>
        <div style={styles.leftSection}>
          <h1>Find Birth by User ID</h1>
          <form onSubmit={handleUserIdSubmit} style={styles.form}>
            <input
              type="number"
              value={userId}
              onChange={handleUserIdChange}
              placeholder="Enter User ID"
              required
              style={styles.input}
            />
            <button type="submit" style={styles.button}>Find Birth</button>
          </form>

          {error && <p style={styles.error}>{error}</p>}
          {birthData && (
            <div style={styles.dataContainer}>
              <h2>Birth Data</h2>
              <p><strong>Child's Name:</strong> {birthData.childName}</p>
              <p><strong>Father's Name:</strong> {birthData.fatherName}</p>
              <p><strong>Mother's Name:</strong> {birthData.motherName}</p>
              <p><strong>Place of Birth:</strong> {birthData.placeOfBirth}</p>
              <p><strong>Gender:</strong> {birthData.gender}</p>
              <p><strong>District:</strong> {birthData.district}</p>
              <p><strong>Date of Birth:</strong> {birthData.dob}</p>
            </div>
          )}
        </div>

        <div style={styles.rightSection}>
          <h1>Filter Birth Data</h1>
          <form onSubmit={handleFilterSubmit} style={styles.form}>
            <div>
              <label>
                Gender:
                <select name="gender" value={gender} onChange={handleInputChange} required>
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </label>
            </div>
            <div>
              <label>
                District:
                <input type="text" name="district" value={district} onChange={handleInputChange} required style={styles.input} />
              </label>
            </div>
            <div>
              <label>
                Place of Birth:
                <input type="text" name="placeOfBirth" value={placeOfBirth} onChange={handleInputChange} required style={styles.input} />
              </label>
            </div>
            <div>
              <label>
                Birth Place Type:
                <label>
                  <input
                    type="radio"
                    name="placeType"
                    value="hospital"
                    onChange={() => setHospitalName('')}
                  />
                  Hospital
                </label>
                <label>
                  <input
                    type="radio"
                    name="placeType"
                    value="home"
                    onChange={() => setHospitalName('')}
                  />
                  Home
                </label>
              </label>
            </div>
            {hospitalName !== '' && (
              <div>
                <label>
                  Hospital Name:
                  <input
                    type="text"
                    name="hospitalName"
                    value={hospitalName}
                    onChange={handleInputChange}
                    required style={styles.input}
                  />
                </label>
              </div>
            )}
            <div>
              <label>
                Date of Birth:
                <input
                  type="date"
                  name="dob"
                  value={dob}
                  onChange={handleInputChange}
                  required style={styles.input}
                />
              </label>
            </div>
            <button type="submit" style={styles.button}>Filter Births</button>
          </form>

          {filterError && <p style={styles.error}>{filterError}</p>}
          {filterData && (
            <div style={styles.dataContainer}>
              <h2>Filtered Birth Data</h2>
              {filterData.map((data, index) => (
                <div key={index} style={styles.filteredData}>
                  <p><strong>Child's Name:</strong> {data.childName}</p>
                  <p><strong>Father's Name:</strong> {data.fatherName}</p>
                  <p><strong>Mother's Name:</strong> {data.motherName}</p>
                  <p><strong>Place of Birth:</strong> {data.placeOfBirth}</p>
                  <p><strong>Gender:</strong> {data.gender}</p>
                  <p><strong>District:</strong> {data.district}</p>
                  <p><strong>Date of Birth:</strong> {data.dob}</p>
                  <hr />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '20px',
    border: '2px solid #ccc',
    borderRadius: '8px',
    margin: '20px',
    backgroundColor: '#f9f9f9',
  },
  leftSection: {
    flex: 1,
    marginRight: '20px',
    padding: '20px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    backgroundColor: '#fff',
  },
  rightSection: {
    flex: 1,
    marginLeft: '20px',
    padding: '20px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    backgroundColor: '#fff',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  input: {
    padding: '10px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    fontSize: '16px',
  },
  button: {
    padding: '10px',
    borderRadius: '4px',
    border: 'none',
    backgroundColor: '#007bff',
    color: '#fff',
    fontSize: '16px',
    cursor: 'pointer',
  },
  error: {
    color: 'red',
  },
  dataContainer: {
    textAlign: 'center',
    marginTop: '20px',
  },
  filteredData: {
    marginBottom: '10px',
  },
};

export default FindBirthByUserId;

