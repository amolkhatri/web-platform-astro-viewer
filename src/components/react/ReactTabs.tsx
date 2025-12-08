import React, { useState } from 'react';

export default function ReactTabs() {
  const [activeTab, setActiveTab] = useState(0);
  
  const tabs = [
    { title: 'Performance', content: 'Astro ships zero JS by default. Add interactivity only where needed.' },
    { title: 'SEO', content: 'Server-rendered HTML means better SEO and faster First Contentful Paint.' },
    { title: 'DX', content: 'Use your favorite framework. React, Vue, Solid, Svelte - all work together.' }
  ];

  return (
    <div className="demo-card react-card">
      <div className="card-badge">React</div>
      <div className="card-icon">📑</div>
      <h3>Dynamic Tabs</h3>
      <div className="tabs-container">
        <div className="tab-buttons">
          {tabs.map((tab, i) => (
            <button
              key={i}
              onClick={() => setActiveTab(i)}
              className={`tab-btn ${activeTab === i ? 'active' : ''}`}
            >
              {tab.title}
            </button>
          ))}
        </div>
        <div className="tab-content">
          {tabs[activeTab].content}
        </div>
      </div>
    </div>
  );
}
