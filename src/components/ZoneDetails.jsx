import React from 'react';
import { useParams } from 'react-router-dom';
import Dashboard from './Dashboard';

function ZoneDetails() {
  let { id } = useParams(); // This captures the 'id' param from the URL.

  return (
    <div className="container mx-auto px-4 py-8">
      <Dashboard/>
    </div>
  );
}

export default ZoneDetails;
