import React, { useEffect, useState } from 'react';
import './project.css';

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
        setData([
        {
          id: 10000,
          name: 'PilotProject',
          createdon: '2024-08-16T11:40:47.574',
          metadata: '{  purpose: demo}'
        }
        ]);
      }
      } catch (error) {
        setData([
          {
            id: 10000,
            name: 'PilotProject',
            createdon: '2024-08-16T11:40:47.574',
            metadata: '{  purpose: demo}'
          },
          {
            id: 10000,
            name: 'PilotProject',
            createdon: '2024-08-16T11:40:47.574',
            metadata: '{  purpose: demo}'
          }
          ]);
      // console.error('Error fetching data:', error);
      }
    };

    return (
      <table className="table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Created On</th>
            <th>Metadata</th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((project) => (
              <tr key={project.id}>
                <td>{project.id}</td>
                <td>{project.name}</td>
                <td>{project.createdon}</td>
                <td>{project.metadata.purpose}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">General response</td>
            </tr>
          )}
        </tbody>
      </table>
    );
  };


export default ProjectTable;