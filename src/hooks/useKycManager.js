import { useState } from 'react';
import api from '../services/api';

export const useKycManager = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getKycInfo = async (userId) => {
    try {
      setLoading(true);
      const response = await api.kyc.getInfo(userId);
      return response.data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateKycTier = async (userId, newTier) => {
    try {
      setLoading(true);
      await api.kyc.updateTier({ userId, newTier });
      return true;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    getKycInfo,
    updateKycTier,
    tiers: ['TIER_1', 'TIER_2', 'TIER_3']
  };
};