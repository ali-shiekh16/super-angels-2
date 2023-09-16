import '../css/components/teamList.scss';

import teamMembers from '../data/team.js';
import TeamCard from './TeamCard';

function TeamList({ limit, skip, onClick }) {
  const allStars = teamMembers.filter((star, n) => {
    return n + 1 >= skip && n + 1 - skip <= limit;
  });

  return (
    <>
      <div className={`team__list`}>
        {allStars.map(member => (
          <TeamCard
            key={member.name}
            img={member.img}
            onClick={() => {
              onClick({ ...member, img: `/images/team/${member.img}` });
            }}
          />
        ))}
      </div>
    </>
  );
}

export default TeamList;
