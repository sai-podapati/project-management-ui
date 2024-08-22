import React, { useState } from 'react';

const Feedback = () => {
  const [dropdown2Value, setDropdown2Value] = useState('');

  const handleDropdown2Change = (event) => {
    setDropdown2Value(event.target.value);
  };

  return (
    <div>
      <br />
      <label htmlFor="dropdown2">Project :</label>
      <select id="dropdown2" value={dropdown2Value} onChange={handleDropdown2Change} className="dropdown">
        <option value="">Select Project</option>
        <option>MAT</option>
        <option>PT</option>
        <option>MPT</option>
      </select>
    </div>
  );
};

export default Feedback;