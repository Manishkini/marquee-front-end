import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { localAxios } from '../../axios/axios';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      companies: [],
    };
  }

  componentDidMount() {
    const callApi = async () => {
      const response = await localAxios.get('/getAllCompanies');
      if (response.data.data.responseCode === 100) {
        this.setState({
          companies: response.data.data.companies,
        });
      }
    };
    callApi();
  }
  render() {
    const { companies } = this.state;
    return (
      <div className="w-full h-20 bg-slate-300 p-5">
        <Link to="/">
          <button className="w-20 ml-96 bg-black text-white">
            Add Company
          </button>
        </Link>
        <table class="table-auto border-collapse border border-slate-500 text-center mt-5">
          <thead>
            <tr>
              <th className="border border-slate-600">CIN</th>
              <th className="border border-slate-600">Company Name</th>
            </tr>
          </thead>
          <tbody>
            {companies && companies.length
              ? companies.map((company) => (
                  <tr>
                    <td className="border border-slate-700">{company.cin}</td>
                    <td className="border border-slate-700">{company.name}</td>
                  </tr>
                ))
              : null}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Search;
