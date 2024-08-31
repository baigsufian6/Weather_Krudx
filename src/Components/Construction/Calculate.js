import React from 'react'
import './construct.css'

function Calculate() {
  return (
    <div>
       <section className="cost-calculators">
            <h2>Cost Calculator</h2>
            <h3>Estimate cost of your dream project</h3>
            <form>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="package">Package Required*</label>
                  <select id="package">
                    <option>Select the package</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="phone">Phone Number*</label>
                  <input type="tel" id="phone" placeholder="Enter your phone number" />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">Full Name*</label>
                  <input type="text" id="name" placeholder="Enter your full name" />
                </div>
                <div className="form-group">
                  <label htmlFor="location">Site Location*</label>
                  <select id="location">
                    <option>Select the location</option>
                  </select>
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="plot">Plot Dimension*</label>
                  <input type="text" id="plot" placeholder="in square feet" />
                </div>
                <div className="form-group">
                  <label htmlFor="construction-type">Construction Type*</label>
                  <select id="construction-type">
                    <option>Select construction type</option>
                  </select>
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="floors">No. of Floors*</label>
                  <select id="floors">
                    <option>Select the no. of floors</option>
                  </select>
                </div>
              </div>
              <button type="submit" className="cost-button">Get Cost Estimation</button>
            </form>
          </section>
    </div>
  )
}

export default Calculate
