import React from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

function GridCardSkeleton() {
  const cards : JSX.Element[] = [];

  for(let i = 0; i < 6; i++) {
    cards.push(
      <div className="card" key={i}>
        <Skeleton height={200} />
        <div className="card-body">
          <Skeleton height={30} width="100%" />
          <Skeleton height={30} width="100%" />
          <Skeleton height={30} width="100%" />
        </div>
      </div>
    )
  }
  return (
    <div className="xxxsm: mx-xxxsm mt-46 sm:grid grid-cols-3 gap-8 mt-48 xl:mx-56">
      <SkeletonTheme baseColor="#202020" highlightColor="#444">
        { cards }
      </SkeletonTheme>
    </div>
  )
}

export default GridCardSkeleton