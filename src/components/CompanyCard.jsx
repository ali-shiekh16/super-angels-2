import '../css/components/companyCard.scss';

function CompanyCard({ imgSrc, onClick, title }) {
  return (
    <article className='team__card company__card' onClick={onClick}>
      {imgSrc ? (
        <figure className='team__img-wrapper comopany__img-wrapper'>
          <img className='team__img company__img' src={imgSrc} />
        </figure>
      ) : (
        <h2 className='company__title'>{title}</h2>
      )}
    </article>
  );
}

export default CompanyCard;
