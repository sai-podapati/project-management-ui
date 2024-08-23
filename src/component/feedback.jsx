import React, { useState, useEffect } from 'react';

const Feedback = () => {
  const [dropdownOptions, setDropdownOptions] = useState([]);
  const [selectedProjectId, setSelectedProjectId] = useState('');
  const [feedbackDetails, setFeedbackDetails] = useState([]);

  useEffect(() => {
    fetchProjectData();
  }, []);

  const fetchProjectData = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/projectss');
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
        const feedback = await response.json(); 
        setFeedbackDetails(feedback);
      } catch (error) {
        setFeedbackDetails([
          {
            id:10004,
            subject:'Feedback for Haditor',
            message:'Work done was not upto the mark',
            sender:'Aman.Prakash@cyient.com',
            reciever:'Zafar.Parvez@cyient.com',
            createdon:'21-08-2024',
            hasImage:false,
            projectId:10000,
            taskId:10003
          },
          {
            id:10005,
            subject:'Feedback for Haditor',
            message:'Work done was not upto the mark',
            sender:'Aman.Prakash@cyient.com',
            reciever:'Zafar.Parvez@cyient.com',
            createdon:'21-08-2024',
            hasImage:false,
            projectId:10000,
            taskId:10003
          }
        ]);
        console.error('Error fetching feedback details:', error);
      }
    } else {
      setFeedbackDetails('');
    }
  };

  return (
    <div>
      <br />
      <label htmlFor="dropdown2" style={{ fontWeight: 'bold', fontSize: '20px' }}>Project: </label>
      <select id="dropdown2" value={selectedProjectId} onChange={handleDropdownChange} style={{ width: "300px", height: '30px'}}>
        <option value="">Select project</option>
        {dropdownOptions.map((option) => (
          <option key={option.id} value={option.id}>
            {option.name}
          </option>
        ))}
      </select>
      <br /> 
      <br />
      <table className="table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Subject</th>
            <th>Message</th>
            <th>Sender</th>
            <th>Reciever</th>
            <th>CreatedOn</th>
            <th>HasImage</th>
            <th>ProjectId</th>
            <th>taskId</th>
          </tr>
        </thead>
        <tbody>
          {feedbackDetails.length > 0 ? (
            feedbackDetails.map((project) => (
              <tr key={project.id}>
                <td>{project.id}</td>
                <td>{project.subject}</td>
                <td>{project.message}</td>
                <td>{project.sender}</td>
                <td>{project.reciever}</td>
                <td>{project.createdon}</td>
                <td>{project.hasImage ? 'Yes' : 'No'}</td>
                <td>{project.projectId}</td>
                <td>{project.taskId}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4"> Feedback not available.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Feedback;