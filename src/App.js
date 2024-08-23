import React, { useState } from 'react';
import './App.css';
import Feedback from './component/feedback';
import Project from './component/projecttable';

function App() {
  const [activeTab, setActiveTab] = useState(null);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="top-left">Project Management</h1>
      </header>
      <div className="content">
        <div className="left-pane">
          <ul className="tab-list">
            <li onClick={() => handleTabClick('project')}>Project</li>
            <li onClick={() => handleTabClick('tasks')}>Tasks</li>
            <li onClick={() => handleTabClick('feedback')}>Feedback</li>
            <li onClick={() => handleTabClick('dashboard')}>Dashboard</li>

          </ul>
        </div> 
        <div className="right-pane">
          {activeTab === 'project' && <Project />}
          {activeTab === 'feedback' && <Feedback />}
          {activeTab === 'tasks' && 'Tasks tab not implemented yet'}
          {activeTab === 'dashboard' && 'Dashboard tab not implemented yet'}
        </div>
      </div>
    </div>
  );
}

export default App;