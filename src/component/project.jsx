import React, { useEffect, useState } from 'react';
 
const Project = () => {
    const [projects, setProjects] = useState([]);
 
    useEffect(() => {
        // Fetch projects from the service and update the state
        const fetchProjects = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/projectss');
                const data = await response.json();
                setProjects([data]);
                setProjects(data);
            } catch (error) {
                console.error('Error fetching projects:', error);
            }
        };
 
        fetchProjects();
    }, []);
 
    return (
        <table className='table'>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Created On</th>
                </tr>
            </thead>
            <tbody>
                {projects.map((project) => (
                    <tr key={project.id}>
                        <td>{project.id}</td>
                        <td>{project.name}</td>
                        <td>{project.createdOn}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};
 
export default Project;