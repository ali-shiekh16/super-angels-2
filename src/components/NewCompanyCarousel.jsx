import { useEffect, useState } from 'react';

import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';

import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader

import { Carousel } from 'react-responsive-carousel';
import CompaniesList from './CompaniesList';

import companiesData from '../data/companies.js';

function NewCompanyCarousel() {
  const [modal, setModal] = useState(false);
  const [content, setContent] = useState(false);
  const [newCompanies, setNewCompanies] = useState([]);

  useEffect(() => {
    setNewCompanies(companiesData.filter(company => company.tag === 'new'));
  }, []);

  const handleClick = member => {
    setContent(member);
    setModal(true);
  };

  const renderLists = () => {
    const list = [];
    for (let i = 0; i < Math.ceil(newCompanies.length / 20); i++) {
      const skipped = i * 20;
      const remaning = newCompanies.length - skipped;
      const limit = remaning > 20 ? 19 : remaning;

      list.push(
        <CompaniesList
          key={i}
          limit={limit}
          skip={skipped}
          onClick={handleClick}
        />
      );
    }

    return list;
  };
  return (
    <>
      <Carousel showThumbs={false} swipeable>
        {renderLists().map(item => (
          <div className='list-container' key={new Date()}>
            {item}
          </div>
        ))}
      </Carousel>

      <Modal
        open={modal}
        onClose={() => {
          setModal(false);
          return false;
        }}
        center
        classNames={{
          overlay: 'company-modal__overlay',
          modal: 'company-modal',
        }}
      >
        <div className='team-modal__body'>
          <img className='team-modal__img' src={content.img} alt='' />
          <h2 className='team-modal__title'>{content.name}</h2>
          <h3 className='team-modal__subtitle'>{content.role}</h3>
          <p className='team-modal__text'>{content.description}</p>
        </div>
      </Modal>
    </>
  );
}

export default NewCompanyCarousel;
