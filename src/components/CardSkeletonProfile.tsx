import React from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

function CardSkeletonProfile() {
  const cards : JSX.Element[] = [];

  for(let i = 0; i < 3; i++) {
    cards.push(
      <div className="card" key={i}>
        <Skeleton height={200} />
        <div className="card-body">
          <Skeleton height={30} width="100%" />
        </div>
      </div>
    )
  }
  return (
    <div className="xxxsm: mx-xxxsm">
      <SkeletonTheme baseColor="#202020" highlightColor="#444">
        { cards }
      </SkeletonTheme>
    </div>
  )
}

export default CardSkeletonProfile