import { useRef, useEffect, useState } from 'react';
import '../css/components/modal.scss';

function Modal({ imgSrc, description, isOpen, setIsOpen }) {
  return (
    <article className={`modal ${isOpen && 'modal--visible'}`}>
      <div className='modal__content'>
        <div className='modal__close' onClick={() => setIsOpen(false)}>
          &#10006;
        </div>
        <figure className='modal__img-wrapper'>
          <img src={imgSrc} alt='logo' className='modal__img' />
        </figure>
        <p className='modal__details'>{description}</p>
      </div>
    </article>
  );
}

export default Modal;
