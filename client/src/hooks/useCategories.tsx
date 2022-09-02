import { useEffect, useState } from 'react';
import api from 'src/api';
import { Category } from 'src/types';

export default function useCategories() {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const initCategories = async () => {
      const { data } = await api.getCategories();
      setCategories(data);
    };

    initCategories();
  }, []);

  return categories;
}
