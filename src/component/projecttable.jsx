import React, { useState, useEffect } from 'react';

const ProjectForm = ({ fetchData }) => {
  const [formData, setFormData] = useState({
    id: 0,
    name: '',
    createdon: new Date().toISOString(),
    metadata: {
      purpose: ''
    }
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('metadata.')) {
      const metadataKey = name.split('.')[1];
      setFormData({
        ...formData,
        metadata: {
          ...formData.metadata,
          [metadataKey]: value
        }
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/api/projectss', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        alert('Project created successfully');
        fetchData(); // Reload project table
      } else {
        alert('Failed to create project');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error creating project');
    }
  };
  

  // Remove the declaration of randomId variable

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        maxWidth: '500px',
        margin: '0 auto',
        padding: '20px',
        border: '1px solid #ccc',
        borderRadius: '5px',
        backgroundColor: '#f9f9f9'
      }}
    >
      <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          style={{
            width: '100%',
            padding: '8px',
            boxSizing: 'border-box',
            border: '1px solid #ccc',
            borderRadius: '4px'
          }}
        />
      </div>
      <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Purpose:</label>
        <input
          type="text"
          name="metadata.purpose"
          value={formData.metadata.purpose}
          onChange={handleChange}
          style={{
            width: '100%',
            padding: '8px',
            boxSizing: 'border-box',
            border: '1px solid #ccc',
            borderRadius: '4px'
          }}
        />
      </div>
      <button
        type="submit"
        style={{
          width: '100%',
          padding: '10px',
          backgroundColor: '#4CAF50',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        Create Project
      </button>
    </form>
  );
};

const ProjectTable = ({ projects = [] }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/projectss');
      if (response.ok) {
        const data = await response.json();
        setData(data);
      } else {
        console.error('Failed to fetch projects');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <ProjectForm fetchData={fetchData} />
      <h2 style={{ textAlign: 'left' }}>Projects:</h2><br />
      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
        <thead>
          <tr>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>ID</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Name</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Created On</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Purpose</th>
          </tr>
        </thead>
        
        <tbody>
          {data.map((project) => (
            <tr key={project.id}>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{project.id}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{project.name}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{project.createdon}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{project.metadata.purpose}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProjectTable;