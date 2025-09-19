import styles from './SignUpForm.module.scss';
import Card from '@/src/shared/ui/Card/Card';
import { Input } from '@/src/shared/ui/Input/Input';
import { Button } from '@/src/shared/ui/Button/Button';

const SignUpForm = () => {
  return (
    <Card className={styles.card}>
      <form className={styles.form}>
        <Input />
        <Input />
        <Input />
        <Input />
        <Button variant={'buttonPrimary'}>Sign Up</Button>
      </form>
    </Card>
  );
};

export default SignUpForm;
