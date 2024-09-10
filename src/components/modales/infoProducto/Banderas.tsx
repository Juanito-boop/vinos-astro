import React from 'react';

interface BanderaProps {
  pais: string;
}

const Bandera: React.FC<BanderaProps> = ({ pais }) => {
  const src = `/vinos-astro/${pais}.svg`;
  const alt = `Bandera ${pais}`;
  return (
    <picture>
      <img src={src} alt={alt} />
    </picture>
  );
};

export default Bandera;