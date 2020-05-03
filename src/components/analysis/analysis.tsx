import React from 'react';
import { Analysic } from '../../models/analys';

interface Props {
  analysic: Analysic[];
}

export function Analysis(props: Props) {
  const { analysic } = props;
  
  return (
      <div>
            {analysic.map((it) => {
            return ( <div>
                    <h3>{it.id}</h3>
                    <h3>{it.title}</h3>
                    <h3>{it.value}</h3>
                    </div>
            );
            })}
      </div>
  );
}
