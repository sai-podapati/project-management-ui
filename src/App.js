import React, { useState } from 'react';
import './App.css';
import Feedback from './component/feedback';

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
            <li onClick={() => handleTabClick('feedback')}>Feedback</li>
          </ul>
        </div>
        <div className="right-pane">
          {activeTab === 'project' && <div>Project tab chosen</div>}
          {activeTab === 'feedback' && <Feedback />}
        </div>
      </div>
    </div>
  );
}

export default App;