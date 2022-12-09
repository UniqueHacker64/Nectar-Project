import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  FormHelperText,
  MenuItem,
} from '@mui/material';
import HostType from 'enums/host-type.enum';
import { useParams } from 'react-router-dom';
import { FormType } from '../form';
import HostsField from './HostsField';

const FIREWALL_OPTIONS = ['Firewall D'];

type FormFieldsProps = {
  form: FormType;
};

const FormFields = ({ form }: FormFieldsProps) => {
  const params = useParams<{ type: string }>();

  return (
    <>
      <TextField
        label="Project Name"
        fullWidth
        name="name"
        onChange={form.handleChange}
        value={form.values.name}
        error={!!form.errors.name && !!form.touched.name}
        helperText={
          !!form.errors.name && !!form.touched.name ? form.errors.name : ''
        }
      />

      <TextField
        label="Password"
        fullWidth
        name="password"
        type="password"
        onChange={form.handleChange}
        value={form.values.password}
        error={!!form.errors.password && !!form.touched.password}
        helperText={
          !!form.errors.password && !!form.touched.password
            ? form.errors.password
            : ''
        }
      />

      <FormControl fullWidth>
        <InputLabel id="select-host">Select host type</InputLabel>
        <Select
          labelId="select-host"
          label="Select host type"
          name="hostType"
          onChange={form.handleChange}
          value={form.values.hostType}
        >
          {Object.values(HostType).map((hostType) => (
            <MenuItem key={hostType} value={hostType}>
              {hostType}
            </MenuItem>
          ))}
        </Select>
        <FormHelperText
          error={!!form.errors.hostType && !!form.touched.hostType}
        >
          {!!form.errors.hostType && !!form.touched.hostType
            ? form.errors.hostType
            : ''}
        </FormHelperText>
      </FormControl>

      {params.type === 'template' && (
        <FormControl fullWidth>
          <InputLabel id="select-firewall">Select firewall type</InputLabel>
          <Select
            labelId="select-firewall"
            label="Select firewall type"
            name="firewallType"
            value={FIREWALL_OPTIONS[0]}
          >
            {FIREWALL_OPTIONS.map((fType) => (
              <MenuItem key={fType} value={fType}>
                {fType}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}

      <HostsField
        textFieldProps={{
          name: 'hosts',
          onChange: form.handleChange,
          value: form.values.hosts,
          error: !!form.errors.hosts && !!form.touched.hosts,
          helperText:
            !!form.errors.hosts && !!form.touched.hosts
              ? form.errors.hosts
              : '',
        }}
      />
    </>
  );
};

export default FormFields;
