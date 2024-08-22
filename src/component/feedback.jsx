import React, { useState, useEffect } from 'react';

const Feedback = () => {
  const [dropdownOptions, setDropdownOptions] = useState([]);
  const [selectedProjectId, setSelectedProjectId] = useState('');
  const [feedbackDetails, setFeedbackDetails] = useState('');

  useEffect(() => {
    fetchProjectData();
  }, []);

  const fetchProjectData = async () => {
    try {
      const response = await fetch('https://api.example.com/projects');
      const data = await response.json();
      setDropdownOptions(data); // Update dropdown options with fetched data
    } catch (error) {
      setDropdownOptions([
        {
          id: 10000,
          name: 'MAT'
        },
        {
          id: 11000,
          name: 'PT'
        },
        {
          id: 12000,
          name: 'HADITOR'
        }
        ]);
      console.error('Error fetching project data:', error);
    }
  };

  const handleDropdownChange = async (event) => {
    const projectId = event.target.value;
    setSelectedProjectId(projectId);

    if (projectId) {
      try {
        const response = await fetch(`http://localhost:8080/api/feedbackss/feedbacks/${projectId}`);
        const feedback = await response.text(); // Assuming the response is a string
        setFeedbackDetails(feedback);
      } catch (error) {
        setFeedbackDetails(`Default feedback selected for ${projectId}`);
        console.error('Error fetching feedback details:', error);
      }
    } else {
      setFeedbackDetails('');
    }
  };

  return (
    <div>
      <br />
      <label htmlFor="dropdown2">Project: </label>
      <select id="dropdown2" value={selectedProjectId} onChange={handleDropdownChange}>
        <option value="">Select project</option>
        {dropdownOptions.map((option) => (
          <option key={option.id} value={option.id}>
            {option.name}
          </option>
        ))}
      </select>
      {feedbackDetails && (
        <div>
          <h3>Feedback Details:</h3>
          <p>{feedbackDetails}</p>
        </div>
      )}
    </div>
  );
};

export default Feedback;