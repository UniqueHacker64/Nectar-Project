import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { playbookActions } from 'renderer/redux/slices/playbook.slice';
import { useAppDispatch } from 'renderer/redux/store';
import * as Yup from 'yup';

const initialValues = {
  playbook: '',
};

const validationSchema = Yup.object({
  playbook: Yup.string().required('Required'),
});

const useForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const form = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (v) => {
      dispatch(playbookActions.setPlaybook(v.playbook));
      navigate('/end');
    },
  });

  return { form };
};

type UseForm = ReturnType<typeof useForm>;
export type FormType = UseForm['form'];

export default useForm;
