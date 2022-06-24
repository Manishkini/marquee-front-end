import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { zaubacorpAxios, localAxios } from '../../axios/axios';

const Search = () => {
  const navigate = useNavigate();
  const [companyOptions, setCompanyOptions] = useState([]);
  const [company, setCompany] = useState(undefined);
  const [cin, setCIN] = useState(undefined);

  const handleChange = async (text) => {
    const formDate = new FormData();
    formDate.append('search', text);
    formDate.append('filter', 'company');

    const data = await zaubacorpAxios.post('/custom-search', formDate);

    const newDiv = document.createElement('div');
    newDiv.innerHTML = data.data;

    const optionArray = [];
    for (let i = 0; i < newDiv.children.length; i++) {
      const cin = newDiv.children[i].id.split('/')[2];
      const name = newDiv.children[i].textContent;
      optionArray.push({
        cin,
        name,
      });
    }

    const companyList = document.getElementById('company-list');
    companyList.style.display = 'block';

    setCompanyOptions(optionArray);
  };

  const handleClick = async (cin, name) => {
    const companyList = document.getElementById('company-list');
    companyList.style.display = 'none';

    document.getElementById('company-name').value = name;

    setCompany(name);
    setCIN(cin);
  };

  const handleSubmit = async () => {
    const data = {
      cin,
      company,
    };

    const response = await localAxios.post('/addCompany', data);
    console.log('response', response.data.data);
    if (response.data.data.responseCode === 100) {
      navigate('/company');
    }
  };

  return (
    <div className="w-full h-20 bg-slate-300 p-5">
      <input
        className="w-64 ml-96"
        id="company-name"
        onChange={(event) => handleChange(event.target.value)}
      />
      <button className="w-15 bg-black text-white" onClick={handleSubmit}>
        Submit
      </button>
      <ui className="list-none text-center" id="company-list">
        {companyOptions && companyOptions.length ? (
          companyOptions.map((singleCompanyObj) => (
            <li
              className="w-64 bg-slate-600 border border-black cursor-pointer ml-96"
              onClick={() =>
                handleClick(singleCompanyObj.cin, singleCompanyObj.name)
              }
            >
              {singleCompanyObj.name}
            </li>
          ))
        ) : (
          <li className="w-64 bg-slate-600 ml-96">No Company Found</li>
        )}
      </ui>
    </div>
  );
};

export default Search;
