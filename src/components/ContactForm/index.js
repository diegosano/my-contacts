import PropTypes from 'prop-types';
import { useCallback, useState } from 'react';

import * as S from './styles';
import { Input } from '../Input';
import { Select } from '../Select';
import { Button } from '../Button';
import { FormGroup } from '../FormGroup';

import { isEmailValid } from '../../utils/isEmailValid';
import { formatPhone } from '../../utils/formatPhone';
import { useErrors } from '../../hooks/useErrors';

export function ContactForm({ buttonLabel }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [category, setCategory] = useState('');
  const {
    errors, setError, removeError, getErrorMessageByFieldName,
  } = useErrors();

  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();

      // const onlyNumbersPhone = phone.replace(/\D/g, '');

      // console.log({
      //   name,
      //   email,
      //   onlyNumbersPhone,
      //   category,
      // });
    },
    [name, email, phone, category],
  );

  const handleNameChange = useCallback((event) => {
    setName(event.target.value);

    if (!event.target.value) {
      setError({
        field: 'name',
        message: 'Name is required',
      });
      return;
    }

    removeError('name');
  }, [setError, removeError]);

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

      <FormGroup>
        <Select
          value={category}
          onChange={(event) => setCategory(event.target.value)}
        >
          <option value="">Select a category</option>
          <option value="instagram">Instagram</option>
          <option value="discord">Discord</option>
        </Select>
      </FormGroup>

      <S.ButtonContainer>
        <Button type="submit" disabled={!isFormValid}>{buttonLabel}</Button>
      </S.ButtonContainer>
    </S.Form>
  );
}

ContactForm.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
};
