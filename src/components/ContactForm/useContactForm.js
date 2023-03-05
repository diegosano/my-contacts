import {
  useCallback, useEffect, useImperativeHandle, useState,
} from 'react';

import CategoriesService from '../../services/CategoriesService';
import { isEmailValid } from '../../utils/isEmailValid';
import { formatPhone } from '../../utils/formatPhone';
import { useErrors } from '../../hooks/useErrors';
import { useSafeAsyncState } from '../../hooks/useSafeAsyncState';

export function useContactForm({ onSubmit, ref }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [categories, setCategories] = useSafeAsyncState([]);
  const [isLoadingCategories, setIsLoadingCategories] = useSafeAsyncState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    errors, setError, removeError, getErrorMessageByFieldName,
  } = useErrors();

  useImperativeHandle(
    ref,
    () => ({
      setFieldsValues: (contact) => {
        setName(contact.name ?? '');
        setEmail(contact.email ?? '');
        setPhone(formatPhone(contact.phone ?? ''));
        setCategoryId(contact.category.id ?? '');
      },
      resetFields: () => {
        setName('');
        setEmail('');
        setPhone(formatPhone(''));
        setCategoryId('');
      },
    }),
    [],
  );

  useEffect(() => {
    async function loadCategories() {
      try {
        setIsLoadingCategories(true);
        const categoriesList = await CategoriesService.findAll();
        setCategories(categoriesList);
      } catch {
      } finally {
        setIsLoadingCategories(false);
      }
    }

    loadCategories();
  }, [setCategories, setIsLoadingCategories]);

  const handleSubmit = useCallback(
    async (event) => {
      event.preventDefault();
      setIsSubmitting(true);
      const onlyNumbersPhone = phone.replace(/\D/g, '');

      await onSubmit({
        phone: onlyNumbersPhone,
        name,
        email,
        categoryId,
      });

      setIsSubmitting(false);
    },
    [name, email, phone, categoryId, onSubmit],
  );

  const handleNameChange = useCallback(
    (event) => {
      setName(event.target.value);

      if (!event.target.value) {
        setError({
          field: 'name',
          message: 'Name is required',
        });
        return;
      }

      removeError('name');
    },
    [setError, removeError],
  );

  const handleEmailChange = useCallback(
    (event) => {
      setEmail(event.target.value);

      if (event.target.value && !isEmailValid(event.target.value)) {
        setError({
          field: 'email',
          message: 'Invalid e-mail',
        });
        return;
      }

      removeError('email');
    },
    [setError, removeError],
  );

  const handlePhoneChange = useCallback(
    (event) => {
      setPhone(formatPhone(event.target.value));

      if (!event.target.value) {
        setError({
          field: 'phone',
          message: 'Invalid phone',
        });
        return;
      }

      removeError('phone');
    },
    [setError, removeError],
  );

  const isFormValid = name && errors.length === 0;

  return {
    handleSubmit,
    getErrorMessageByFieldName,
    name,
    handleNameChange,
    isSubmitting,
    email,
    handleEmailChange,
    phone,
    handlePhoneChange,
    isLoadingCategories,
    categoryId,
    setCategoryId,
    categories,
    isFormValid,
  };
}
