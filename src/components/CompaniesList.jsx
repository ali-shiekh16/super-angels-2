import { useState } from 'react';

import CompanyCard from './CompanyCard.jsx';
import companiesData from '../data/companies.js';

import '../css/components/companiesList.scss';

function CompaniesList({ limit, skip, onClick }) {
  const companyList = companiesData.filter((star, n) => {
    return n + 1 >= skip && n + 1 - skip <= limit;
  });

  const [companies, setCompanies] = useState(companyList);

  return (
    <>
      <div className='companies__list'>
        {companies.map(company => (
          <CompanyCard
            title={company.name}
            key={company.name}
            imgSrc={`/images/companies/${company.img}`}
            onClick={() =>
              onClick({
                ...company,
                img: `/images/companies/${company.img}`,
              })
            }
          />
        ))}
      </div>
    </>
  );
}

export default CompaniesList;
