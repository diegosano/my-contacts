import { Button } from '../../components/Button';
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

      <Button type="button">
        Save
      </Button>
      <Button type="button" disabled>
        Save
      </Button>
    </>
  );
}
