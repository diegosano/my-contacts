import PropTypes from 'prop-types';
import { useCallback, useState } from 'react';

import * as S from './styles';
import { Input } from '../Input';
import { Select } from '../Select';
import { Button } from '../Button';
import { FormGroup } from '../FormGroup';

import { isEmailValid } from '../../utils/isEmailValid';

export function ContactForm({ buttonLabel }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [category, setCategory] = useState('');
  const [errors, setErrors] = useState([]);

  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();

      console.log({
        name,
        email,
        phone,
        category,
      });
    },
    [name, email, phone, category],
  );

  const handleNameChange = useCallback((event) => {
    setName(event.target.value);

    if (!event.target.value) {
      setErrors((prevState) => [
        ...prevState,
        {
          field: 'name',
          message: 'Name is required',
        },
      ]);
      return;
    }

    setErrors((prevState) => prevState.filter((error) => error.field !== 'name'));
  }, []);

  const handleEmailChange = useCallback(
    (event) => {
      setEmail(event.target.value);

      if (event.target.value && !isEmailValid(event.target.value)) {
        const errorAlreadyExist = errors.find(
          (error) => error.field === 'email',
        );

        if (errorAlreadyExist) {
          return;
        }

        setErrors((prevState) => [
          ...prevState,
          {
            field: 'email',
            message: 'Invalid e-mail',
          },
        ]);
        return;
      }

      setErrors((prevState) => prevState.filter((error) => error.field !== 'email'));
    },
    [errors],
  );

  function getErrorMessageByFieldName(fieldName) {
    return errors.find((error) => error.field === fieldName)?.message;
  }

  return (
    <S.Form onSubmit={handleSubmit}>
      <FormGroup error={getErrorMessageByFieldName('name')}>
        <Input
          type="text"
          placeholder="Name"
          value={name}
          onChange={handleNameChange}
          error={getErrorMessageByFieldName('name')}
        />
      </FormGroup>

      <FormGroup error={getErrorMessageByFieldName('email')}>
        <Input
          type="text"
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
          onChange={(event) => setPhone(event.target.value)}
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
        <Button type="submit">{buttonLabel}</Button>
      </S.ButtonContainer>
    </S.Form>
  );
}

ContactForm.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
};
