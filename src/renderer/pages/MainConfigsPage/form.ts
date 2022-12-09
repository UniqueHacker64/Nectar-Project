import HostType from 'enums/host-type.enum';
import { useFormik } from 'formik';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { projectActions } from 'renderer/redux/slices/project.slice';
import { useAppDispatch, useAppSelector } from 'renderer/redux/store';
import * as Yup from 'yup';

const initialValues = {
  name: '',
  hostType: HostType.Windows,
  hosts: '',
  password: '',
};

const validationSchema = Yup.object({
  name: Yup.string().required('Project name is required'),
  hostType: Yup.string()
    .required('Host type is required')
    .oneOf(Object.values(HostType), 'Invalid host type'),
  hosts: Yup.string().required('Host is required'),
  password: Yup.string().required('Password is required'),
});

const useForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const project = useAppSelector((state) => state.project);
  const { type } = useParams<{ type: string }>();

  const form = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (v) => {
      dispatch(
        projectActions.setAllFields({
          name: v.name,
          hostType: v.hostType,
          hosts: v.hosts,
          password: v.password,
        })
      );
      navigate(type === 'new' ? '/playbook' : '/security');
    },
  });

  useEffect(() => {
    form.setValues(project);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { form };
};

type UseFormType = ReturnType<typeof useForm>;
export type FormType = UseFormType['form'];

export default useForm;
