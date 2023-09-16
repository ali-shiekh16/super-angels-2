import { useState } from 'react';

import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';

import TeamList from './TeamList';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader

import '../css/components/teamSlider.scss';
import { Carousel } from 'react-responsive-carousel';

function Slider() {
  const [modal, setModal] = useState(false);
  const [content, setContent] = useState(false);

  const handleClick = member => {
    setContent(member);
    setModal(true);
  };

  return (
    <>
      <Carousel showThumbs={false} swipeable>
        <div className='list-container'>
          <TeamList limit={12} skip={0} onClick={handleClick} />
        </div>
        <div className='list-container'>
          <TeamList limit={11} skip={12} onClick={handleClick} />
        </div>
      </Carousel>

      <Modal
        open={modal}
        onClose={() => {
          setModal(false);
          return false;
        }}
        center
        classNames={{
          overlay: 'modal__overlay',
          modal: 'modal',
        }}
      >
        <div className='team-modal__body'>
          <img className='team-modal__img' src={content.img} alt='' />
          <h2 className='team-modal__title'>{content.name}</h2>
          <h3 className='team-modal__subtitle'>{content.role}</h3>
          <p className='team-modal__text'>{content.description}</p>
          <div className='team-modal__companies'>
            {content.companies?.length &&
              content.companies.map(company => (
                <img
                  src={`/images/companies/${company}`}
                  className='team-modal__company'
                />
              ))}
          </div>
        </div>
      </Modal>
    </>
  );
}

export default Slider;
