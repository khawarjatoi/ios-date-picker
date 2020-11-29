import React from 'react';
import Wheel from './Wheel';
import './css/base.css';

const dateStyle = {
  display: 'flex',
  flexDirection: 'column',
  fontSize: '2rem',
  fontWeight: 600,

  // textAlign: 'left',
  // position: 'absolute',
  // left: '45vh',
} as React.CSSProperties;

export default () => {
  return (
    <>
      <div style={{ margin: '25px 20%' }}>
        <div className='pick' style={{ ...dateStyle }}>
          Pick
          <span style={{ color: 'blue' }}>a Date</span>
        </div>
      </div>
      <div
        style={{
          height: '200px',
          padding: '50px',
          display: 'flex',
          justifyContent: 'center',
          background: '#ffffff',
          marginTop: '10%',
        }}
      >
        <div style={{ width: 99 }}>
          <Wheel types='days' initIdx='8' width={23} textColor='#000' />
        </div>
        <div style={{ width: 99 }}>
          <Wheel types='months' initIdx='Jul' width={23} perspective='left' />
        </div>
        <div style={{ width: 99 }}>
          <Wheel types='years' initIdx='2010' width={23} perspective='left' />
        </div>
      </div>
    </>
  );
};
