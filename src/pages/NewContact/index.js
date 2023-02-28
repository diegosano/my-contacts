import { Input } from '../../components/Input';
import { PageHeader } from '../../components/PageHeader';
import { Select } from '../../components/Select';

export function NewContact() {
  return (
    <>
      <PageHeader title="New Contact" />

      <Input type="text" placeholder="Name" />

      <Select>
        <option value="123">Instagram</option>
      </Select>
    </>
  );
}
