import { INVALIDE_META } from './errors';

const createMeta = (meta = {}) => {
  if (!meta || typeof meta !== 'object' || Array.isArray(meta)) {
    throw new Error(INVALIDE_META);
  }

  return meta;
};

export default createMeta;
