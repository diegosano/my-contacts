import PropTypes from 'prop-types';
import { useCallback, useEffect, useState } from 'react';

import * as S from './styles';
import { Input } from '../Input';
import { Select } from '../Select';
import { Button } from '../Button';
import { FormGroup } from '../FormGroup';

import { isEmailValid } from '../../utils/isEmailValid';
import { formatPhone } from '../../utils/formatPhone';
import { useErrors } from '../../hooks/useErrors';
import CategoriesService from '../../services/CategoriesService';

export function ContactForm({ buttonLabel, onSubmit }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [categories, setCategories] = useState([]);
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);
  const {
    errors, setError, removeError, getErrorMessageByFieldName,
  } = useErrors();

  useEffect(() => {
    async function loadCategories() {
      try {
        setIsLoadingCategories(true);
        const categoriesList = await CategoriesService.listAll();
        setCategories(categoriesList);
      } catch {
      } finally {
        setIsLoadingCategories(false);
      }
    }

    loadCategories();
  }, []);

  const handleSubmit = useCallback(
    async (event) => {
      event.preventDefault();

      const onlyNumbersPhone = phone.replace(/\D/g, '');

      await onSubmit({
        name,
        email,
        onlyNumbersPhone,
        categoryId,
      });
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

      if (event.target.value) {
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

  return (
    <S.Form onSubmit={handleSubmit} noValidate>
      <FormGroup error={getErrorMessageByFieldName('name')}>
        <Input
          type="text"
          placeholder="Name *"
          value={name}
          onChange={handleNameChange}
          error={getErrorMessageByFieldName('name')}
        />
      </FormGroup>

      <FormGroup error={getErrorMessageByFieldName('email')}>
        <Input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={handleEmailChange}
          error={getErrorMessageByFieldName('email')}
        />
      </FormGroup>

      <FormGroup>
        <Input
          type="text"
          placeholder="Phone"
          value={phone}
          onChange={handlePhoneChange}
          maxLength={15}
        />
      </FormGroup>

      <FormGroup isLoading={isLoadingCategories}>
        <Select
          value={categoryId}
          onChange={(event) => setCategoryId(event.target.value)}
          disabled={isLoadingCategories}
        >
          <option value="">Select a category</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </Select>
      </FormGroup>

      <S.ButtonContainer>
        <Button type="submit" disabled={!isFormValid}>
          {buttonLabel}
        </Button>
      </S.ButtonContainer>
    </S.Form>
  );
}

ContactForm.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
};
