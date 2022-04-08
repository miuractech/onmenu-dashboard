import { Dialog } from '@material-ui/core'
import { useForm } from 'react-hook-form';
import UniversalButton from '../global/universal-button'
import styles from '../menupage/styles/dish.add.form.module.scss'
import firebase from 'firebase/app'
export default function ForgotPassword({open,setOpen}) {
    const { register:register2, handleSubmit : handleSubmit2,  formState: { errors : errors2 },setError:setError2 } = useForm();
    const onSubmitNew = data => {
            firebase.auth().sendPasswordResetEmail(data.email)
            .then(() => {
                setError2( 'email',{
                    type: "manual",
                    message: 'Password reset email sent! check your mail',
                  });
                  setTimeout(() => {
                      setOpen(false);
                  }, 5000);
            })
            .catch((error) => {
                setError2( 'email',{
                    type: "manual",
                    message: error.message,
                  });
            });
    }
    return (
        <Dialog
        open={open}
        onClose={() =>setOpen(false)}
        >
            <div
            className={styles.container}
            >
                <div>
                <div style={{ textAlign: 'center' }}>Send password reset email </div>
                </div>
                <form
                className={styles["form-container"]}
                onSubmit={handleSubmit2(onSubmitNew)}
                >

                    <div className={styles["fields-container"]}>
                        <label >Enter Email: </label>
                        <div className={styles["fields-container-textarea"]}>
                        <input 
                            {...register2("email", { required: true})}
                        />
                        </div>
                    </div>
                    <div
                    style={{color: 'red'}}
                    >
                        {errors2?.email?.message}
                    </div>
                    <div
                        style={{
                        display: "flex",
                        justifyContent: "space-between",
                        margin: "1.5rem 1.5rem 0 1.5rem",
                        }}
                    >
                    <UniversalButton
                        height={40}
                        width={130}
                        selected={true}
                        // handleClick={handleSubmit(onSubmit)}
                        type='submit'
                    >
                        Send
                    </UniversalButton>
                    <UniversalButton
                        height={40}
                        width={130}
                        selected={false}
                        handleClick={()=>setOpen(false)}
                    >
                        CLOSE
                    </UniversalButton>
                    </div>
                </form>
            </div>
        </Dialog>
    )
}
