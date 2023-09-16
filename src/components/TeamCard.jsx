import '../css/components/teamCard.scss';

function TeamCard({ img, onClick }) {
  return (
    <article className='team__card' onClick={onClick}>
      <figure className='team__img-wrapper'>
        <img className='team__img' src={`/images/team/${img}`} />
      </figure>
    </article>
  );
}

export default TeamCard;
